import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    CardContent,
    Divider,
    Paper,
    Alert,
    CircularProgress,
} from '@mui/material';
import {
    LocalOffer as TagIcon,
} from '@mui/icons-material';
import { formatGHS } from '../../../utils/currency';
import { useNavigate } from 'react-router-dom';
import useCheckout from '../../../Hooks/cart';

const PaymentDetailsSection = ({ cartItems }) => {
    const navigate = useNavigate();

    const [couponCode, setCouponCode] = useState('');
    const [giftCardCode, setGiftCardCode] = useState('');
    const { loading, error, success, validationErrors, initiateCheckout, resetCheckout } = useCheckout();

    const handleCheckout = async () => {
        const result = await initiateCheckout(cartItems, couponCode, giftCardCode);

        if (!result.success) {
            // Error is already set in the hook
            console.error('Checkout failed:', result.error);
            if (result.validationErrors) {
                console.error('Validation errors:', result.validationErrors);
            }
        }
        // If successful, user will be redirected to payment page
    };

    const handleCancel = () => {
        setCouponCode('');
        setGiftCardCode('');
        resetCheckout();
        navigate('/')
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);
    const totalDiscount = cartItems.reduce((sum, item) => sum + (item.discountAmount * item.quantity || 0), 0);
    const total = subtotal;

    return (
        <Paper
            elevation={0}
            sx={{
                position: 'sticky',
                top: 20,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    p: 2.5,
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Order Summary
                </Typography>
            </Box>

            <CardContent sx={{ p: 3 }}>
                {/* Error Alert */}
                {error && (
                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                        onClose={resetCheckout}
                    >
                        {error}
                    </Alert>
                )}

                {/* Validation Errors */}
                {validationErrors.length > 0 && (
                    <Alert
                        severity="warning"
                        sx={{ mb: 2 }}
                        onClose={resetCheckout}
                    >
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            Please fix the following issues:
                        </Typography>
                        <Box component="ul" sx={{ m: 0, pl: 2 }}>
                            {validationErrors.map((err, idx) => (
                                <li key={idx}>
                                    <Typography variant="body2">{err}</Typography>
                                </li>
                            ))}
                        </Box>
                    </Alert>
                )}

                {/* Success Alert */}
                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        Redirecting to payment...
                    </Alert>
                )}

                {/* Coupon Code */}
                <Box sx={{ mb: 2 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 600,
                            mb: 1.5,
                            color: 'text.primary',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                        }}
                    >
                        <TagIcon style={{ fontSize: '18px' }} />
                        Coupon Code
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={loading}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                bgcolor: 'background.default',
                            },
                        }}
                    />
                </Box>

                {/* Gift Card Code */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 600,
                            mb: 1.5,
                            color: 'text.primary',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                        }}
                    >
                        <TagIcon style={{ fontSize: '18px' }} />
                        Gift Card Code
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Enter gift card code"
                        value={giftCardCode}
                        onChange={(e) => setGiftCardCode(e.target.value)}
                        disabled={loading}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                bgcolor: 'background.default',
                            },
                        }}
                    />
                </Box>

                <Divider sx={{ my: 2.5 }} />

                {/* Summary Details */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary' }}
                        >
                            Items
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                            }}
                        >
                            {cartItems.length}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary' }}
                        >
                            Sub-total
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                            }}
                        >
                            {formatGHS(subtotal)}
                        </Typography>
                    </Box>

                    {totalDiscount > 0 && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{ color: 'error.main' }}
                            >
                                Discount
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 600,
                                    color: 'error.main',
                                }}
                            >
                                -{formatGHS(totalDiscount)}
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Divider sx={{ my: 2.5 }} />

                {/* Total */}
                <Box
                    sx={{
                        bgcolor: 'primary.light',
                        borderRadius: 2,
                        p: 2,
                        mb: 3,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 0.5,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                color: 'text.small',
                            }}
                        >
                            Total
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                color: 'primary.contrastText',
                            }}
                        >
                            {formatGHS(total)}
                        </Typography>
                    </Box>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={handleCheckout}
                        disabled={loading || cartItems.length === 0}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            borderRadius: 2,
                            py: 1.5,
                            bgcolor: 'warning.main',
                            color: 'warning.contrastText',
                            boxShadow: '0 4px 14px rgba(237, 108, 2, 0.4)',
                            '&:hover': {
                                bgcolor: 'warning.dark',
                                boxShadow: '0 6px 20px rgba(237, 108, 2, 0.5)',
                            },
                            '&:disabled': {
                                bgcolor: 'action.disabledBackground',
                                color: 'action.disabled',
                            },
                        }}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Pay Now'
                        )}
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        size="large"
                        onClick={handleCancel}
                        disabled={loading}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            borderRadius: 2,
                            py: 1.5,
                            borderColor: 'divider',
                            color: 'text.primary',
                            '&:hover': {
                                borderColor: 'primary.main',
                                bgcolor: 'primary.light' + '10',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
            </CardContent>
        </Paper>
    );
};

export default PaymentDetailsSection;