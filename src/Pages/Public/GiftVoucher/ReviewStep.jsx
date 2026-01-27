import React from 'react';
import { Box, Grid, Typography, Card, Alert } from '@mui/material';
import { formatAmount } from '../../../utils/formatters';
import { designOptions } from '../../../utils/data';

const ReviewStep = ({ customAmount, selectedGiftCard, selectedDesign, formData, error }) => {
    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Review & Purchase
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <Card sx={{ p: 3, bgcolor: '#f5f5f5', mb: 3 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle2" color="text.secondary">Amount:</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {formatAmount(customAmount || selectedGiftCard?.amount || '0')}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle2" color="text.secondary">Design:</Typography>
                        <Typography variant="body1">
                            {designOptions.find(d => d.id === selectedDesign)?.name}{' '}
                            {designOptions.find(d => d.id === selectedDesign)?.emoji}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle2" color="text.secondary">To:</Typography>
                        <Typography variant="body1">
                            {formData.recipientName} ({formData.recipientEmail})
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle2" color="text.secondary">From:</Typography>
                        <Typography variant="body1">
                            {formData.senderName} ({formData.senderEmail})
                        </Typography>
                    </Grid>
                    {formData.message && (
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle2" color="text.secondary">Message:</Typography>
                            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                                "{formData.message}"
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </Card>
        </Box>
    );
};

export default ReviewStep;