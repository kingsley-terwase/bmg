import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Chip,
    Avatar,
    Button,
    Card,
    CardMedia,
    CardContent,
    Divider,
    IconButton,
    TextField,
    Grid,
    CircularProgress,
    Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    ArrowLeft24Regular,
    Heart24Regular,
    Heart24Filled,
    Share24Regular,
    Bookmark24Regular,
    Bookmark24Filled,
    Calendar24Regular,
    Clock24Regular,
    Eye24Regular,
    ThumbLike24Regular,
    Comment24Regular,
    Send24Regular,
} from '@fluentui/react-icons';
import { useBlog, useBlogs } from '../../../Hooks/web_blogs';

const AWS_BUCKET_URL = import.meta.env.VITE_AWS_BUCKET_URL;

const BlogDetailPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { id: encodedId } = useParams();

    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [comment, setComment] = useState('');

    // Fetch the blog post
    const { blog, loading: blogLoading, error: blogError } = useBlog(encodedId);

    // Fetch all blogs for related articles
    const { blogs } = useBlogs();

    // Mock comments for now (you can create a separate hook for comments)
    const comments = [
        {
            author: 'John Doe',
            avatar: 'https://i.pravatar.cc/150?img=12',
            time: '2 hours ago',
            text: 'Excellent article! The insights on AI ethics were particularly thought-provoking.',
            likes: 12,
        },
        {
            author: 'Emma Wilson',
            avatar: 'https://i.pravatar.cc/150?img=9',
            time: '5 hours ago',
            text: 'This is exactly what I needed to understand the current state of AI. Thank you!',
            likes: 8,
        },
        {
            author: 'Michael Chen',
            avatar: 'https://i.pravatar.cc/150?img=15',
            time: '1 day ago',
            text: 'Great perspective on how AI is transforming industries. Looking forward to more content like this.',
            likes: 15,
        },
    ];

    // Get related articles from the same category
    const relatedArticles = blogs
        .filter(b => b.category === blog?.category && b.id !== blog?.id)
        .slice(0, 3);

    const handleBackClick = () => {
        navigate('/blog');
    };

    const handleRelatedArticleClick = (relatedEncodedId) => {
        navigate(`/blog/${relatedEncodedId}`);
    };

    if (blogLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', mt: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (blogError || !blog) {
        return (
            <Box sx={{ mt: 8, px: 2 }}>
                <Container maxWidth="md">
                    <Alert severity="error">
                        {blogError || 'Blog not found'}
                    </Alert>
                    <Button
                        startIcon={<ArrowLeft24Regular />}
                        onClick={handleBackClick}
                        sx={{ mt: 2 }}
                    >
                        Back to Blog
                    </Button>
                </Container>
            </Box>
        );
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', mt: 8 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: { xs: '400px', md: '300px' },
                    background: `linear-gradient(to bottom, transparent 0%, ${theme.palette.background.default} 100%)`,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${AWS_BUCKET_URL}/${blog.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(to bottom, transparent 0%, ${theme.palette.background.default} 90%)`,
                        },
                    }}
                />
            </Box>

            <Container maxWidth="md" sx={{ position: 'relative', mt: -20, zIndex: 1 }}>
                {/* Back Button */}
                <Button
                    startIcon={<ArrowLeft24Regular />}
                    onClick={handleBackClick}
                    sx={{
                        mb: 3,
                        color: theme.palette.text.primary,
                        fontWeight: 600,
                        '&:hover': {
                            bgcolor: theme.palette.background.paper,
                        },
                    }}
                >
                    Back to Blog
                </Button>

                {/* Article Header */}
                <Box sx={{ mb: 4 }}>
                    <Chip
                        label={blog.name}
                        sx={{
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            fontWeight: 700,
                            fontSize: '0.875rem',
                            mb: 2,
                        }}
                    />
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            color: theme.palette.text.heading,
                            mb: 2,
                            fontSize: { xs: '2rem', md: '3rem' },
                            lineHeight: 1.2,
                        }}
                    >
                        {blog.title}
                    </Typography>

                    {/* Meta Info */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 3,
                            py: 3,
                            borderTop: `1px solid ${theme.palette.divider}`,
                            borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Calendar24Regular style={{ color: theme.palette.text.secondary }} />
                            <Typography variant="body2" color="text.secondary">
                                {formatDate(blog.created_at)}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Clock24Regular style={{ color: theme.palette.text.secondary }} />
                            <Typography variant="body2" color="text.secondary">
                                5 min read
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Eye24Regular style={{ color: theme.palette.text.secondary }} />
                            <Typography variant="body2" color="text.secondary">
                                {Math.floor(Math.random() * 20000) + 1000} views
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Author Info */}
                <Card
                    sx={{
                        mb: 4,
                        p: 3,
                        bgcolor: theme.palette.background.paper,
                        borderRadius: 3,
                        border: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                            sx={{
                                width: 64,
                                height: 64,
                                border: `3px solid ${theme.palette.primary.main}`,
                                bgcolor: theme.palette.primary.main,
                            }}
                        >
                            {blog.author_first_name?.charAt(0)}{blog.author_last_name?.charAt(0)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.heading }}>
                                {blog.author_name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>
                                Content Writer
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                Passionate about sharing insights and knowledge
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                borderRadius: 2,
                                px: 3,
                                '&:hover': {
                                    bgcolor: theme.palette.primary.dark,
                                },
                            }}
                        >
                            Follow
                        </Button>
                    </Box>
                </Card>

                {/* Article Content */}
                <Box
                    sx={{
                        mb: 6,
                        '& p': {
                            fontSize: '1.125rem',
                            lineHeight: 1.8,
                            color: theme.palette.text.primary,
                            mb: 3,
                        },
                        '& h3': {
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            color: theme.palette.text.heading,
                            mt: 5,
                            mb: 2,
                        },
                        '& h4': {
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            color: theme.palette.text.heading,
                            mt: 4,
                            mb: 2,
                        },
                    }}
                >
                    <Typography variant="body1" paragraph>
                        {blog.content}
                    </Typography>

                    <Box
                        sx={{
                            my: 4,
                            p: 3,
                            bgcolor: theme.palette.primary.lightBg,
                            borderLeft: `4px solid ${theme.palette.primary.main}`,
                            borderRadius: 2,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontStyle: 'italic',
                                color: theme.palette.text.heading,
                                fontWeight: 600,
                            }}
                        >
                            "Stay informed and ahead of the curve with our latest insights."
                        </Typography>
                    </Box>
                </Box>

                {/* Engagement Actions */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 3,
                        bgcolor: theme.palette.background.paper,
                        borderRadius: 3,
                        border: `1px solid ${theme.palette.divider}`,
                        mb: 4,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                            onClick={() => setLiked(!liked)}
                            sx={{
                                color: liked ? theme.palette.error.main : theme.palette.text.secondary,
                                '&:hover': {
                                    bgcolor: `${theme.palette.error.main}10`,
                                },
                            }}
                        >
                            {liked ? <Heart24Filled /> : <Heart24Regular />}
                        </IconButton>
                        <Typography variant="body2" color="text.secondary">
                            {Math.floor(Math.random() * 500) + 100 + (liked ? 1 : 0)}
                        </Typography>

                        <IconButton
                            sx={{
                                color: theme.palette.text.secondary,
                                ml: 2,
                                '&:hover': {
                                    bgcolor: `${theme.palette.primary.main}10`,
                                },
                            }}
                        >
                            <Comment24Regular />
                        </IconButton>
                        <Typography variant="body2" color="text.secondary">
                            {comments.length}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                            onClick={() => setBookmarked(!bookmarked)}
                            sx={{
                                color: bookmarked ? theme.palette.warning.main : theme.palette.text.secondary,
                                '&:hover': {
                                    bgcolor: `${theme.palette.warning.main}10`,
                                },
                            }}
                        >
                            {bookmarked ? <Bookmark24Filled /> : <Bookmark24Regular />}
                        </IconButton>
                        <IconButton
                            sx={{
                                color: theme.palette.text.secondary,
                                '&:hover': {
                                    bgcolor: `${theme.palette.primary.main}10`,
                                },
                            }}
                        >
                            <Share24Regular />
                        </IconButton>
                    </Box>
                </Box>

                <Divider sx={{ my: 6 }} />

                {/* Comments Section */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.heading, mb: 3 }}>
                        Comments ({comments.length})
                    </Typography>

                    {/* Add Comment */}
                    <Box
                        sx={{
                            mb: 4,
                            p: 3,
                            bgcolor: theme.palette.background.paper,
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.divider}`,
                        }}
                    >
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="Share your thoughts..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                },
                            }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                endIcon={<Send24Regular />}
                                sx={{
                                    bgcolor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    borderRadius: 2,
                                    px: 3,
                                    '&:hover': {
                                        bgcolor: theme.palette.primary.dark,
                                    },
                                }}
                            >
                                Post Comment
                            </Button>
                        </Box>
                    </Box>

                    {/* Comments List */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {comments.map((commentItem, index) => (
                            <Box
                                key={index}
                                sx={{
                                    p: 3,
                                    bgcolor: theme.palette.background.paper,
                                    borderRadius: 3,
                                    border: `1px solid ${theme.palette.divider}`,
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                    <Avatar src={commentItem.avatar} sx={{ width: 40, height: 40 }} />
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.heading }}>
                                                {commentItem.author}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {commentItem.time}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                                            {commentItem.text}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    color: theme.palette.text.secondary,
                                                    '&:hover': {
                                                        color: theme.palette.primary.main,
                                                    },
                                                }}
                                            >
                                                <ThumbLike24Regular />
                                            </IconButton>
                                            <Typography variant="caption" color="text.secondary">
                                                {commentItem.likes}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Divider sx={{ my: 6 }} />

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <Box sx={{ mb: 8 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.heading, mb: 3 }}>
                            Related Articles
                        </Typography>
                        <Grid container spacing={2}>
                            {relatedArticles.map((relatedArticle) => (
                                <Grid size={{ xs: 12, md: 4 }} key={relatedArticle.id}>
                                    <Card
                                        onClick={() => handleRelatedArticleClick(relatedArticle.encodedId)}
                                        sx={{
                                            height: '100%',
                                            borderRadius: 3,
                                            border: `1px solid ${theme.palette.divider}`,
                                            transition: 'all 0.3s ease',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: `0 12px 24px ${theme.palette.primary.main}20`,
                                            },
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="180"
                                            image={`${AWS_BUCKET_URL}/${relatedArticle.image}`}
                                            alt={relatedArticle.title}
                                        />
                                        <CardContent>
                                            <Chip
                                                label={relatedArticle.name}
                                                size="small"
                                                sx={{
                                                    mb: 1,
                                                    bgcolor: theme.palette.primary.lightBg,
                                                    color: theme.palette.primary.main,
                                                }}
                                            />
                                            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.heading, mb: 1 }}>
                                                {relatedArticle.title}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                5 min read
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default BlogDetailPage;