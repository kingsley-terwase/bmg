/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
    Button,
    Box,
    useTheme,
    Paper,
    Typography,
    Grid,
    CircularProgress,
} from '@mui/material';

import {
    ChevronRight16Regular,
    DesignIdeas24Regular,
} from '@fluentui/react-icons';

import { useNavigate } from "react-router-dom";


const MegaDropdown = ({ items, isOpen, onMouseEnter, onMouseLeave, isGigs, categories, categoriesLoading }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const resolveAwsImage = (image) => {
        if (!image) return null;
        if (image.startsWith('http')) return image;
        return `${import.meta.env.VITE_AWS_BUCKET_URL}/${image}`;
    };

    // Initialize hoveredCategory based on whether it's Gigs or not
    const [hoveredCategory, setHoveredCategory] = useState(null);

    // Update hoveredCategory when dropdown opens or data changes
    React.useEffect(() => {
        if (isOpen && !hoveredCategory) {
            if (isGigs && categories?.length > 0) {
                setHoveredCategory(categories[0]?.id);
            } else if (items?.length > 0) {
                setHoveredCategory(items[0]?.category);
            }
        }
    }, [isOpen, isGigs, categories, items, hoveredCategory]);

    if (!isOpen) return null;

    const handleItemClick = (e, path) => {
        e.preventDefault();
        e.stopPropagation();
        if (path) {
            onMouseLeave();
            navigate(path);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // For Gigs, use API categories; for others, use static items
    const displayItems = isGigs && categories?.length > 0 ? categories : items;
    const currentCategory = isGigs && categories?.length > 0
        ? categories.find(cat => cat.id === hoveredCategory)
        : items.find(item => item.category === hoveredCategory);

    // 🔹 FIX: Return early if no current category found
    if (!currentCategory) {
        return null;
    }

    const hashedCategoryId = btoa(String(currentCategory.id));

    return (
        <Paper
            elevation={8}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            sx={{
                position: 'fixed',
                top: '70px',
                left: 0,
                right: 0,
                mx: 'auto',
                maxWidth: '1200px',
                borderRadius: 3,
                overflow: 'hidden',
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.palette.mode === 'dark'
                    ? '0 20px 60px rgba(0,0,0,0.7)'
                    : '0 20px 60px rgba(0,0,0,0.15)',
                zIndex: 1300,
                border: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Grid container sx={{ minHeight: 450 }}>
                {/* Sidebar with categories */}
                <Grid
                    size={{ xs: 3 }}
                    sx={{
                        backgroundColor: theme.palette.mode === 'dark'
                            ? theme.palette.primary.lightBg
                            : '#f8f9fa',
                        borderRight: `1px solid ${theme.palette.divider}`,
                        py: 3,
                        overflowY: 'auto',
                        maxHeight: 450
                    }}
                >
                    {categoriesLoading && isGigs ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <CircularProgress size={30} />
                        </Box>
                    ) : (
                        displayItems.map((item) => {
                            const itemId = isGigs ? item.id : item.category;
                            const itemName = isGigs ? item.name : item.category;
                            const itemIcon = isGigs ? <DesignIdeas24Regular /> : item.icon;

                            return (
                                <Box
                                    key={itemId}
                                    onMouseEnter={() => setHoveredCategory(itemId)}
                                    sx={{
                                        px: 3,
                                        py: 2.5,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        backgroundColor: hoveredCategory === itemId
                                            ? theme.palette.primary.main + '15'
                                            : 'transparent',
                                        borderLeft: hoveredCategory === itemId
                                            ? `4px solid ${theme.palette.primary.main}`
                                            : '4px solid transparent',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            backgroundColor: theme.palette.primary.main + '10',
                                        }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Box
                                            sx={{
                                                width: 42,
                                                height: 42,
                                                borderRadius: 2.5,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: hoveredCategory === itemId
                                                    ? theme.palette.primary.main
                                                    : theme.palette.primary.main + '20',
                                                color: hoveredCategory === itemId
                                                    ? theme.palette.primary.contrastText
                                                    : theme.palette.primary.main,
                                                transition: 'all 0.3s ease',
                                                boxShadow: hoveredCategory === itemId
                                                    ? `0 4px 12px ${theme.palette.primary.main}44`
                                                    : 'none'
                                            }}
                                        >
                                            {itemIcon}
                                        </Box>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: hoveredCategory === itemId ? 700 : 600,
                                                color: theme.palette.text.primary,
                                                fontSize: '0.95rem'
                                            }}
                                        >
                                            {itemName}
                                        </Typography>
                                    </Box>
                                    <ChevronRight16Regular
                                        style={{
                                            color: theme.palette.primary.main,
                                            opacity: hoveredCategory === itemId ? 1 : 0,
                                            transition: 'opacity 0.3s ease'
                                        }}
                                    />
                                </Box>
                            );
                        })
                    )}
                </Grid>

                <Grid size={{ xs: 9 }} sx={{ p: 4, overflowY: 'auto', maxHeight: 450 }}>
                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 800,
                                color: theme.palette.text.heading,
                                mb: 1
                            }}
                        >
                            {isGigs ? currentCategory.name : currentCategory.category}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.text.secondary,
                                fontSize: '0.95rem'
                            }}
                        >
                            {isGigs ? currentCategory.description : currentCategory.description}
                        </Typography>
                    </Box>

                    {isGigs ? (
                        // Display category image and short descriptions for Gigs
                        <Box>
                            {currentCategory.image && (
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: 200,
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        mb: 3,
                                        boxShadow: theme.palette.mode === 'dark'
                                            ? '0 4px 20px rgba(0,0,0,0.5)'
                                            : '0 4px 20px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    <img
                                        src={resolveAwsImage(currentCategory.image)}
                                        alt={currentCategory.name}
                                        loading="lazy"
                                        onError={(e) => {
                                            e.currentTarget.src = "/images/fallback-category.jpg";
                                        }}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </Box>
                            )}

                            {currentCategory.short_descriptions && (
                                <Grid container spacing={2}>
                                    {Object.entries(currentCategory.short_descriptions)
                                        .filter(([_, value]) => value && value.trim())
                                        .map(([key, desc]) => (
                                            <Grid size={{ xs: 12, sm: 6 }} key={key}>
                                                <Box
                                                    onClick={(e) =>
                                                        handleItemClick(e, `/category/${currentCategory.id}`)
                                                    }
                                                    sx={{
                                                        p: 2.5,
                                                        borderRadius: 3,
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        border: `1px solid ${theme.palette.divider}`,
                                                        '&:hover': {
                                                            backgroundColor: theme.palette.primary.main + '08',
                                                            borderColor: theme.palette.primary.main,
                                                            transform: 'translateY(-4px)',
                                                        }
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: theme.palette.text.primary,
                                                            lineHeight: 1.6,
                                                            fontSize: '0.9rem'
                                                        }}
                                                    >
                                                        {desc}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        ))}
                                </Grid>
                            )}

                            <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
                                <Button
                                    variant="contained"
                                    onClick={(e) =>
                                        handleItemClick(
                                            e,
                                            `/category/${encodeURIComponent(hashedCategoryId)}`
                                        )
                                    }
                                >
                                    Explore {currentCategory.name}
                                </Button>
                            </Box>
                        </Box>

                    ) : (
                        // Display static items for non-Gigs dropdowns
                        <>
                            <Grid container spacing={2.5}>
                                {currentCategory.items.map((subItem, idx) => (
                                    <Grid size={{ xs: 6 }} key={idx}>
                                        <Box
                                            onClick={(e) => handleItemClick(e, subItem.path)}
                                            sx={{
                                                p: 2.5,
                                                borderRadius: 3,
                                                cursor: subItem.path ? 'pointer' : 'default',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                border: `1px solid ${theme.palette.divider}`,
                                                backgroundColor: 'transparent',
                                                '&:hover': subItem.path ? {
                                                    backgroundColor: theme.palette.primary.main + '08',
                                                    borderColor: theme.palette.primary.main,
                                                    transform: 'translateY(-4px)',
                                                    boxShadow: theme.palette.mode === 'dark'
                                                        ? '0 8px 24px rgba(144, 202, 249, 0.2)'
                                                        : '0 8px 24px rgba(47, 49, 124, 0.15)'
                                                } : {}
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: theme.palette.text.primary,
                                                    mb: 0.5,
                                                    fontSize: '0.95rem'
                                                }}
                                            >
                                                {subItem.title}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: theme.palette.text.secondary,
                                                    display: 'block',
                                                    lineHeight: 1.5,
                                                    fontSize: '0.85rem'
                                                }}
                                            >
                                                {subItem.description}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>

                            {currentCategory.cta && (
                                <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
                                    <Button
                                        onClick={(e) => handleItemClick(e, currentCategory.ctaPath)}
                                        variant="contained"
                                        sx={{
                                            background: `linear-gradient(135deg, ${theme.palette.warning.light} 0%, ${theme.palette.warning.main} 100%)`,
                                            color: theme.palette.warning.contrastText,
                                            px: 4,
                                            py: 1.3,
                                            borderRadius: 2.5,
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            fontSize: '0.95rem',
                                            boxShadow: `0 4px 16px ${theme.palette.warning.main}44`,
                                            '&:hover': {
                                                background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
                                                boxShadow: `0 6px 24px ${theme.palette.warning.main}66`,
                                                transform: 'translateY(-2px)'
                                            },
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {currentCategory.cta}
                                    </Button>
                                </Box>
                            )}
                        </>
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default MegaDropdown;
