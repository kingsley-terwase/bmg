import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { ArrowRight24Filled, Play24Filled , PlayFilled} from '@fluentui/react-icons';

export default function HowBMGWorks() {
    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        fontWeight: 700,
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        mb: 2
                    }}
                >
                    How BMG Works!
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.secondary',
                        fontStyle: 'italic',
                        mb: 3,
                        px: 2
                    }}
                >
                    "Viverra viverra nibh enim et aliquam, enim. Tempor, sit mus viverra orci dui consequat turpis scelerisque faucibus."
                </Typography>

                <Button
                    variant="contained"
                    endIcon={<ArrowRight24Filled />}
                    sx={{
                        bgcolor: '#4c51bf',
                        '&:hover': {
                            bgcolor: '#434190'
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

            <Box sx={{ position: 'relative', mt: 4 }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: -30,
                        left: -30,
                        width: 80,
                        height: 80,
                        bgcolor: '#4c51bf',
                        borderRadius: '50%',
                        zIndex: 0
                    }}
                />

                <Box
                    sx={{
                        position: 'absolute',
                        top: -20,
                        right: -20,
                        width: 100,
                        height: 100,
                        bgcolor: '#f59e0b',
                        borderRadius: '50%',
                        zIndex: 0
                    }}
                />

                <Box
                    sx={{
                        position: 'relative',
                        borderRadius: 4,
                        overflow: 'hidden',
                        // bgcolor: '#1a1a1a',
                        aspectRatio: '16/9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
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
                            // inset: 0,
                            // background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))',
                            zIndex: 1
                        }}
                    />
                    <Box
                        className="play-button"
                        sx={{
                            position: 'relative',
                            zIndex: 2,
                            width: 90,
                            height: 90,
                            borderRadius: '50%',
                            bgcolor: 'rgba(255, 255, 255, 0.95)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'transform 0.2s',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        {/* <Play24Filled style={{ fontSize: '40px', color: '#1a1a1a' }} /> */}
                        <PlayFilled style={{ fontSize: '52px', color: '#1a1a1a', marginLeft: '4px' }} />
                    </Box>

                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            background: 'radial-gradient(circle at center, #2d3748 0%, #1a202c 100%)',
                            zIndex: 0
                        }}
                    />
                </Box>
            </Box>
        </Container>
    );
}