import React from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
} from '@mui/material';
import {
    ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import OrderItemsSection from './OrderItemsSection';
import PaymentDetailsSection from './PaymentDetails';

const CheckoutPage = () => {
    // Get cart items from Redux store
    const cartItems = useSelector((state) => state.cart?.items || []);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: 'background.default',
                py: 4,
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 4,
                        color: 'text.primary',
                    }}
                >
                    Shopping Cart
                </Typography>

                {cartItems.length === 0 ? (
                    <Paper
                        elevation={0}
                        sx={{
                            p: 5,
                            textAlign: 'center',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 3
                        }}
                    >
                        <ShoppingCartIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            Your cart is empty
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mt={1}>
                            Add items to your cart to get started
                        </Typography>
                    </Paper>
                ) : (
                    <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "2fr 1fr" }} gap={4}>
                        <OrderItemsSection cartItems={cartItems} />
                        <PaymentDetailsSection cartItems={cartItems} />
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default CheckoutPage;