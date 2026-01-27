import React from 'react';
import { Card, CardMedia, Box, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { encodeServiceId, resolveAwsImage } from '../../../utils/functions';
import { useNavigate } from 'react-router-dom';


const GigsGrid = ({ gigs, loading }) => {
    const theme = useTheme();
    const navigate = useNavigate()

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (!gigs || gigs.length === 0) {
        return <Typography>No categories available</Typography>;
    }

    return (
        <Grid container spacing={2} sx={{ mt: 2 }}>
            {gigs.map((gig) => (
                <Grid size={{ xs: 6, sm: 4, md: 2, lg: 3, xl: 3 }} key={gig.id}>
                    <Card
                        onClick={() => navigate(`/category/${encodeServiceId(gig.id)}/${gig?.name}`)}
                        sx={{
                            position: 'relative',
                            height: 350,
                            overflow: 'hidden',
                            cursor: 'pointer',
                            bgcolor: theme.palette.background.paper,
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                transform: 'translateY(-12px) scale(1.02)',
                                boxShadow: theme.palette.mode === 'dark'
                                    ? '0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(144, 202, 249, 0.3)'
                                    : '0 20px 40px rgba(47, 49, 124, 0.2), 0 0 0 1px rgba(47, 49, 124, 0.1)',
                                '& .card-image': {
                                    transform: 'scale(1.1)',
                                },
                                '& .overlay': {
                                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(47, 49, 124, 0.7))',
                                },
                                '& .category-chip': {
                                    transform: 'translateY(-5px)',
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                },
                                '& .label-text': {
                                    transform: 'translateX(10px)',
                                    color: theme.palette.primary.light,
                                },
                                '& .hover-icon': {
                                    opacity: 1,
                                    transform: 'translate(-50%, -50%) scale(1)',
                                },
                            },
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="350"
                            image={resolveAwsImage(gig.image) || '/placeholder-image.jpg'}
                            alt={gig.name}
                            className="card-image"
                            sx={{
                                objectFit: 'cover',
                                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                        />

                        <Box
                            className="hover-icon"
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%) scale(0)',
                                opacity: 0,
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                borderRadius: '50%',
                                width: 60,
                                height: 60,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                            }}
                        >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M5 12h14M12 5l7 7-7 7"
                                    stroke={theme.palette.primary.main}
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Box>

                        <Box
                            className="overlay"
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3))',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                p: 2,
                                transition: 'background 0.4s ease',
                            }}
                        >
                            <Box
                                className="category-chip"
                                sx={{
                                    display: 'inline-block',
                                    alignSelf: 'flex-start',
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: '20px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: '#fff',
                                        fontWeight: 600,
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    {Object.keys(gig.short_descriptions || {})[0] || 'Category'}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography
                                    variant="body2"
                                    className="label-text"
                                    sx={{
                                        color: '#fff',
                                        fontWeight: 700,
                                        fontSize: '1.1rem',
                                        transition: 'all 0.3s ease',
                                        textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                                    }}
                                >
                                    {gig.name}
                                </Typography>
                                <Box
                                    sx={{
                                        width: 0,
                                        height: '3px',
                                        backgroundColor: theme.palette.primary.light,
                                        transition: 'width 0.4s ease',
                                        mt: 1,
                                        borderRadius: '2px',
                                        '.MuiCard-root:hover &': {
                                            width: '60px',
                                        },
                                    }}
                                />
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default GigsGrid;