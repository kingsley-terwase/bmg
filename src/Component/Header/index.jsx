/* eslint-disable no-unused-vars */
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
    Typography,
    Divider,
} from '@mui/material';

import {
    Navigation24Regular,
    Dismiss24Regular,
    ChevronDown20Regular,
    People24Regular,
    Briefcase24Regular,
    DocumentText24Regular,
    Apps24Regular,
    Code24Regular,
    Megaphone24Regular,
} from '@fluentui/react-icons';

import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeroSection } from '../Herosection';
import ThemeToggleButton from '../ThemeToggleBtn';
import PatnersLogo from '../PatnersLogo';
import { FONT_FAMILY } from '../../Config/font';
import { useCategories } from '../../Hooks/web_categories';
import { useUserContext } from '../../Contexts';
import MegaDropdown from './MegaDropdown';
import MobileDropdown from './MobileDropdown';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState({});

    const { categories, loading: categoriesLoading } = useCategories();
    const { user } = useUserContext();

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
                { title: 'CRM Solutions', description: 'Customer relationship management', path: '/services' },
                { title: 'Project Management', description: 'Manage projects efficiently', path: '/services' },
                { title: 'Consulting', description: 'Expert business consulting', path: '/services' },
                { title: 'Analytics', description: 'Business intelligence and analytics', path: '/services' },
            ],
            cta: 'View All Services',
            ctaPath: '/services'
        },
        {
            category: 'Digital Services',
            icon: <Code24Regular />,
            description: 'Digital transformation services',
            items: [
                { title: 'Web Development', description: 'Custom website solutions', path: '/services' },
                { title: 'App Development', description: 'Mobile and web applications', path: '/services' },
                { title: 'Cloud Services', description: 'Cloud infrastructure and migration', path: '/services' },
                { title: 'API Integration', description: 'Third-party integrations', path: '/services' },
            ],
            cta: 'Explore Digital Services',
            ctaPath: '/services'
        },
        {
            category: 'Marketing Services',
            icon: <Megaphone24Regular />,
            description: 'Digital marketing solutions',
            items: [
                { title: 'SEO Services', description: 'Search engine optimization', path: '/services' },
                { title: 'Social Media', description: 'Social media management', path: '/services' },
                { title: 'Content Marketing', description: 'Content strategy and creation', path: '/services' },
                { title: 'Email Marketing', description: 'Email campaign management', path: '/services' },
            ],
            cta: 'Marketing Solutions',
            ctaPath: '/services'
        },
        {
            category: 'AI Services',
            icon: <Apps24Regular />,
            description: 'AI-powered solutions',
            items: [
                { title: 'AI Suites', description: 'Complete AI toolset', path: '/ai-suites' },
                { title: 'AI Web Generator', description: 'Generate websites with AI', path: '/ai-web' },
                { title: 'Automation', description: 'Business process automation', path: '/services' },
                { title: 'Machine Learning', description: 'ML model development', path: '/services' },
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
                { title: 'Track Order', description: 'Track your order status', path: '/process-order' },
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
        { label: 'Services', path: '/services', hasDropdown: true, dropdownData: servicesData },
        { label: 'Portfolio', path: '/portfolio' },
        { label: 'Gift Voucher', path: '/gift-voucher' },
        { label: 'Others', path: '#', hasDropdown: true, dropdownData: othersData }
    ];

    const handleGetStarted = () => {
        if (user?.user) {
            navigate('/dashboard');
        } else {
            navigate('/register');
        }

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
                                {user?.user
                                    ? `Welcome, ${user.user.first_name.charAt(0)}. ${user.user.last_name}`
                                    : "Get Started"}
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