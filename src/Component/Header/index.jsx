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
    Chip,
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

const MegaDropdown = ({ items, isOpen, onClose }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [hoveredCategory, setHoveredCategory] = useState(items[0]?.category || '');

    if (!isOpen) return null;

    const currentCategory = items.find(item => item.category === hoveredCategory);

    const handleItemClick = (e, path) => {
        e.preventDefault();
        e.stopPropagation();
        if (path) {
            onClose();
            navigate(path);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <Paper
            elevation={8}
            onMouseEnter={(e) => e.stopPropagation()}
            onMouseLeave={onClose}
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
                <Grid
                    size={{ xs:3 }}
                    sx={{
                        backgroundColor: theme.palette.mode === 'dark'
                            ? theme.palette.primary.lightBg
                            : '#f8f9fa',
                        borderRight: `1px solid ${theme.palette.divider}`,
                        py: 3
                    }}
                >
                    {items.map((item) => (
                        <Box
                            key={item.category}
                            onMouseEnter={() => setHoveredCategory(item.category)}
                            sx={{
                                px: 3,
                                py: 2.5,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: hoveredCategory === item.category
                                    ? theme.palette.primary.main + '15'
                                    : 'transparent',
                                borderLeft: hoveredCategory === item.category
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
                                        backgroundColor: hoveredCategory === item.category
                                            ? theme.palette.primary.main
                                            : theme.palette.primary.main + '20',
                                        color: hoveredCategory === item.category
                                            ? theme.palette.primary.contrastText
                                            : theme.palette.primary.main,
                                        transition: 'all 0.3s ease',
                                        boxShadow: hoveredCategory === item.category
                                            ? `0 4px 12px ${theme.palette.primary.main}44`
                                            : 'none'
                                    }}
                                >
                                    {item.icon}
                                </Box>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: hoveredCategory === item.category ? 700 : 600,
                                        color: theme.palette.text.primary,
                                        fontSize: '0.95rem'
                                    }}
                                >
                                    {item.category}
                                </Typography>
                            </Box>
                            <ChevronRight16Regular
                                style={{
                                    color: theme.palette.primary.main,
                                    opacity: hoveredCategory === item.category ? 1 : 0,
                                    transition: 'opacity 0.3s ease'
                                }}
                            />
                        </Box>
                    ))}
                </Grid>

                <Grid size={{ xs:9 }} sx={{ p: 4 }}>
                    {currentCategory && (
                        <>
                            <Box sx={{ mb: 4 }}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 800,
                                        color: theme.palette.text.heading,
                                        mb: 1
                                    }}
                                >
                                    {currentCategory.category}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        fontSize: '0.95rem'
                                    }}
                                >
                                    {currentCategory.description}
                                </Typography>
                            </Box>

                            <Grid container spacing={2.5}>
                                {currentCategory.items.map((subItem, idx) => (
                                    <Grid size={{ xs:6 }} key={idx}>
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

const MobileDropdown = ({ item, isOpen, onToggle, onNavigate }) => {
    const theme = useTheme();
    const [expandedCategory, setExpandedCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    const handleItemClick = (path) => {
        onNavigate(path);
    };

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
                    {item.dropdownData?.map((category) => (
                        <Box key={category.category} sx={{ mb: 1 }}>
                            <Box
                                onClick={() => handleCategoryClick(category.category)}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    p: 1.5,
                                    borderRadius: 2,
                                    backgroundColor: expandedCategory === category.category
                                        ? theme.palette.primary.main + '15'
                                        : theme.palette.primary.main + '08',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    border: `1px solid ${expandedCategory === category.category ? theme.palette.primary.main : 'transparent'}`,
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.main + '15'
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
                                        }}
                                    >
                                        {category.icon}
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 700,
                                                color: theme.palette.text.primary,
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            {category.category}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: theme.palette.text.secondary,
                                                fontSize: '0.75rem'
                                            }}
                                        >
                                            {category.description}
                                        </Typography>
                                    </Box>
                                </Box>
                                {expandedCategory === category.category ?
                                    <ChevronUp20Regular style={{ color: theme.palette.primary.main }} /> :
                                    <ChevronDown20Regular style={{ color: theme.palette.text.secondary }} />
                                }
                            </Box>

                            <Collapse in={expandedCategory === category.category} timeout="auto" unmountOnExit>
                                <Box sx={{ pl: 2, pt: 1 }}>
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
                                </Box>
                            </Collapse>
                        </Box>
                    ))}
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

    // Gigs dropdown data with routes
    const gigsData = [
        {
            category: 'Design & Creative',
            icon: <DesignIdeas24Regular />,
            description: 'Creative services for your business',
            items: [
                { title: 'Logo Design', description: 'Professional logo design services', path: '/category' },
                { title: 'Brand Identity', description: 'Complete brand identity packages', path: '/category' },
                { title: 'UI/UX Design', description: 'User interface and experience design', path: '/category' },
                { title: 'Illustration', description: 'Custom illustrations and artwork', path: '/category' },
            ],
            cta: 'Browse Design Gigs',
            ctaPath: '/category'
        },
        {
            category: 'Development',
            icon: <Code24Regular />,
            description: 'Software development services',
            items: [
                { title: 'Web Development', description: 'Custom website development', path: '/category' },
                { title: 'Mobile Apps', description: 'iOS and Android app development', path: '/category' },
                { title: 'E-commerce', description: 'Online store development', path: '/category' },
                { title: 'WordPress', description: 'WordPress customization', path: '/category' },
            ],
            cta: 'Find Developers',
            ctaPath: '/category'
        },
        {
            category: 'Digital Marketing',
            icon: <Megaphone24Regular />,
            description: 'Marketing and promotion services',
            items: [
                { title: 'SEO Services', description: 'Search engine optimization', path: '/category' },
                { title: 'Content Marketing', description: 'Content strategy and creation', path: '/category' },
                { title: 'Social Media', description: 'Social media management', path: '/category' },
                { title: 'PPC Advertising', description: 'Pay-per-click campaigns', path: '/category' },
            ],
            cta: 'Marketing Experts',
            ctaPath: '/category'
        },
        {
            category: 'Writing & Translation',
            icon: <Edit24Regular />,
            description: 'Professional writing services',
            items: [
                { title: 'Copywriting', description: 'Compelling marketing copy', path: '/category' },
                { title: 'Content Writing', description: 'Blog posts and articles', path: '/category' },
                { title: 'Technical Writing', description: 'Documentation and guides', path: '/category' },
                { title: 'Translation', description: 'Professional translation services', path: '/category' },
            ],
            cta: 'Hire Writers',
            ctaPath: '/category'
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
        { label: 'Gigs', path: '/category', hasDropdown: true, dropdownData: gigsData },
        { label: 'Services', path: '/service', hasDropdown: true, dropdownData: servicesData },
        { label: 'Portfolio', path: '/portfolio' },
        { label: 'Gift Voucher', path: '/gift-voucher' },
        { label: 'Others', path: '#', hasDropdown: true, dropdownData: othersData }
    ];

    const handleGetStarted = () => {
        navigate('/register');
    };

    return (
        <Box>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    backdropFilter: 'blur(20px)',
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
                                src="/Logo/Logo.png"
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
                                    onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                                    onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
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
                                            onClose={() => setActiveDropdown(null)}
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
                                Get Started
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
                            src="/Logo/Logo.png"
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