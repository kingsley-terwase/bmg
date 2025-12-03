import React, { useState } from 'react';
import {
    Button,
    Container,
    Box,
    Typography,
    TextField,
    InputAdornment,
    Chip,
    Avatar
} from '@mui/material';
import {
    Search,
    Close,
    ArrowForward
} from '@mui/icons-material';
import { FONT_FAMILY } from '../../Config/font';
import { Search20Filled, SearchFilled } from '@fluentui/react-icons';

export const HeroSection = () => {
    const [searchValue, setSearchValue] = useState('');
    const services = ['Web Design', 'Logo Design', 'Video Editing', 'Marketing'];

    return (
        <Box
            sx={{
                // background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
                // py: { xs: 6, md: 10 },
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    minHeight: { md: '600px' }
                }}
            >
                <Box
                    sx={{
                        flex: { md: '0 0 55%' },
                        width: { xs: '100%', md: '50%' },
                        display: 'flex',
                        // justifyContent: { md: 'flex-end' },
                        // px: { xs: 2, sm: 3 }
                    }}
                >
                    <Container
                        maxWidth="lg"
                        sx={{
                            pl: { xs: 2, md: 4, lg: 16 },
                            pr: { xs: 2, md: 6, lg: 10 }
                        }}
                    >
                        <Box sx={{
                            zIndex: 2,
                            maxWidth: { md: '550px', lg: '600px' }
                        }}>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: '2.5rem', md: '3rem', lg: '4rem' },
                                    fontWeight: 800,
                                    fontFamily:FONT_FAMILY.secondary,
                                    color: '#1e3a8a',
                                    lineHeight: 1.2,
                                    mb: 3
                                }}
                            >
                                Perfect Service
                                <br />
                                for your Business.
                            </Typography>

                            <Button
                                variant="outlined"
                                endIcon={<ArrowForward />}
                                sx={{
                                    borderColor: '#fbbf24',
                                    color: '#f59e0b',
                                    fontSize: '1rem',
                                    px: 3,
                                    py: 1.5,
                                    borderRadius: 2,
                                    mb: 4,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    '&:hover': {
                                        borderColor: '#f59e0b',
                                        backgroundColor: 'rgba(251, 191, 36, 0.1)'
                                    }
                                }}
                            >
                                Explore BMG
                            </Button>

                            <Box
                                sx={{
                                    p: 3,
                                    backgroundColor: 'white',
                                    borderRadius: 3,
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    mb: 4
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontStyle: 'italic',
                                        color: '#374151',
                                        mb: 2,
                                        fontSize: '0.95rem',
                                        lineHeight: 1.6
                                    }}
                                >
                                    "Viverra viverra nibh enim et aliquam, enim. Tempor, sit mus viverra orci dui
                                    consequat turpis scelerisque faucibus."
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar
                                        src=""
                                        sx={{ width: 48, height: 48, bgcolor: '#3b49df' }}
                                    />
                                    <Box>
                                        <Typography sx={{ fontWeight: 600, color: '#1f2937' }}>
                                            Rwanda Melflor
                                        </Typography>
                                        <Typography sx={{ fontSize: '0.85rem', color: '#6b7280' }}>
                                            zerowaste.com
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            
                            <TextField
                                fullWidth
                                placeholder="Search for services"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search20Filled style={{ marginLeft:18, color: '#9ca3af' }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: '#fbbf24',
                                                    color: 'white',
                                                    px: 4,
                                                    py: 1.3,
                                                    borderRadius: 1,
                                                    textTransform: 'none',
                                                    fontWeight: 600,
                                                    '&:hover': {
                                                        backgroundColor: '#f59e0b'
                                                    }
                                                }}
                                            >
                                                Search
                                            </Button>
                                        </InputAdornment>
                                    )
                                }}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        p:0,
                                        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                                        '& fieldset': { border: 'none' },
                                        // pr: 1
                                    }
                                }}
                            />


                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                                {services.map((service) => (
                                    <Chip
                                        key={service}
                                        label={service}
                                        onDelete={() => { }}
                                        deleteIcon={<Close sx={{ fontSize: '1rem' }} />}
                                        sx={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e5e7eb',
                                            fontWeight: 500,
                                            '&:hover': {
                                                backgroundColor: '#f9fafb'
                                            }
                                        }}
                                    />
                                ))}
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    flexWrap: 'wrap'
                                }}
                            >
                                <Typography sx={{ fontWeight: 600, color: '#1f2937', fontSize: '0.9rem' }}>
                                    Rated 5/5 based on Customer Reviews
                                </Typography>
                                <Typography sx={{ color: '#6b7280', fontSize: '0.85rem' }}>
                                    Trusted by 25,000+ Brands
                                </Typography>
                            </Box>
                        </Box>
                    </Container>
                </Box>

                <Box
                    sx={{
                        flex: { md: '0 0 50%' },
                        width: { xs: '100%', md: '100%' },
                        position: 'relative',
                        // height: { xs: '500px', md: '600px', lg: '300px' },
                        display: { xs: 'none', md: 'block' }
                    }}
                >
                
                        <img
                            src="/Images/Img_2.png"
                            alt="Business Services"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />

                    <Box
                        sx={{
                            position: 'absolute',
                            bottom:-20,
                            left: 180,
                            width: { md: '60%', lg: '55%' },
                            height: { md: '35%', lg: '40%' },
                            zIndex: 2
                        }}
                    >
                        <Box
                           component="img"
                            src="/Illus/shape.png"
                            alt="Decorative Shape"
                            sx={{
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};