/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { Box, Container, Snackbar, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserContext } from '../../../Contexts';
import { useGiftCards } from '../../../Hooks/web_giftVoucher';
import { useBuyGiftCard } from '../../../Hooks/general';
import HeroSection from './HeroSection';
import WhyChooseSection from './WhyChooseSection';
import GiftCardCreationForm from './GiftCardCreationForm';
import { validateStepOne, validateStepTwo } from '../../../utils/validation';

const GiftVoucherPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useUserContext();
    const { giftCards, loading: giftCardsLoading } = useGiftCards();
    const { buyGiftCard, loading } = useBuyGiftCard();

    // Auth redirect effect
    useEffect(() => {
        if (!user?.user) {
            navigate('/login', {
                state: {
                    returnTo: '/gift-voucher',
                    from: location.pathname
                }
            });
        }
    }, [user, navigate, location.pathname]);

    // State management
    const [activeStep, setActiveStep] = useState(0);
    const [selectedGiftCard, setSelectedGiftCard] = useState(null);
    const [customAmount, setCustomAmount] = useState('');
    const [selectedDesign, setSelectedDesign] = useState('celebration');
    const [formData, setFormData] = useState({
        recipientName: '',
        recipientEmail: '',
        senderName: '',
        senderEmail: '',
        message: '',
    });
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    // Set default selected gift card when data loads
    useEffect(() => {
        if (giftCards && giftCards.length > 0 && !selectedGiftCard) {
            setSelectedGiftCard(giftCards[0]);
        }
    }, [giftCards, selectedGiftCard]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        // Validation for each step
        if (activeStep === 0) {
            const validation = validateStepOne(customAmount, selectedGiftCard);
            if (!validation.isValid) {
                setSnackbar({
                    open: true,
                    message: validation.message,
                    severity: 'error'
                });
                return;
            }
        }

        if (activeStep === 1) {
            const validation = validateStepTwo(formData);
            if (!validation.isValid) {
                setSnackbar({
                    open: true,
                    message: validation.message,
                    severity: 'error'
                });
                return;
            }
        }

        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handlePurchaseGiftCard = async () => {
        setError(null);

        try {
            const amount = parseFloat(customAmount || selectedGiftCard?.amount);

            const giftCardData = {
                gift_card_amount_id: selectedGiftCard?.id || null,
                recipient_email: formData.recipientEmail,
                amount: amount.toFixed(2),
                message: formData.message || `A gift from ${formData.senderName}`,
                recipient_name: formData.recipientName,
                design: selectedDesign,
            };

            const response = await buyGiftCard(giftCardData);

            if (response?.data?.success) {
                setSnackbar({
                    open: true,
                    message: 'Gift card created successfully! Redirecting to payment...',
                    severity: 'success'
                });

                setTimeout(() => {
                    const payment_link = response?.data?.result?.authorization_url
                    if (payment_link) {
                        window.location.href = payment_link;
                    }
                }, 2000);
            }
        } catch (err) {
            console.error('Error creating gift card:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Failed to create gift card. Please try again.';
            setError(errorMessage);
            setSnackbar({
                open: true,
                message: errorMessage,
                severity: 'error'
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handlePurchaseGiftCard();
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    // Don't render content if user is not authenticated
    if (!user?.user) {
        return null;
    }

    return (
        <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
            <HeroSection />
            <WhyChooseSection />
            <GiftCardCreationForm
                activeStep={activeStep}
                selectedGiftCard={selectedGiftCard}
                setSelectedGiftCard={setSelectedGiftCard}
                customAmount={customAmount}
                setCustomAmount={setCustomAmount}
                selectedDesign={selectedDesign}
                setSelectedDesign={setSelectedDesign}
                formData={formData}
                handleChange={handleChange}
                giftCards={giftCards}
                giftCardsLoading={giftCardsLoading}
                loading={loading}
                error={error}
                handleNext={handleNext}
                handleBack={handleBack}
                handleSubmit={handleSubmit}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default GiftVoucherPage;