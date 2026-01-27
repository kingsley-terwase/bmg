import React from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CheckmarkCircle24Filled, ArrowRight24Regular } from '@fluentui/react-icons';

const NavigationButtons = ({ activeStep, steps, loading, handleBack, handleNext }) => {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
                disabled={activeStep === 0 || loading}
                onClick={handleBack}
                sx={{ textTransform: 'none' }}
            >
                Back
            </Button>
            {activeStep === steps.length - 1 ? (
                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    endIcon={loading ? <CircularProgress size={20} /> : <CheckmarkCircle24Filled />}
                    sx={{
                        bgcolor: theme.palette.primary.main,
                        px: 4,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 700,
                        '&:hover': {
                            bgcolor: theme.palette.primary.dark,
                        },
                    }}
                >
                    {loading ? 'Processing...' : 'Complete Purchase'}
                </Button>
            ) : (
                <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={loading}
                    endIcon={<ArrowRight24Regular />}
                    sx={{
                        bgcolor: theme.palette.primary.main,
                        px: 4,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 700,
                        '&:hover': {
                            bgcolor: theme.palette.primary.dark,
                        },
                    }}
                >
                    Next
                </Button>
            )}
        </Box>
    );
};

export default NavigationButtons;