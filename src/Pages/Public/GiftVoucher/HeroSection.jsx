/* eslint-disable react-hooks/purity */
import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ArrowRight24Regular } from '@fluentui/react-icons';

const HeroSection = () => {
    const theme = useTheme();

    return (
        <Box sx={{
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
            py: { xs: 8, md: 12 },
            '&::before': {
                content: '""',
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '800px',
                height: '800px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '50%',
                animation: 'float 20s ease-in-out infinite',
            },
            '@keyframes float': {
                '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
                '50%': { transform: 'translate(30px, 30px) scale(1.1)' },
            },
        }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} alignItems="center">
                    {/* Left Content */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h2" sx={{ color: '#fff', fontWeight: 800, mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
                            Empowering dreams through{' '}
                            <Box component="span" sx={{ color: '#ffd700' }}>Gifting</Box>
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 1, lineHeight: 1.6 }}>
                            How do you support a friend starting a business enterprise?
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2, fontStyle: 'italic' }}>
                            Send them some small coins for internet data? It lacks the grandeur their dreams deserve
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4, fontStyle: 'italic' }}>
                            Share their business flyer on Facebook? Decent effort, but let's elevate it to the extraordinary with a BMG "Support a Business" Gift Voucher
                        </Typography>
                        <Button
                            variant="contained"
                            endIcon={<ArrowRight24Regular />}
                            sx={{
                                bgcolor: theme.palette.warning.dark,
                                color: '#fff',
                                px: 3,
                                py: 1.1,
                                fontSize: '1rem',
                                fontWeight: 700,
                                borderRadius: 2,
                                textTransform: 'none',
                                boxShadow: '0 8px 32px rgba(255, 107, 53, 0.4)',
                                '&:hover': {
                                    bgcolor: theme.palette.warning.main,
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 12px 40px rgba(255, 107, 53, 0.5)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                            onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
                        >
                            Gift Voucher
                        </Button>
                    </Grid>

                    {/* Right Visual */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ position: 'relative', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ position: 'relative', width: 200, height: 200 }}>
                                {/* Gift Box Base */}
                                <Box sx={{
                                    width: 200,
                                    height: 200,
                                    bgcolor: '#ff6b35',
                                    borderRadius: 3,
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '5rem',
                                }}>
                                    🎁
                                </Box>

                                {/* Ribbon Horizontal */}
                                <Box sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: -20,
                                    right: -20,
                                    height: 30,
                                    bgcolor: '#ffd700',
                                    transform: 'translateY(-50%)',
                                    zIndex: 1,
                                }} />

                                {/* Ribbon Vertical */}
                                <Box sx={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: -20,
                                    bottom: -20,
                                    width: 30,
                                    bgcolor: '#ffd700',
                                    transform: 'translateX(-50%)',
                                    zIndex: 1,
                                }} />

                                {/* Bow */}
                                <Box sx={{
                                    position: 'absolute',
                                    top: -30,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontSize: '4rem',
                                    zIndex: 2,
                                }}>
                                    🎀
                                </Box>

                                {/* Floating Sparkles */}
                                {[...Array(6)].map((_, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            position: 'absolute',
                                            fontSize: '2rem',
                                            animation: 'float 3s ease-in-out infinite',
                                            animationDelay: `${i * 0.5}s`,
                                            top: `${Math.random() * 100}%`,
                                            left: `${Math.random() * 100}%`,
                                            '@keyframes float': {
                                                '0%, 100%': { transform: 'translateY(0px)' },
                                                '50%': { transform: 'translateY(-20px)' },
                                            },
                                        }}
                                    >
                                        ✨
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HeroSection;