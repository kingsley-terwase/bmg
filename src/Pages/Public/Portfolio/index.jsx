import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    Chip,
    Tabs,
    Tab,
    CircularProgress,
    TextField,
    InputAdornment,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    Search24Regular,
} from '@fluentui/react-icons';
import { useGetAllPortfolio, useGetCategories } from '../../../Hooks/general';
import StatsSection from '../../../Component/StatsSection';
import ProjectSection from '../../../Component/ProjectsSection';

const PortfolioPage = () => {
    const theme = useTheme();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const observerTarget = useRef(null);

    const { data: categories, loading: categoriesLoading } = useGetCategories();

    const {
        data: portfolio,
        loading: portfolioLoading,
        hasMore,
        loadMore,
    } = useGetAllPortfolio({
        limit: 20,
        category: selectedCategory,
        search: debouncedSearch,
        status: true,
        sort: 'created_at',
        order: 'desc',
    });

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !portfolioLoading) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [hasMore, portfolioLoading, loadMore]);

    const handleCategoryChange = (e, newValue) => {
        setSelectedCategory(newValue === 'all' ? null : newValue);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Prepare categories for tabs
    const tabCategories = [
        { id: 'all', name: 'All' },
        ...(categories || []).map(cat => ({
            id: cat.id || cat,
            name: cat.name || cat
        }))
    ];

    // Initial loading state
    if (categoriesLoading && portfolio.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh'
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', mt: 2 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                    py: { xs: 10, md: 9 },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-50%',
                        left: '-20%',
                        width: '800px',
                        height: '800px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '50%',
                        animation: 'float 20s ease-in-out infinite',
                    },
                    '@keyframes float': {
                        '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
                        '50%': { transform: 'translate(30px, 30px) scale(1.1)' },
                    },
                }}
            >
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Chip
                            label="OUR WORK"
                            sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: '0.875rem',
                                mb: 3,
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                            }}
                        />
                        <Typography
                            variant="h1"
                            sx={{
                                fontWeight: 900,
                                fontSize: { xs: '2.5rem', md: '2.8rem' },
                                color: '#fff',
                                mb: 3,
                                lineHeight: 1.1,
                            }}
                        >
                            Our Portfolio
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                mb: 2,
                                maxWidth: 700,
                                mx: 'auto',
                                lineHeight: 1.6,
                            }}
                        >
                            Explore stunning websites created with BMG's AI-powered platform
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                maxWidth: 600,
                                mx: 'auto',
                            }}
                        >
                            From e-commerce to portfolios, see what's possible with our technology
                        </Typography>
                    </Box>
                </Container>
            </Box>

            {/* Filter Section */}
            <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 2, mb: 8 }}>
                <Card
                    sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    }}
                >
                    {/* Search Bar */}
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            placeholder="Search portfolios..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search24Regular />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                },
                            }}
                        />
                    </Box>

                    {/* Category Tabs */}
                    <Tabs
                        value={selectedCategory || 'all'}
                        onChange={handleCategoryChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '1rem',
                                minHeight: 48,
                                px: 3,
                            },
                            '& .Mui-selected': {
                                color: theme.palette.primary.main,
                            },
                        }}
                    >
                        {tabCategories.map((category) => (
                            <Tab
                                key={category.id}
                                label={category.name}
                                value={category.id}
                            />
                        ))}
                    </Tabs>
                </Card>
            </Container>

            <ProjectSection portfolio={portfolio} portfolioLoading={portfolioLoading} searchQuery={searchQuery} observerTarget={observerTarget} hasMore={hasMore} />

            <StatsSection />

        </Box>
    );
};

export default PortfolioPage;