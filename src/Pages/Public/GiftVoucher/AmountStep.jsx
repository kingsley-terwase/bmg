import React from 'react';
import { Box, Grid, Typography, Card, Chip, TextField, InputAdornment, CircularProgress, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Money24Regular } from '@fluentui/react-icons';
import { formatAmount } from '../../../utils/formatters';

const AmountStep = ({
    selectedGiftCard,
    setSelectedGiftCard,
    customAmount,
    setCustomAmount,
    giftCards,
    giftCardsLoading,
}) => {
    const theme = useTheme();

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Select Amount
            </Typography>

            {giftCardsLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                </Box>
            ) : giftCards && giftCards.length > 0 ? (
                <>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        {giftCards.map((giftCard, index) => (
                            <Grid size={{ xs: 6, sm: 3 }} key={giftCard.id}>
                                <Card
                                    onClick={() => {
                                        setSelectedGiftCard(giftCard);
                                        setCustomAmount('');
                                    }}
                                    sx={{
                                        p: 3,
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        border: `2px solid ${selectedGiftCard?.id === giftCard.id && !customAmount ? theme.palette.primary.main : theme.palette.divider}`,
                                        bgcolor: selectedGiftCard?.id === giftCard.id && !customAmount ? `${theme.palette.primary.main}08` : 'transparent',
                                        borderRadius: 3,
                                        position: 'relative',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor: theme.palette.primary.main,
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                >
                                    {index === 1 && (
                                        <Chip
                                            label="Popular"
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                top: -12,
                                                right: 8,
                                                bgcolor: theme.palette.primary.main,
                                                color: '#fff',
                                            }}
                                        />
                                    )}
                                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                                        {formatAmount(giftCard.amount)}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {giftCard.description}
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <TextField
                        fullWidth
                        type="number"
                        value={customAmount}
                        onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setSelectedGiftCard(null);
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Money24Regular />
                                    <Typography sx={{ ml: 0.5 }}>GH₵</Typography>
                                </InputAdornment>
                            ),
                        }}
                        placeholder="Enter custom amount (min GH₵10)"
                        inputProps={{ min: 10, step: 1 }}
                    />
                </>
            ) : (
                <Alert severity="warning">
                    No gift card amounts available at the moment. Please try again later.
                </Alert>
            )}
        </Box>
    );
};

export default AmountStep;