import React from 'react';
import { Box, Button, Typography, Container, useTheme } from '@mui/material';
import { ArrowRight24Filled, PlayFilled } from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';

export default function HowBMGWorks() {
    const navigate = useNavigate(); 
    const handleGetStarted = () => {
        navigate('/register');
    }
    const theme = useTheme();
    return (

     <Box data-aos='fade-up' sx={{ bgcolor:theme.palette.primary.lightBg }}>
        <Container maxWidth="lg" sx={{ pb:2 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        py:1,
                        fontWeight: 800,
                        fontSize: { xs: '2rem', md: '4.5rem' },
                        pt:1
                    }}
                >
                    How BMG Works!
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.secondary',
                        fontStyle: 'italic',
                        mb: 1,
                        px: 2
                    }}
                >
                    "Viverra viverra nibh enim et aliquam, enim. Tempor, sit mus viverra orci dui
                    consequat turpis scelerisque faucibus."
                </Typography>

                <Button
                    onClick={handleGetStarted}
                    variant="contained"
                    endIcon={<ArrowRight24Filled />}
                    sx={{
                        bgcolor: theme.palette.primary.main,
                        '&:hover': {
                            bgcolor: theme.palette.primary.bg
                        },
                        textTransform: 'none',
                        px: 3,
                        py: 1.5,
                        borderRadius: 2,
                        fontSize: '1rem'
                    }}
                >
                    Get Started
                </Button>
            </Box>

            <Box sx={{ position: 'relative', mt: 0 }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: -30,
                        left: -30,
                        width: 180,
                        height:180,
                        bgcolor: theme.palette.primary.main,
                        borderRadius: '50%',
                        zIndex: 0
                    }}
                />

                <Box
                    sx={{
                        position: 'absolute',
                        top: -20,
                        right: -20,
                        width: 180,
                        height: 180,
                        bgcolor: theme.palette.warning.light,
                        borderRadius: '50%',
                        zIndex: 0
                    }}
                />

                <Box
                    sx={{
                        position: 'relative',
                        borderRadius: 4,
                        overflow: 'hidden',
                        aspectRatio: '16/9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                        boxShadow:
                            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                            transform: 'scale(1.02)',
                            '& .play-button': {
                                transform: 'scale(1.1)'
                            }
                        }
                    }}
                >
                    <Box
                        component="img"
                        src="/Images/Img_3.png"
                        sx={{
                            width: '100%',
                            position: 'absolute',
                            zIndex: 1
                        }}
                    />

                    <Box
                        className="play-button"
                        sx={{
                            position: 'relative',
                            zIndex: 2,
                            width: 120,
                            height: 120,
                            borderRadius: '50%',
                            bgcolor: 'rgba(255, 255, 255, 0.95)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'transform 0.2s',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        <PlayFilled
                            style={{
                                fontSize: '62px',
                                color: theme.palette.text.unique,
                                marginLeft: '4px'
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            background: `radial-gradient(circle at center, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`,
                            zIndex: 0
                        }}
                    />
                </Box>
            </Box>
        </Container>
        </Box>
    );
}
