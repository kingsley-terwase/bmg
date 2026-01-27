import React from 'react';
import { Box, Card, Typography, Divider } from '@mui/material';
import { designOptions } from '../../../utils/data';
import { formatAmount } from '../../../utils/formatters';

const VoucherPreview = ({ selectedDesign, customAmount, selectedGiftCard, formData }) => {
    const design = designOptions.find(d => d.id === selectedDesign);

    return (
        <Box sx={{ position: 'sticky', top: 20 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Voucher Preview
            </Typography>
            <Card
                sx={{
                    background: design?.gradient,
                    border: 'none',
                    minHeight: 350,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                    p: 4,
                    color: '#fff',
                }}
            >
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                        {formatAmount(customAmount || selectedGiftCard?.amount || '0')}
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
                        BMG Gift Voucher
                    </Typography>
                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)', my: 3 }} />
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        To: {formData.recipientName || 'Recipient Name'}
                    </Typography>
                    <Typography variant="body1">
                        From: {formData.senderName || 'Your Name'}
                    </Typography>
                    {formData.message && (
                        <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
                            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                                "{formData.message}"
                            </Typography>
                        </Box>
                    )}
                </Box>
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Typography sx={{ fontSize: '4rem' }}>
                        {design?.emoji}
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
};

export default VoucherPreview;