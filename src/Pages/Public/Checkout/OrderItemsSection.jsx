import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    IconButton,
    Chip,
} from '@mui/material';
import {
    Delete as DeleteIcon,
    ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../Store/slices/cartSlice';
import { resolveAwsImage } from '../../../utils/functions';
import { formatGHS } from '../../../utils/currency';

const OrderItemsSection = ({ cartItems }) => {
    const dispatch = useDispatch();
    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {cartItems.map((item) => (
                <Card
                    key={item.id}
                    elevation={0}
                    sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 3,
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                            transform: 'translateY(-2px)',
                        },
                    }}
                >
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                            {/* Product Image */}
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: { xs: '100%', sm: 200 },
                                    height: 200,
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    flexShrink: 0,
                                    bgcolor: 'background.paper',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                }}
                            >
                                {item?.image ? (
                                    <img
                                        src={resolveAwsImage(item?.image)}
                                        alt={item.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '100%',
                                            bgcolor: 'grey.100'
                                        }}
                                    >
                                        <ShoppingCartIcon sx={{ fontSize: 48, color: 'grey.400' }} />
                                    </Box>
                                )}
                                {item?.hasDiscount && item.discountAmount > 0 && (
                                    <Chip
                                        label={`-${formatGHS(item.discountAmount)}`}
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 10,
                                            left: 10,
                                            bgcolor: 'error.main',
                                            color: 'error.contrastText',
                                            fontWeight: 600,
                                            fontSize: '0.75rem',
                                        }}
                                    />
                                )}
                            </Box>

                            {/* Product Details */}
                            <Box sx={{ flex: 1 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        mb: 1.5,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.primary',
                                        }}
                                    >
                                        {item?.name}
                                    </Typography>
                                    <IconButton
                                        onClick={() => handleRemoveItem(item.id)}
                                        size="small"
                                        sx={{
                                            color: 'error.main',
                                            '&:hover': {
                                                bgcolor: 'error.light' + '15',
                                            },
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>

                                {item.service_type_name && (
                                    <Chip
                                        label={item.service_type_name}
                                        size="small"
                                        sx={{
                                            bgcolor: 'primary.light',
                                            color: 'primary.contrastText',
                                            fontWeight: 600,
                                            fontSize: '0.7rem',
                                            mb: 1.5,
                                            height: 24,
                                        }}
                                    />
                                )}

                                {item.description && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            lineHeight: 1.6,
                                            mb: 2,
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: item.description
                                        }}
                                    />
                                )}

                                {/* Requirements Summary */}
                                {item.requirements && Object.keys(item.requirements).length > 0 && (
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                            Requirements:
                                        </Typography>
                                        <Box sx={{ mt: 0.5 }}>
                                            {Object.entries(item.requirements).map(([key, value]) => (
                                                <Typography key={key} variant="caption" display="block" color="text.secondary">
                                                    • {key}: {Array.isArray(value) ? value.join(', ') : value}
                                                </Typography>
                                            ))}
                                        </Box>
                                    </Box>
                                )}

                                {/* Price */}
                                <Box>
                                    {item.hasDiscount && (
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                textDecoration: 'line-through',
                                                color: 'text.disabled',
                                                mb: 0.5,
                                            }}
                                        >
                                            {formatGHS(item.originalPrice)}
                                        </Typography>
                                    )}
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: 'primary.main',
                                        }}
                                    >
                                        {formatGHS(item.finalPrice)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    )
}


export default OrderItemsSection
