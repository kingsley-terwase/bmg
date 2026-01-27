import React from 'react';
import { Box, Grid, Typography, Card, TextField, InputAdornment, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Mail24Regular, Person24Regular } from '@fluentui/react-icons';
import { designOptions } from '../../../utils/data';

const PersonalizeStep = ({
    selectedDesign,
    setSelectedDesign,
    formData,
    handleChange,
}) => {
    const theme = useTheme();

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Personalize Your Gift
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Choose Design
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
                {designOptions.map((design) => (
                    <Grid size={{ xs: 6, sm: 3 }} key={design.id}>
                        <Card
                            onClick={() => setSelectedDesign(design.id)}
                            sx={{
                                cursor: 'pointer',
                                border: `2px solid ${selectedDesign === design.id ? theme.palette.primary.main : theme.palette.divider}`,
                                borderRadius: 3,
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    borderColor: theme.palette.primary.main,
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <Box sx={{ background: design.gradient, p: 3, textAlign: 'center' }}>
                                <Typography sx={{ fontSize: '3rem' }}>{design.emoji}</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ textAlign: 'center', py: 1, fontWeight: 500 }}>
                                {design.name}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        required
                        name="recipientName"
                        label="Recipient Name"
                        value={formData.recipientName}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person24Regular />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        required
                        type="email"
                        name="recipientEmail"
                        label="Recipient Email"
                        value={formData.recipientEmail}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Mail24Regular />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        required
                        name="senderName"
                        label="Your Name"
                        value={formData.senderName}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person24Regular />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        required
                        type="email"
                        name="senderEmail"
                        label="Your Email"
                        value={formData.senderEmail}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Mail24Regular />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        name="message"
                        label="Personal Message (Optional)"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Add a personal message to your gift..."
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default PersonalizeStep;