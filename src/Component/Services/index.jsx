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


export default function ServiceSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const cardsToShow = isMobile ? 1 : isTablet ? 2 : 4;
    const maxIndex = Math.max(0, services.length - cardsToShow);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                py: 8,
            }}
        >
            <Container maxWidth="lg">
                {/* Header */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 4,
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#2d3561',
                            color: 'white',
                            px: 4,
                            py: 1.5,
                            borderRadius: '25px',
                            textTransform: 'none',
                            fontSize: '16px',
                            fontWeight: 500,
                            boxShadow: '0 4px 20px rgba(45, 53, 97, 0.3)',
                            '&:hover': {
                                bgcolor: '#1f2540',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 25px rgba(45, 53, 97, 0.4)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Find the Services you need
                    </Button>
                </Box>

                {/* Services Title and Discover Link */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            color: '#1a1a1a',
                        }}
                    >
                        Services
                    </Typography>
                    <Button
                        endIcon={<ArrowRight24Regular />}
                        sx={{
                            color: '#2d3561',
                            textTransform: 'none',
                            fontSize: '16px',
                            fontWeight: 600,
                            '&:hover': {
                                bgcolor: 'transparent',
                                transform: 'translateX(5px)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Discover More Services
                    </Button>
                </Box>

                {/* Description */}
                <Typography
                    sx={{
                        color: '#666',
                        mb: 4,
                        maxWidth: '600px',
                        lineHeight: 1.6,
                    }}
                >
                    Ac urna elementum purus vulputate tincidunt. Quam maecenas feugiat congue orci, eget tellus pellentesque aliquet. Felis
                </Typography>

                {/* Slider Container */}
                <Box sx={{ position: 'relative' }}>
                    {/* Navigation Buttons */}
                    <IconButton
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        sx={{
                            position: 'absolute',
                            left: -20,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                            bgcolor: '#ff9800',
                            color: 'white',
                            width: 48,
                            height: 48,
                            boxShadow: '0 4px 15px rgba(255, 152, 0, 0.4)',
                            '&:hover': {
                                bgcolor: '#f57c00',
                                transform: 'translateY(-50%) scale(1.1)',
                            },
                            '&:disabled': {
                                bgcolor: '#ccc',
                                color: '#888',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <ChevronLeft24Regular />
                    </IconButton>

                    <IconButton
                        onClick={handleNext}
                        disabled={currentIndex === maxIndex}
                        sx={{
                            position: 'absolute',
                            right: -20,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                            bgcolor: '#ff9800',
                            color: 'white',
                            width: 48,
                            height: 48,
                            boxShadow: '0 4px 15px rgba(255, 152, 0, 0.4)',
                            '&:hover': {
                                bgcolor: '#f57c00',
                                transform: 'translateY(-50%) scale(1.1)',
                            },
                            '&:disabled': {
                                bgcolor: '#ccc',
                                color: '#888',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <ChevronRight24Regular />
                    </IconButton>

                    {/* Cards Container */}
                    <Box sx={{ overflow: 'hidden', px: 2 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 3,
                                transform: `translateX(-${currentIndex * (100 / cardsToShow + 3)}%)`,
                                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                        >
                            {services.map((service) => (
                                <Card
                                    key={service.id}
                                    sx={{
                                        minWidth: `calc(${100 / cardsToShow}% - 24px)`,
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-10px)',
                                            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
                                        },
                                    }}
                                >
                                    <Box sx={{ position: 'relative' }}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={service.image}
                                            alt={service.title}
                                            sx={{
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <Chip
                                            label={service.discount}
                                            sx={{
                                                position: 'absolute',
                                                top: 12,
                                                left: 12,
                                                bgcolor: '#2d3561',
                                                color: 'white',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                            }}
                                        />
                                    </Box>
                                    <CardContent sx={{ p: 3 }}>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: '#666',
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
                                                    color: '#1a1a1a',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                {service.title}
                                            </Typography>
                                            <Chip
                                                label={service.price}
                                                sx={{
                                                    bgcolor: '#2d3561',
                                                    color: 'white',
                                                    fontWeight: 600,
                                                    fontSize: '14px',
                                                }}
                                            />
                                        </Box>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{
                                                bgcolor: '#2d3561',
                                                color: 'white',
                                                py: 1.2,
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                fontSize: '15px',
                                                fontWeight: 600,
                                                '&:hover': {
                                                    bgcolor: '#1f2540',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 6px 20px rgba(45, 53, 97, 0.3)',
                                                },
                                                transition: 'all 0.3s ease',
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