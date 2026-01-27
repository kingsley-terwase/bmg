import React from 'react';
import { Container, Grid, Typography, Paper, Box } from '@mui/material';
import FormStepper from './FormStepper';
import AmountStep from './AmountStep';
import PersonalizeStep from './PersonalizeStep';
import ReviewStep from './ReviewStep';
import NavigationButtons from './NavigationButtons';
import VoucherPreview from './VoucherPreview';

const steps = ['Choose Amount', 'Personalize', 'Review & Purchase'];

const GiftCardCreationForm = ({
    activeStep,
    selectedGiftCard,
    setSelectedGiftCard,
    customAmount,
    setCustomAmount,
    selectedDesign,
    setSelectedDesign,
    formData,
    handleChange,
    giftCards,
    giftCardsLoading,
    loading,
    error,
    handleNext,
    handleBack,
    handleSubmit,
}) => {

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 700, mb: 2 }}>
                Create Your Gift Voucher
            </Typography>
            <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary', mb: 6 }}>
                Follow these simple steps to send the perfect gift
            </Typography>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 7 }}>
                    <Paper sx={{ p: 4, borderRadius: 3 }}>
                        <FormStepper activeStep={activeStep} steps={steps} />

                        <Box component="form" onSubmit={handleSubmit}>
                            {activeStep === 0 && (
                                <AmountStep
                                    selectedGiftCard={selectedGiftCard}
                                    setSelectedGiftCard={setSelectedGiftCard}
                                    customAmount={customAmount}
                                    setCustomAmount={setCustomAmount}
                                    giftCards={giftCards}
                                    giftCardsLoading={giftCardsLoading}
                                />
                            )}

                            {activeStep === 1 && (
                                <PersonalizeStep
                                    selectedDesign={selectedDesign}
                                    setSelectedDesign={setSelectedDesign}
                                    formData={formData}
                                    handleChange={handleChange}
                                />
                            )}

                            {activeStep === 2 && (
                                <ReviewStep
                                    customAmount={customAmount}
                                    selectedGiftCard={selectedGiftCard}
                                    selectedDesign={selectedDesign}
                                    formData={formData}
                                    error={error}
                                />
                            )}

                            <NavigationButtons
                                activeStep={activeStep}
                                steps={steps}
                                loading={loading}
                                handleBack={handleBack}
                                handleNext={handleNext}
                            />
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 5 }}>
                    <VoucherPreview
                        selectedDesign={selectedDesign}
                        customAmount={customAmount}
                        selectedGiftCard={selectedGiftCard}
                        formData={formData}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default GiftCardCreationForm;