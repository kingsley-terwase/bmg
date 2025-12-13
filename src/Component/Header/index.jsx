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
} from '@mui/material';

import {
    Navigation24Regular,
    Dismiss24Regular,
    ChevronDown20Regular,
    ChevronRight16Regular,
    People24Regular,
    Briefcase24Regular,
    Wrench24Regular,
    DocumentText24Regular,
    Apps24Regular,
    DesignIdeas24Regular,
    Code24Regular,
    Megaphone24Regular,
    Edit24Regular,
} from '@fluentui/react-icons';

import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeroSection } from '../Herosection';

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
                    ? '0 10px 40px rgba(0,0,0,0.5)'
                    : '0 10px 40px rgba(0,0,0,0.12)',
                zIndex: 1300,
            }}
        >
            <Grid container sx={{ minHeight: 400 }}>
                <Grid
                    size={{ xs: 3 }}
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
                                py: 2,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: hoveredCategory === item.category
                                    ? theme.palette.primary.main + '15'
                                    : 'transparent',
                                borderLeft: hoveredCategory === item.category
                                    ? `3px solid ${theme.palette.primary.main}`
                                    : '3px solid transparent',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.main + '10',
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: hoveredCategory === item.category
                                            ? theme.palette.primary.main
                                            : theme.palette.primary.main + '20',
                                        color: hoveredCategory === item.category
                                            ? theme.palette.primary.contrastText
                                            : theme.palette.primary.main,
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {item.icon}
                                </Box>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: hoveredCategory === item.category ? 700 : 500,
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    {item.category}
                                </Typography>
                            </Box>
                            <ChevronRight16Regular
                                style={{
                                    color: theme.palette.text.secondary,
                                    opacity: hoveredCategory === item.category ? 1 : 0,
                                    transition: 'opacity 0.2s ease'
                                }}
                            />
                        </Box>
                    ))}
                </Grid>

                <Grid size={{ xs: 9 }} sx={{ p: 4 }}>
                    {currentCategory && (
                        <>
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 700,
                                        color: theme.palette.text.heading,
                                        mb: 0.5
                                    }}
                                >
                                    {currentCategory.category}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: theme.palette.text.secondary }}
                                >
                                    {currentCategory.description}
                                </Typography>
                            </Box>

                            <Grid container spacing={2}>
                                {currentCategory.items.map((subItem, idx) => (
                                    <Grid item xs={6} key={idx}>
                                        <Box
                                            onClick={(e) => handleItemClick(e, subItem.path)}
                                            sx={{
                                                p: 2,
                                                borderRadius: 2,
                                                cursor: subItem.path ? 'pointer' : 'default',
                                                transition: 'all 0.2s ease',
                                                border: `1px solid ${theme.palette.divider}`,
                                                '&:hover': subItem.path ? {
                                                    backgroundColor: theme.palette.primary.main + '08',
                                                    borderColor: theme.palette.primary.main,
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: theme.palette.mode === 'dark'
                                                        ? '0 4px 12px rgba(144, 202, 249, 0.15)'
                                                        : '0 4px 12px rgba(47, 49, 124, 0.15)'
                                                } : {}
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: theme.palette.text.primary,
                                                    mb: 0.5
                                                }}
                                            >
                                                {subItem.title}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: theme.palette.text.secondary,
                                                    display: 'block',
                                                    lineHeight: 1.4
                                                }}
                                            >
                                                {subItem.description}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>

                            {currentCategory.cta && (
                                <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
                                    <Button
                                        onClick={(e) => handleItemClick(e, currentCategory.ctaPath)}
                                        variant="contained"
                                        sx={{
                                            backgroundColor: theme.palette.warning.light,
                                            color: theme.palette.warning.contrastText,
                                            px: 3,
                                            py: 1,
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            boxShadow: 'none',
                                            '&:hover': {
                                                backgroundColor: theme.palette.warning.main,
                                                boxShadow: `0 4px 12px ${theme.palette.warning.main}55`
                                            }
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

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleToggle = () => {
        setMobileOpen((prev) => !prev);
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
        { label: 'Resources', path: '/resources' },
        { label: 'Blogs', path: '/blogs' },
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
                    boxShadow: 0,
                    borderRadius: 0
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar sx={{ py: 1, display: "flex", justifyContent: "space-between" }}>

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
                                }}
                            />
                        </Box>

                        {/* DESKTOP MENU */}
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
                                            fontWeight: 500,
                                            fontSize: '0.95rem',
                                            cursor: 'pointer',
                                            transition: "0.2s",
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            '&:hover': {
                                                fontWeight: 700,
                                                color: theme.palette.primary.dark
                                            }
                                        }}
                                    >
                                        {item.label}
                                        {item.hasDropdown && (
                                            <ChevronDown20Regular
                                                style={{
                                                    transition: 'transform 0.2s',
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
                                startIcon={<img src='/Icons/icons_1.png' style={{ width: '100%' }} />}
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    color: theme.palette.text.primary
                                }}
                            >
                                +2349008709
                            </Button>

                            <Button
                                onClick={handleGetStarted}
                                variant="contained"
                                sx={{
                                    backgroundColor: theme.palette.warning.light,
                                    color: theme.palette.warning.contrastText,
                                    px: 3,
                                    py: 1.2,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    boxShadow: 'none',
                                    '&:hover': {
                                        backgroundColor: theme.palette.warning.main,
                                        boxShadow: `0 4px 12px ${theme.palette.warning.main}55`
                                    }
                                }}
                            >
                                Get Started
                            </Button>
                        </Box>

                        {/* MOBILE MENU ICON */}
                        <IconButton
                            onClick={handleToggle}
                            sx={{ display: { xs: 'flex', md: 'none' } }}
                        >
                            <Navigation24Regular style={{ color: theme.palette.text.primary }} />
                        </IconButton>

                    </Toolbar>
                </Container>
            </AppBar>

            {/* MOBILE DRAWER */}
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleToggle}
                PaperProps={{
                    sx: {
                        width: 260,
                        backgroundColor: theme.palette.background.default
                    }
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
                    <Box
                        component="img"
                        src="/Logo/Logo.png"
                        sx={{ width: 70 }}
                    />
                    <IconButton onClick={handleToggle}>
                        <Dismiss24Regular style={{ color: theme.palette.text.primary }} />
                    </IconButton>
                </Box>

                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.path} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                onClick={handleToggle}
                            >
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontSize: "1rem",
                                        fontWeight: 500,
                                        color: theme.palette.text.primary
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Box px={2} mt={2}>
                    <Button
                        fullWidth
                        startIcon={<img src='/Icons/icons_1.png' style={{ width: 20 }} />}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 500,
                            color: theme.palette.text.primary,
                            mb: 2
                        }}
                    >
                        +2349008709
                    </Button>

                    <Button
                        onClick={handleGetStarted}
                        fullWidth
                        variant="contained"
                        sx={{
                            backgroundColor: theme.palette.warning.light,
                            color: theme.palette.warning.contrastText,
                            py: 1.3,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                        }}
                    >
                        Get Started
                    </Button>
                </Box>
            </Drawer>

            {isHomePage && <HeroSection />}
        </Box>
    );
};

export default Header;