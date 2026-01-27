import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Card,
    CardMedia,
    CardContent,
    Chip,
    Grid,
    InputAdornment,
    CircularProgress,
    Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Search24Regular, ArrowRight24Regular, Mail24Regular, ArrowRight16Regular } from '@fluentui/react-icons';
import { useBlogs, useBlogCategories } from '../../../Hooks/web_blogs';
import { BMGPromoSection, CategoryTabs } from '../../../Component';
import { useGetCategories } from '../../../Hooks/general';
import GigsGrid from './GigsGrid';
import ScrollToTop from '../../../Component/ScrollToTop';

const AWS_BUCKET_URL = import.meta.env.VITE_AWS_BUCKET_URL;

const BlogPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch blogs and categories using hooks
    const { blogs, loading: blogsLoading, error: blogsError } = useBlogs();
    const { categories, loading: categoriesLoading, error: categoriesError } = useBlogCategories();
    const { data: gigs, loading: gigsLoading } = useGetCategories()

    // Separate blogs into big story, trending, and latest
    const bigStory = blogs[0] || null;
    const trendingStories = blogs.slice(1, 4) || [];
    const latestPosts = blogs.slice(4, 12) || [];
    const categoryPosts = blogs.slice(0, 8) || [];

    const handleBlogClick = (encodedId) => {
        navigate(`/blog/${encodedId}`);
    };

    const handleSearch = () => {
        // Implement search functionality
        console.log('Searching for:', searchQuery);
    };

    if (blogsLoading || categoriesLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', mt: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (blogsError || categoriesError) {
        return (
            <Box sx={{ mt: 8, px: 2 }}>
                <Container maxWidth="lg">
                    <Alert severity="error">
                        {blogsError || categoriesError}
                    </Alert>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ background: theme.palette.primary.contrastText, minHeight: '100vh', mt: 8 }}>
            <ScrollToTop />
            <CategoryTabs />
            <Box
                sx={{
                    background: theme.palette.primary.contrastText,
                    py: 8,
                }}
            >
                <Container maxWidth="sm">
                    <TextField
                        fullWidth
                        placeholder="Search for blogs"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment sx={{ pl: 2 }} position="start">
                                    <Search24Regular />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <Button
                                    variant="contained"
                                    onClick={handleSearch}
                                    sx={{
                                        px: 6,
                                        borderRadius: 2,
                                        py: 1.1,
                                        bgcolor: theme.palette.warning.main,
                                        '&:hover': { bgcolor: theme.palette.warning.dark },
                                        color: theme.palette.warning.contrastText,
                                    }}
                                >
                                    Search
                                </Button>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                bgcolor: theme.palette.background.paper,
                                borderRadius: 2,
                                border: `1px solid ${theme.palette.divider}`,
                                p: 0,
                                '& fieldset': { border: 'none' },
                            },
                        }}
                    />
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 8 }}>
                {/* Big Story Section */}
                {bigStory && (
                    <Box sx={{ mb: 8 }}>
                        <Typography variant="h2" color="text.heading" gutterBottom fontWeight={700}>
                            Find Trending Stories
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            Discover the latest insights and innovations shaping our world
                        </Typography>

                        <Typography variant="h5" color="text.heading" sx={{ mb: 3, fontWeight: 600 }}>
                            Big Story
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 7 }}>
                                <Card
                                    onClick={() => handleBlogClick(bigStory.encodedId)}
                                    sx={{
                                        height: '100%',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="400"
                                        image={`${AWS_BUCKET_URL}/${bigStory.image}`}
                                        alt={bigStory.title}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            background: `linear-gradient(to top, ${theme.palette.background.paper}, transparent)`,
                                            p: 3,
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                            <Chip
                                                label={bigStory.name}
                                                size="small"
                                                sx={{
                                                    bgcolor: theme.palette.primary.main,
                                                    color: theme.palette.primary.contrastText,
                                                    fontWeight: 600,
                                                }}
                                            />
                                            <Chip label="5 min read" size="small" variant="outlined" />
                                        </Box>
                                        <Typography variant="h4" color="text.heading" gutterBottom fontWeight={700}>
                                            {bigStory.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            {bigStory.content?.substring(0, 150)}...
                                        </Typography>
                                        <Button
                                            endIcon={<ArrowRight24Regular />}
                                            sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
                                        >
                                            Read more
                                        </Button>
                                    </Box>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, md: 5 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {trendingStories.map((story) => (
                                        <Card
                                            key={story.id}
                                            onClick={() => handleBlogClick(story.encodedId)}
                                            sx={{
                                                display: 'flex',
                                                height: 120,
                                                border: `1px solid ${theme.palette.divider}`,
                                                boxShadow: 0,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    boxShadow: 2,
                                                },
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 160 }}
                                                image={`${AWS_BUCKET_URL}/${story.image}`}
                                                alt={story.title}
                                            />
                                            <CardContent sx={{ flex: 1, py: 1.5, px: 2 }}>
                                                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                                    <Chip label={story.name} size="small" sx={{ fontSize: '0.7rem' }} />
                                                    <Chip label="5 min read" size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                                                </Box>
                                                <Typography variant="body1" color="text.heading" fontWeight={600} sx={{ mb: 1 }}>
                                                    {story.title}
                                                </Typography>
                                                <Button
                                                    size="small"
                                                    endIcon={<ArrowRight16Regular />}
                                                    sx={{ color: theme.palette.primary.main, p: 0.6, fontWeight: 700, minWidth: 'auto' }}
                                                >
                                                    Read more
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {/* Latest Blog Posts */}
                <Box sx={{ mb: 8 }}>
                    <Typography variant="h3" color="text.heading" gutterBottom fontWeight={700}>
                        Latest Blog Posts
                    </Typography>
                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        {latestPosts.map((post) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={post.id}>
                                <Card
                                    onClick={() => handleBlogClick(post.encodedId)}
                                    sx={{
                                        borderRadius: 3,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        bgcolor: theme.palette.background.paper,
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: 4,
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={`${AWS_BUCKET_URL}/${post.image}`}
                                        alt={post.title}
                                    />
                                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                            <Chip label={post.name} size="small" sx={{ fontSize: '0.75rem' }} />
                                            <Chip label="5 min read" size="small" variant="outlined" sx={{ fontSize: '0.75rem' }} />
                                        </Box>
                                        <Typography variant="h6" color="text.heading" gutterBottom fontWeight={600}>
                                            {post.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                                            {post.content?.substring(0, 100)}...
                                        </Typography>
                                        <Button
                                            endIcon={<ArrowRight16Regular />}
                                            sx={{ color: theme.palette.primary.main, alignSelf: 'flex-start', p: 0.6 }}
                                        >
                                            Read more
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Category Section */}
                <Box sx={{ mb: 8 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Box>
                            <Typography variant="overline" color="text.secondary" fontWeight={600}>
                                Categories
                            </Typography>
                            <Typography variant="h3" color="text.heading" fontWeight={700}>
                                {categories[0]?.name || 'Marketing'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {categories[0]?.description || 'Latest insights and strategies'}
                            </Typography>
                        </Box>
                    </Box>
                    <Grid container spacing={3}>
                        {categoryPosts.map((post) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }} key={post.id}>
                                <Card
                                    onClick={() => handleBlogClick(post.encodedId)}
                                    sx={{
                                        borderRadius: 3,
                                        height: '100%',
                                        bgcolor: theme.palette.background.paper,
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: 4,
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={`${AWS_BUCKET_URL}/${post.image}`}
                                        alt={post.title}
                                    />
                                    <CardContent>
                                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                            <Chip label={post.name} size="small" />
                                            <Chip label="5 min read" size="small" variant="outlined" />
                                        </Box>
                                        <Typography variant="h6" color="text.heading" gutterBottom fontWeight={600}>
                                            {post.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            {post.content?.substring(0, 100)}...
                                        </Typography>
                                        <Button
                                            endIcon={<ArrowRight16Regular />}
                                            sx={{ color: theme.palette.primary.main, p: 0.6 }}
                                        >
                                            Read more
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Popular Gigs */}
                <Box sx={{ mb: 8 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Box>
                            <Typography variant="h3" color="text.heading" gutterBottom fontWeight={700}>
                                Popular Gigs
                            </Typography>
                        </Box>
                        <Button onClick={() => navigate('/categories')} variant="outlined" sx={{ borderRadius: 2 }}>
                            View all
                        </Button>
                    </Box>

                    <GigsGrid gigs={gigs} loading={gigsLoading} />
                </Box>

                {/* Newsletter Section */}
                <Box
                    sx={{
                        textAlign: 'center',
                        py: 8,
                        px: 3,
                        borderRadius: 4,
                        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.light} 100%)`,
                        border: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Box
                        sx={{
                            width: 60,
                            height: 60,
                            bgcolor: theme.palette.primary.main,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 3,
                        }}
                    >
                        <Mail24Regular style={{ color: '#fff' }} />
                    </Box>
                    <Typography variant="h4" color="text.heading" gutterBottom fontWeight={700}>
                        Subscribe For The Latest Updates
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Subscribe to newsletter and never miss the next post every week
                    </Typography>
                    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
                        <TextField
                            fullWidth
                            placeholder="Enter your email"
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <Button
                                        variant="contained"
                                        sx={{
                                            bgcolor: theme.palette.warning.main,
                                            '&:hover': { bgcolor: theme.palette.warning.dark },
                                            color: theme.palette.warning.contrastText,
                                        }}
                                    >
                                        Subscribe
                                    </Button>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: theme.palette.background.paper,
                                    borderRadius: 3,
                                    '& fieldset': { border: 'none' },
                                },
                            }}
                        />
                    </Box>
                </Box>
                <BMGPromoSection />
            </Container>
        </Box>
    );
};

export default BlogPage;