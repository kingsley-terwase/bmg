import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import {
    CheckmarkCircle24Regular,
    VideoClip24Regular,
    ShoppingBag24Regular,
    People24Regular,
    Phone24Regular,
    Chat24Regular,
    Target24Regular
} from '@fluentui/react-icons';

const HeroMarketingSection = () => {
    return (
        <Box
            sx={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #4c1d95 100%)',
                minHeight: '500px',
                py: 8,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
                }
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 4,
                        position: 'relative',
                        zIndex: 1
                    }}
                >
                    {/* Left Content */}
                    <Box sx={{ flex: '1 1 400px', maxWidth: '600px' }}>
                        <Typography
                            variant="h2"
                            sx={{
                                color: 'white',
                                fontWeight: 800,
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                lineHeight: 1.2,
                                mb: 3,
                                textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                            }}
                        >
                            Business Done fast!
                            <br />
                            <Box component="span" sx={{ color: '#fbbf24' }}>48-72hrs</Box> Order Deliver
                        </Typography>

                        <Typography
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '1.1rem',
                                mb: 4,
                                lineHeight: 1.6
                            }}
                        >
                            Bite-sized digital marketing services to sell more, acquire customers and grow your business.
                        </Typography>

                        <Stack spacing={2} sx={{ mb: 4 }}>
                            {[
                                'Interdum volutpat turpis malesuada ac turpis.',
                                'Tortor ipsum pretium quis nunc.',
                                'Vitae odio a id purus in.'
                            ].map((text, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <CheckmarkCircle24Regular style={{ color: '#10b981', fontSize: '24px' }} />
                                    <Typography sx={{ color: 'white', fontSize: '1rem' }}>
                                        {text}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>

                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: 'transparent',
                                border: '2px solid white',
                                color: 'white',
                                px: 4,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                                borderRadius: '8px',
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: 'white',
                                    color: '#1e3a8a',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Explore BMG
                        </Button>
                    </Box>

                    {/* Right Visual Content */}
                    <Box
                        sx={{
                            flex: '1 1 400px',
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '400px'
                        }}
                    >
                        {/* Colorful Background Card */}
                        <Box
                            sx={{
                                position: 'absolute',
                                width: '320px',
                                height: '220px',
                                background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 25%, #10b981 50%, #3b82f6 75%, #8b5cf6 100%)',
                                borderRadius: '20px',
                                transform: 'rotate(-5deg)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                            }}
                        />

                        {/* Main White Card */}
                        <Box
                            sx={{
                                position: 'relative',
                                width: '300px',
                                bgcolor: 'white',
                                borderRadius: '16px',
                                p: 3,
                                boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                                zIndex: 2
                            }}
                        >
                            {/* Top Browser Bar */}
                            <Box sx={{ display: 'flex', gap: 0.8, mb: 2 }}>
                                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ef4444' }} />
                                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#fbbf24' }} />
                                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#10b981' }} />
                            </Box>

                            {/* Video Play Section */}
                            <Box
                                sx={{
                                    position: 'relative',
                                    bgcolor: '#f3f4f6',
                                    borderRadius: '12px',
                                    height: '160px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 2,
                                    overflow: 'hidden',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                }}
                            >
                                {/* Play Button */}
                                <Box
                                    sx={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: '50%',
                                        bgcolor: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            transform: 'scale(1.1)',
                                        },
                                        transition: 'transform 0.2s'
                                    }}
                                >
                                    <VideoClip24Regular style={{ color: '#1e3a8a', fontSize: '32px' }} />
                                </Box>

                                {/* Floating Icons */}
                                <Box sx={{ position: 'absolute', top: 10, left: 10, bgcolor: '#ef4444', p: 1, borderRadius: '8px' }}>
                                    <ShoppingBag24Regular style={{ color: 'white', fontSize: '20px' }} />
                                </Box>
                                <Box sx={{ position: 'absolute', bottom: 10, left: 10, bgcolor: '#3b82f6', p: 1, borderRadius: '8px' }}>
                                    <Phone24Regular style={{ color: 'white', fontSize: '20px' }} />
                                </Box>
                                <Box sx={{ position: 'absolute', top: 10, right: 10, bgcolor: '#f59e0b', p: 1, borderRadius: '8px' }}>
                                    <People24Regular style={{ color: 'white', fontSize: '20px' }} />
                                </Box>
                                <Box sx={{ position: 'absolute', bottom: 10, right: 10, bgcolor: '#10b981', p: 1, borderRadius: '8px' }}>
                                    <Chat24Regular style={{ color: 'white', fontSize: '20px' }} />
                                </Box>
                            </Box>

                            {/* Bottom Icons */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 1 }}>
                                {[
                                    { icon: <Target24Regular />, color: '#3b82f6' },
                                    { icon: <ShoppingBag24Regular />, color: '#ef4444' },
                                    { icon: <People24Regular />, color: '#10b981' },
                                    { icon: <Chat24Regular />, color: '#f59e0b' }
                                ].map((item, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            bgcolor: '#f3f4f6',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: item.color,
                                            cursor: 'pointer',
                                            '&:hover': {
                                                bgcolor: item.color,
                                                color: 'white',
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
                                            },
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {item.icon}
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        {/* Secondary Card (Background) */}
                        <Box
                            sx={{
                                position: 'absolute',
                                right: -20,
                                top: 20,
                                width: '280px',
                                height: '180px',
                                bgcolor: 'rgba(255, 255, 255, 0.95)',
                                borderRadius: '16px',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                zIndex: 1,
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1
                            }}
                        >
                            <Box sx={{ display: 'flex', gap: 0.8, mb: 1 }}>
                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444' }} />
                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#fbbf24' }} />
                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981' }} />
                            </Box>
                            <Box sx={{ height: 8, bgcolor: '#e5e7eb', borderRadius: 1, width: '80%' }} />
                            <Box sx={{ height: 8, bgcolor: '#e5e7eb', borderRadius: 1, width: '60%' }} />
                            <Box sx={{ height: 60, bgcolor: '#f3f4f6', borderRadius: 2, mt: 1 }} />
                            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                <Box sx={{ height: 8, bgcolor: '#e5e7eb', borderRadius: 1, flex: 1 }} />
                                <Box sx={{ height: 8, bgcolor: '#e5e7eb', borderRadius: 1, flex: 1 }} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default HeroMarketingSection;