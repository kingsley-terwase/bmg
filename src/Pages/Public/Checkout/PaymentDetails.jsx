import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    CardContent,
    Divider,
    Paper,
} from '@mui/material';
import {
    LocalOffer as TagIcon,
} from '@mui/icons-material';
import { formatGHS } from '../../../utils/currency';

const PaymentDetailsSection = ({ cartItems }) => {
    const [couponCode, setCouponCode] = useState('');

    const handleApplyCoupon = () => {
        console.log('Applying coupon:', couponCode);
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
                {/* Coupon Code */}
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
                        Coupon/Gift Code
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    bgcolor: 'background.default',
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleApplyCoupon}
                            sx={{
                                textTransform: 'none',
                                borderRadius: 2,
                                px: 3,
                                fontWeight: 600,
                                bgcolor: 'warning.main',
                                color: 'warning.contrastText',
                                '&:hover': {
                                    bgcolor: 'warning.dark',
                                },
                            }}
                        >
                            Apply
                        </Button>
                    </Box>
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
                            Coupon code{' '}
                            <Typography
                                component="span"
                                variant="caption"
                                sx={{ color: 'text.disabled' }}
                            >
                                (Not Applied)
                            </Typography>
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                            }}
                        >
                            0
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
                            Gift Code{' '}
                            <Typography
                                component="span"
                                variant="caption"
                                sx={{ color: 'text.disabled' }}
                            >
                                (Not Applied)
                            </Typography>
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                            }}
                        >
                            0
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
                        }}
                    >
                        Pay Now
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        size="large"
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
    )
}

export default PaymentDetailsSection;

