import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Container,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useTheme,
    Paper,
    Typography,
    Grid,
    Collapse,
    Divider,
    CircularProgress,
} from '@mui/material';

import {
    Navigation24Regular,
    Dismiss24Regular,
    ChevronDown20Regular,
    ChevronRight16Regular,
    People24Regular,
    Briefcase24Regular,
    DocumentText24Regular,
    Apps24Regular,
    DesignIdeas24Regular,
    Code24Regular,
    Megaphone24Regular,
    Edit24Regular,
    ChevronUp20Regular,
} from '@fluentui/react-icons';

import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeroSection } from '../Herosection';
import ThemeToggleButton from '../ThemeToggleBtn';
import PatnersLogo from '../PatnersLogo';
import { FONT_FAMILY } from '../../Config/font';
import { useCategories } from '../../Hooks/web_categories';

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

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState({});

    // Fetch categories from API
    const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

    const handleToggle = () => {
        setMobileOpen((prev) => !prev);
        setMobileDropdownOpen({});
    };

    const handleMobileDropdownToggle = (label) => {
        setMobileDropdownOpen(prev => ({
            ...prev,
            [label]: !prev[label]
        }));
    };

    const handleMobileNavigate = (path) => {
        if (path && path !== '#') {
            navigate(path);
            setMobileOpen(false);
            setMobileDropdownOpen({});
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Services dropdown data with routes
    const servicesData = [
        {
            category: 'Business Services',
            icon: <Briefcase24Regular />,
            description: 'Comprehensive business solutions',
            items: [
                { title: 'CRM Solutions', description: 'Customer relationship management', path: '/service' },
                { title: 'Project Management', description: 'Manage projects efficiently', path: '/service' },
                { title: 'Consulting', description: 'Expert business consulting', path: '/service' },
                { title: 'Analytics', description: 'Business intelligence and analytics', path: '/service' },
            ],
            cta: 'View All Services',
            ctaPath: '/service'
        },
        {
            category: 'Digital Services',
            icon: <Code24Regular />,
            description: 'Digital transformation services',
            items: [
                { title: 'Web Development', description: 'Custom website solutions', path: '/service' },
                { title: 'App Development', description: 'Mobile and web applications', path: '/service' },
                { title: 'Cloud Services', description: 'Cloud infrastructure and migration', path: '/service' },
                { title: 'API Integration', description: 'Third-party integrations', path: '/service' },
            ],
            cta: 'Explore Digital Services',
            ctaPath: '/service'
        },
        {
            category: 'Marketing Services',
            icon: <Megaphone24Regular />,
            description: 'Digital marketing solutions',
            items: [
                { title: 'SEO Services', description: 'Search engine optimization', path: '/service' },
                { title: 'Social Media', description: 'Social media management', path: '/service' },
                { title: 'Content Marketing', description: 'Content strategy and creation', path: '/service' },
                { title: 'Email Marketing', description: 'Email campaign management', path: '/service' },
            ],
            cta: 'Marketing Solutions',
            ctaPath: '/service'
        },
        {
            category: 'AI Services',
            icon: <Apps24Regular />,
            description: 'AI-powered solutions',
            items: [
                { title: 'AI Suites', description: 'Complete AI toolset', path: '/ai-suites' },
                { title: 'AI Web Generator', description: 'Generate websites with AI', path: '/ai-web' },
                { title: 'Automation', description: 'Business process automation', path: '/service' },
                { title: 'Machine Learning', description: 'ML model development', path: '/service' },
            ],
            cta: 'Discover AI Services',
            ctaPath: '/ai-suites'
        }
    ];

    // Others dropdown data
    const othersData = [
        {
            category: 'Company',
            icon: <Briefcase24Regular />,
            description: 'Learn more about us',
            items: [
                { title: 'About Us', description: 'Our story and mission', path: '/about-us' },
                { title: 'Pricing', description: 'View our pricing plans', path: '/pricing' },
                { title: 'How It Works', description: 'Learn how our platform works', path: '/how-it-works' },
                { title: 'Contact Us', description: 'Get in touch with us', path: '/contact-us' },
            ]
        },
        {
            category: 'Support',
            icon: <People24Regular />,
            description: 'Help and support center',
            items: [
                { title: 'Track Order', description: 'Track your order status', path: '/track-order' },
                { title: 'Resources', description: 'Helpful resources and guides', path: '/resources' },
                { title: 'AI Suites', description: 'Explore our AI tools', path: '/ai-suites' },
                { title: 'AI Web Generator', description: 'Generate websites with AI', path: '/ai-web' },
            ]
        },
        {
            category: 'Legal',
            icon: <DocumentText24Regular />,
            description: 'Policies and terms',
            items: [
                { title: 'Privacy Policy', description: 'How we protect your data', path: '/privacy-policy' },
                { title: 'Terms & Conditions', description: 'Terms and conditions', path: '/terms-conditions' },
                { title: 'Contact Us', description: 'Legal inquiries', path: '/contact-us' },
                { title: 'About Us', description: 'Company information', path: '/about-us' },
            ]
        },
        {
            category: 'More',
            icon: <Apps24Regular />,
            description: 'Additional features',
            items: [
                { title: 'Gift Voucher', description: 'Purchase gift vouchers', path: '/gift-voucher' },
                { title: 'Portfolio', description: 'View our work portfolio', path: '/portfolio' },
                { title: 'Blogs', description: 'Read our latest articles', path: '/blogs' },
                { title: 'Resources', description: 'Helpful resources', path: '/resources' },
            ]
        }
    ];

    const menuItems = [
        {
            label: 'Gigs',
            path: '/category',
            hasDropdown: true,
            dropdownData: [], // Will use categories from API
            isGigs: true // Flag to identify Gigs dropdown
        },
        { label: 'Services', path: '/service', hasDropdown: true, dropdownData: servicesData },
        { label: 'Portfolio', path: '/portfolio' },
        { label: 'Gift Voucher', path: '/gift-voucher' },
        { label: 'Others', path: '#', hasDropdown: true, dropdownData: othersData }
    ];

    const handleGetStarted = () => {
        navigate('/register');
    };

    // Handle dropdown enter - keep it open
    const handleDropdownMouseEnter = (label) => {
        setActiveDropdown(label);
    };

    // Handle dropdown leave - close it
    const handleDropdownMouseLeave = () => {
        setActiveDropdown(null);
    };

    return (
        <Box>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    backdropFilter: 'blur(20px)',
                    borderRadius: 0,
                    boxShadow: `0 2px 12px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)'}`,
                    borderBottom: `1px solid ${theme.palette.divider}`
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar sx={{ py: 1, display: "flex", justifyContent: "space-between" }}>
                        {/* Logo */}
                        <Box onClick={() => navigate('/')} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <Box
                                component="img"
                                alt="Logo"
                                src={theme.palette.mode === 'dark' ? '/Logo/LogoLight.png' : '/Logo/Logo.png'}
                                sx={{
                                    width: '80px',
                                    height: '100%',
                                    borderRadius: 2,
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)'
                                    }
                                }}
                            />
                        </Box>

                        {/* Desktop Menu */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, ml: 4 }}>
                            {menuItems.map((item) => (
                                <Box
                                    key={item.path}
                                    onMouseEnter={() => item.hasDropdown && handleDropdownMouseEnter(item.label)}
                                    onMouseLeave={() => item.hasDropdown && handleDropdownMouseLeave()}
                                    sx={{ position: 'relative' }}
                                >
                                    <Box
                                        component={item.hasDropdown ? 'div' : Link}
                                        to={!item.hasDropdown ? item.path : undefined}
                                        sx={{
                                            textDecoration: "none",
                                            color: theme.palette.text.primary,
                                            fontWeight: 700,
                                            fontFamily: FONT_FAMILY.unique,
                                            fontSize: '1rem',
                                            cursor: 'pointer',
                                            transition: "all 0.3s ease",
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            position: 'relative',
                                            '&:hover': {
                                                color: theme.palette.primary.main
                                            },
                                            '&::after': {
                                                content: '""',
                                                position: 'absolute',
                                                bottom: -8,
                                                left: 0,
                                                width: activeDropdown === item.label || location.pathname === item.path ? '100%' : '0%',
                                                height: '3px',
                                                backgroundColor: theme.palette.primary.main,
                                                transition: 'width 0.3s ease',
                                                borderRadius: '2px'
                                            }
                                        }}
                                    >
                                        {item.label}
                                        {item.hasDropdown && (
                                            <ChevronDown20Regular
                                                style={{
                                                    transition: 'transform 0.3s ease',
                                                    transform: activeDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)'
                                                }}
                                            />
                                        )}
                                    </Box>

                                    {item.hasDropdown && (
                                        <MegaDropdown
                                            items={item.dropdownData}
                                            isOpen={activeDropdown === item.label}
                                            onMouseEnter={() => handleDropdownMouseEnter(item.label)}
                                            onMouseLeave={handleDropdownMouseLeave}
                                            isGigs={item.isGigs}
                                            categories={categories}
                                            categoriesLoading={categoriesLoading}
                                        />
                                    )}
                                </Box>
                            ))}
                        </Box>

                        {/* CONTACT + CTA BUTTON (Desktop Only) */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
                            <Button
                                onClick={() => navigate('/contact-us')}
                                startIcon={<img src='/Icons/icons_1.png' style={{ width: 20 }} alt="contact" />}
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    color: theme.palette.text.primary,
                                    px: 2,
                                    fontFamily: FONT_FAMILY.unique,
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.main + '10'
                                    }
                                }}
                            >
                                Contact Us
                            </Button>

                            <ThemeToggleButton />

                            <Button
                                onClick={handleGetStarted}
                                variant="contained"
                                sx={{
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                                    color: theme.palette.primary.contrastText,
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    fontSize: '0.95rem',
                                    px: 3,
                                    py: 1,
                                    borderRadius: 2,
                                    fontFamily: FONT_FAMILY.unique,
                                    boxShadow: `0 4px 14px ${theme.palette.primary.main}55`,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: `0 6px 20px ${theme.palette.primary.main}77`,
                                        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                                    }
                                }}
                            >
                                Get Started 🚀
                            </Button>
                        </Box>

                        {/* Mobile Menu Button */}
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
                            <ThemeToggleButton />
                            <IconButton
                                onClick={handleToggle}
                                sx={{
                                    color: theme.palette.text.primary,
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.main + '15'
                                    }
                                }}
                            >
                                <Navigation24Regular />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleToggle}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: '85%',
                        maxWidth: 400,
                        backgroundColor: theme.palette.background.paper,
                        backgroundImage: 'none',
                    },
                }}
            >
                <Box sx={{ p: 3 }}>
                    {/* Drawer Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                        <Box
                            component="img"
                            alt="Logo"
                            src={theme.palette.mode === 'dark' ? '/Logo/LogoLight.png' : '/Logo/Logo.png'}
                            sx={{ width: '70px', height: 'auto', borderRadius: 2 }}
                        />
                        <IconButton
                            onClick={handleToggle}
                            sx={{
                                color: theme.palette.text.primary,
                                '&:hover': {
                                    backgroundColor: theme.palette.error.main + '15',
                                    color: theme.palette.error.main
                                }
                            }}
                        >
                            <Dismiss24Regular />
                        </IconButton>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Mobile Menu Items */}
                    <List sx={{ px: 1 }}>
                        {menuItems.map((item) => (
                            item.hasDropdown ? (
                                <MobileDropdown
                                    key={item.label}
                                    item={item}
                                    isOpen={mobileDropdownOpen[item.label]}
                                    onToggle={() => handleMobileDropdownToggle(item.label)}
                                    onNavigate={handleMobileNavigate}
                                    isGigs={item.isGigs}
                                    categories={categories}
                                    categoriesLoading={categoriesLoading}
                                />
                            ) : (
                                <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                                    <ListItemButton
                                        component={Link}
                                        to={item.path}
                                        onClick={handleToggle}
                                        sx={{
                                            borderRadius: 2,
                                            py: 2,
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
                                    </ListItemButton>
                                </ListItem>
                            )
                        ))}
                    </List>

                    <Divider sx={{ my: 3 }} />

                    {/* Mobile CTA Buttons */}
                    <Box sx={{ px: 1 }}>
                        <Button
                            fullWidth
                            onClick={() => {
                                handleToggle();
                                navigate('/contact-us');
                            }}
                            startIcon={<img src='/Icons/icons_1.png' style={{ width: 20 }} alt="contact" />}
                            sx={{
                                mb: 2,
                                py: 1.5,
                                textTransform: 'none',
                                fontWeight: 600,
                                color: theme.palette.text.primary,
                                border: `2px solid ${theme.palette.divider}`,
                                borderRadius: 2,
                                fontFamily: FONT_FAMILY.unique,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.main + '10',
                                    borderColor: theme.palette.primary.main
                                }
                            }}
                        >
                            Contact Us
                        </Button>

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => {
                                handleToggle();
                                handleGetStarted();
                            }}
                            sx={{
                                py: 1.5,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                                color: theme.palette.primary.contrastText,
                                textTransform: 'none',
                                fontWeight: 700,
                                fontSize: '1rem',
                                borderRadius: 2,
                                fontFamily: FONT_FAMILY.unique,
                                boxShadow: `0 4px 14px ${theme.palette.primary.main}55`,
                                '&:hover': {
                                    boxShadow: `0 6px 20px ${theme.palette.primary.main}77`,
                                }
                            }}
                        >
                            Get Started
                        </Button>
                    </Box>

                    {/* Mobile Footer Info */}
                    <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                            Need help?
                        </Typography>
                        <Typography variant="body2" fontWeight={600} color="primary.main">
                            support@bestmarketinggiggs.com
                        </Typography>
                    </Box>
                </Box>
            </Drawer>

            {isHomePage && (
                <>
                    <Box sx={{ pt: 0 }}>
                        <HeroSection />
                    </Box>
                    <PatnersLogo />
                </>
            )}
        </Box>
    );
};

export default Header;