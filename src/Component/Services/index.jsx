import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Container,
    IconButton,
    Typography,
    useTheme,
    useMediaQuery,
} from '@mui/material';

import {
    ChevronLeft24Regular,
    ChevronRight24Regular,
    ArrowRight24Regular,
} from '@fluentui/react-icons';

import { services } from './data';
import { useNavigate } from 'react-router-dom';

export default function ServiceSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const theme = useTheme();

    const navigate = useNavigate();

    const handleDiscoverMore = () => {
        navigate('/service');
    };

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const cardsToShow = isMobile ? 1 : isTablet ? 2 : 4;
    const maxIndex = Math.max(0, services.length - cardsToShow);

    const handlePrev = () => setCurrentIndex(prev => Math.max(0, prev - 1));
    const handleNext = () => setCurrentIndex(prev => Math.min(maxIndex, prev + 1));

    return (
        <Box
            sx={{
                minHeight: '100vh',
                py: 2,
                background: `linear-gradient(135deg, ${theme.palette.background.default}, ${theme.palette.accent.lightBlue})`,
            }}
        >
            <Container maxWidth="lg">
                <Box
                    data-aos='fade-down'
                    sx={{
                        display: { xs: 'block', md:'flex' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // mb: 3,
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            fontWeight: 800,
                            color: theme.palette.text.heading,
                        }}
                    >
                        Services
                    </Typography>

                    <Button
                        onClick={handleDiscoverMore}
                        endIcon={<ArrowRight24Regular />}
                        sx={{
                            color: theme.palette.primary.main,
                            textTransform: 'none',
                            fontSize: '26px',
                            fontWeight: 800,
                            transition: '0.3s',
                            '&:hover': {
                                transform: 'translateX(5px)',
                                bgcolor: 'transparent',
                            },
                        }}
                    >
                        Discover More Services
                    </Button>
                </Box>

                {/* DESCRIPTION */}
                <Typography
                    sx={{
                        color: theme.palette.text.secondary,
                        mb: 4,
                        maxWidth: '600px',
                        lineHeight: 1.6,
                    }}
                >
                    Ac urna elementum purus vulputate tincidunt. Quam maecenas feugiat congue orci, eget tellus pellentesque aliquet.
                </Typography>

                <Box data-aos='fade-down' sx={{ position: 'relative' }}>

                    <IconButton
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        sx={{
                            position: 'absolute',
                            left: -20,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                            bgcolor: theme.palette.warning.light,
                            color: theme.palette.warning.contrastText,
                            width: 48,
                            height: 48,
                            boxShadow: `0 4px 15px ${theme.palette.warning.light}55`,
                            transition: '0.3s',
                            '&:hover': {
                                bgcolor: theme.palette.warning.main,
                                transform: 'translateY(-50%) scale(1.1)',
                            },
                            '&:disabled': {
                                bgcolor: theme.palette.divider,
                                color: theme.palette.text.disabled,
                            },
                        }}
                    >
                        <ChevronLeft24Regular />
                    </IconButton>

                    {/* NEXT BUTTON */}
                    <IconButton
                        onClick={handleNext}
                        disabled={currentIndex === maxIndex}
                        sx={{
                            position: 'absolute',
                            right: -20,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                            bgcolor: theme.palette.warning.light,
                            color: theme.palette.warning.contrastText,
                            width: 48,
                            height: 48,
                            boxShadow: `0 4px 15px ${theme.palette.warning.light}55`,
                            transition: '0.3s',
                            '&:hover': {
                                bgcolor: theme.palette.warning.main,
                                transform: 'translateY(-50%) scale(1.1)',
                            },
                            '&:disabled': {
                                bgcolor: theme.palette.divider,
                                color: theme.palette.text.disabled,
                            },
                        }}
                    >
                        <ChevronRight24Regular />
                    </IconButton>

                    <Box sx={{ overflow: 'hidden', px: 2 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                py: 2,
                                transform: `translateX(-${currentIndex * (100 / cardsToShow + 3)}%)`,
                                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                        >
                            {services.map(service => (
                                <Card
                                    key={service.id}
                                    sx={{
                                        minWidth: `calc(${100 / cardsToShow}% - 24px)`,
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        background: theme.palette.background.paper,
                                        boxShadow: `0 8px 30px ${theme.palette.primary.main}20`,
                                        transition: '0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-10px)',
                                            boxShadow: `0 15px 40px ${theme.palette.primary.main}30`,
                                        },
                                    }}
                                >
                                    <Box sx={{ position: 'relative' }}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={service.image}
                                            alt={service.title}
                                            sx={{ objectFit: 'cover' }}
                                        />

                                        <Chip
                                            label={service.discount}
                                            sx={{
                                                position: 'absolute',
                                                top: 12,
                                                left: 12,
                                                borderRadius: 1,
                                                bgcolor: theme.palette.primary.main,
                                                color: theme.palette.primary.contrastText,
                                                fontWeight: 600,
                                                fontSize: '14px',
                                            }}
                                        />
                                    </Box>

                                    {/* CONTENT */}
                                    <CardContent sx={{ p: 3 }}>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: theme.palette.text.secondary,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                fontWeight: 600,
                                                fontSize: '12px',
                                            }}
                                        >
                                            {service.category}
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                mt: 1,
                                                mb: 2,
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: theme.palette.text.primary,
                                                    fontSize: '16px',
                                                }}
                                            >
                                                {service.title}
                                            </Typography>

                                            <Chip
                                                label={service.price}
                                                sx={{
                                                    bgcolor: theme.palette.primary.main,
                                                    color: theme.palette.primary.contrastText,
                                                    fontWeight: 600,
                                                    fontSize: '14px',
                                                }}
                                            />
                                        </Box>

                                        {/* BUTTON */}
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{
                                                bgcolor: theme.palette.primary.main,
                                                color: theme.palette.primary.contrastText,
                                                py: 1,
                                                borderRadius: 2,
                                                textTransform: 'none',
                                                fontSize: '15px',
                                                fontWeight: 600,
                                                transition: '0.3s',
                                                '&:hover': {
                                                    bgcolor: theme.palette.primary.dark,
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: `0 6px 20px ${theme.palette.primary.main}30`,
                                                },
                                            }}
                                        >
                                            Start Now
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
