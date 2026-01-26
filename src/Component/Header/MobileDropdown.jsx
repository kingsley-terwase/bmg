/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
    Button,
    Box,
    ListItemButton,
    ListItemText,
    useTheme,
    Typography,
    Collapse,
    CircularProgress,
} from '@mui/material';

import {
    ChevronDown20Regular,
    DesignIdeas24Regular,
    ChevronUp20Regular,
} from '@fluentui/react-icons';
import { FONT_FAMILY } from '../../Config/font';


const MobileDropdown = ({ item, isOpen, onToggle, onNavigate, isGigs, categories, categoriesLoading }) => {
    const theme = useTheme();
    const [expandedCategory, setExpandedCategory] = useState(null);

    const handleCategoryClick = (categoryId) => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    };

    const handleItemClick = (path) => {
        onNavigate(path);
    };

    // For Gigs, use API categories; for others, use static dropdownData
    const displayData = isGigs && categories?.length > 0 ? categories : item.dropdownData;

    return (
        <Box>
            <ListItemButton
                onClick={onToggle}
                sx={{
                    py: 2,
                    borderRadius: 2,
                    mb: 0.5,
                    '&:hover': {
                        backgroundColor: theme.palette.primary.main + '10'
                    }
                }}
            >
                <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        fontFamily: FONT_FAMILY.unique
                    }}
                />
                {isOpen ? <ChevronUp20Regular /> : <ChevronDown20Regular />}
            </ListItemButton>

            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <Box sx={{ pl: 2, pr: 1, pb: 2 }}>
                    {categoriesLoading && isGigs ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                            <CircularProgress size={24} />
                        </Box>
                    ) : (
                        displayData?.map((category) => {
                            const categoryId = isGigs ? category.id : category.category;
                            const categoryName = isGigs ? category.name : category.category;
                            const categoryDesc = category.description;
                            const categoryIcon = isGigs ? <DesignIdeas24Regular /> : category.icon;

                            return (
                                <Box key={categoryId} sx={{ mb: 1 }}>
                                    <Box
                                        onClick={() => handleCategoryClick(categoryId)}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            p: 1.5,
                                            borderRadius: 2,
                                            backgroundColor: expandedCategory === categoryId
                                                ? theme.palette.primary.main + '15'
                                                : theme.palette.primary.main + '08',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            border: `1px solid ${expandedCategory === categoryId ? theme.palette.primary.main : 'transparent'}`,
                                            '&:hover': {
                                                backgroundColor: theme.palette.primary.main + '15'
                                            }
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
                                            <Box
                                                sx={{
                                                    width: 36,
                                                    height: 36,
                                                    borderRadius: 2,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: theme.palette.primary.main,
                                                    color: theme.palette.primary.contrastText,
                                                    flexShrink: 0
                                                }}
                                            >
                                                {categoryIcon}
                                            </Box>
                                            <Box sx={{ minWidth: 0 }}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: 700,
                                                        color: theme.palette.text.primary,
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    {categoryName}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: theme.palette.text.secondary,
                                                        fontSize: '0.75rem',
                                                        display: 'block',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {categoryDesc}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        {expandedCategory === categoryId ?
                                            <ChevronUp20Regular style={{ color: theme.palette.primary.main, flexShrink: 0 }} /> :
                                            <ChevronDown20Regular style={{ color: theme.palette.text.secondary, flexShrink: 0 }} />
                                        }
                                    </Box>

                                    <Collapse in={expandedCategory === categoryId} timeout="auto" unmountOnExit>
                                        <Box sx={{ pl: 2, pt: 1 }}>
                                            {isGigs ? (
                                                // For Gigs: show image and short descriptions
                                                <>
                                                    {category.image && (
                                                        <Box
                                                            sx={{
                                                                width: '100%',
                                                                height: 120,
                                                                borderRadius: 2,
                                                                overflow: 'hidden',
                                                                mb: 1.5,
                                                            }}
                                                        >
                                                            <img
                                                                src={category.image}
                                                                alt={category.name}
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    objectFit: 'cover'
                                                                }}
                                                            />
                                                        </Box>
                                                    )}

                                                    {category.short_descriptions && (
                                                        <>
                                                            {Object.entries(category.short_descriptions)
                                                                .filter(([_, value]) => value && value.trim())
                                                                .map(([key, desc]) => (
                                                                    <Box
                                                                        key={key}
                                                                        onClick={() => handleItemClick(`/category/${category.id}`)}
                                                                        sx={{
                                                                            p: 1.5,
                                                                            mb: 0.5,
                                                                            borderRadius: 1.5,
                                                                            cursor: 'pointer',
                                                                            transition: 'all 0.2s ease',
                                                                            border: `1px solid ${theme.palette.divider}`,
                                                                            '&:hover': {
                                                                                backgroundColor: theme.palette.background.paper,
                                                                                borderColor: theme.palette.primary.main,
                                                                            }
                                                                        }}
                                                                    >
                                                                        <Typography
                                                                            variant="caption"
                                                                            sx={{
                                                                                color: theme.palette.text.primary,
                                                                                fontSize: '0.8rem',
                                                                                lineHeight: 1.5
                                                                            }}
                                                                        >
                                                                            {desc}
                                                                        </Typography>
                                                                    </Box>
                                                                ))
                                                            }
                                                        </>
                                                    )}

                                                    <Button
                                                        fullWidth
                                                        onClick={() => handleItemClick(`/category/${category.id}`)}
                                                        variant="contained"
                                                        size="small"
                                                        sx={{
                                                            mt: 1,
                                                            background: theme.palette.warning.light,
                                                            color: theme.palette.warning.contrastText,
                                                            textTransform: 'none',
                                                            fontWeight: 600,
                                                            fontSize: '0.85rem',
                                                            py: 1,
                                                            borderRadius: 1.5,
                                                            boxShadow: 'none',
                                                            '&:hover': {
                                                                background: theme.palette.warning.main,
                                                                boxShadow: `0 4px 12px ${theme.palette.warning.main}55`
                                                            }
                                                        }}
                                                    >
                                                        Explore {category.name}
                                                    </Button>
                                                </>
                                            ) : (
                                                // For non-Gigs: show static items
                                                <>
                                                    {category.items.map((subItem, idx) => (
                                                        <Box
                                                            key={idx}
                                                            onClick={() => handleItemClick(subItem.path)}
                                                            sx={{
                                                                p: 1.5,
                                                                mb: 0.5,
                                                                borderRadius: 1.5,
                                                                cursor: 'pointer',
                                                                transition: 'all 0.2s ease',
                                                                border: `1px solid ${theme.palette.divider}`,
                                                                '&:hover': {
                                                                    backgroundColor: theme.palette.background.paper,
                                                                    borderColor: theme.palette.primary.main,
                                                                }
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    color: theme.palette.text.primary,
                                                                    fontSize: '0.85rem',
                                                                    mb: 0.3
                                                                }}
                                                            >
                                                                {subItem.title}
                                                            </Typography>
                                                            <Typography
                                                                variant="caption"
                                                                sx={{
                                                                    color: theme.palette.text.secondary,
                                                                    fontSize: '0.75rem',
                                                                    lineHeight: 1.4
                                                                }}
                                                            >
                                                                {subItem.description}
                                                            </Typography>
                                                        </Box>
                                                    ))}

                                                    {category.cta && (
                                                        <Button
                                                            fullWidth
                                                            onClick={() => handleItemClick(category.ctaPath)}
                                                            variant="contained"
                                                            size="small"
                                                            sx={{
                                                                mt: 1,
                                                                background: theme.palette.warning.light,
                                                                color: theme.palette.warning.contrastText,
                                                                textTransform: 'none',
                                                                fontWeight: 600,
                                                                fontSize: '0.85rem',
                                                                py: 1,
                                                                borderRadius: 1.5,
                                                                boxShadow: 'none',
                                                                '&:hover': {
                                                                    background: theme.palette.warning.main,
                                                                    boxShadow: `0 4px 12px ${theme.palette.warning.main}55`
                                                                }
                                                            }}
                                                        >
                                                            {category.cta}
                                                        </Button>
                                                    )}
                                                </>
                                            )}
                                        </Box>
                                    </Collapse>
                                </Box>
                            );
                        })
                    )}
                </Box>
            </Collapse>
        </Box>
    );
};


export default MobileDropdown;
