import React from "react";
import {
    ArrowRight24Regular,
    ArrowTrending24Regular,
    CalendarLtr24Regular,
    Clock24Regular,
} from "@fluentui/react-icons";

import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    Avatar,
    Stack,
} from "@mui/material";

const blogPosts = [
    {
        id: 1,
        title: "Brochure Design",
        description: "Nunc gravida semper tellus neque scelerisque eget tincidunt in.",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop",
        category: "Design",
        readTime: "5 min read",
        date: "Nov 28, 2024",
        gradient: "linear-gradient(to right, #2563eb, #7c3aed)",
        trending: true,
    },
    {
        id: 2,
        title: "3D Design",
        description: "Phasellus venenatis massa bibendum posuere dictum tristique.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
        category: "Creative",
        readTime: "7 min read",
        date: "Nov 25, 2024",
        gradient: "linear-gradient(to right, #7c3aed, #ec4899)",
        trending: false,
    },
    {
        id: 3,
        title: "Modelling",
        description: "Leo mollis fermentum praesent in condimentum id velit purus in.",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&h=600&fit=crop",
        category: "3D Art",
        readTime: "6 min read",
        date: "Nov 22, 2024",
        gradient: "linear-gradient(to right, #f97316, #dc2626)",
        trending: true,
    },
    {
        id: 4,
        title: "Digital Marketing",
        description: "In sed bibendum metus pretium cursus tellus pharetra.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
        category: "Marketing",
        readTime: "8 min read",
        date: "Nov 20, 2024",
        gradient: "linear-gradient(to right, #06b6d4, #2563eb)",
        trending: false,
    },
];

export default function BlogSection() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(to bottom right, #f8fafc, #dbeafe, #e0e7ff)",
                py: 10,
                px: 3,
            }}
        >
            <Box maxWidth="lg" mx="auto">
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box flex={1}>
                        <Typography variant="h3" fontWeight="bold" mb={1}>
                            Blog
                        </Typography>
                        <Typography variant="body1" color="text.secondary" maxWidth="600px">
                            Bite-sized digital marketing services to sell more, acquire customers and grow your business.
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        endIcon={<ArrowRight24Regular />}
                        sx={{
                            backgroundColor: "white",
                            color: "text.primary",
                            borderRadius: "12px",
                            textTransform: "none",
                            px: 3,
                            py: 1.5,
                            boxShadow: 3,
                            border: "1px solid #e5e7eb",
                            "&:hover": {
                                backgroundColor: "#f3f4f6",
                                boxShadow: 6,
                                transform: "translateY(-3px)",
                            },
                            transition: "0.3s",
                        }}
                    >
                        More Articles
                    </Button>
                </Box>

                <Grid container spacing={4} mt={5}>
                    {blogPosts.map((post) => (
                        <Grid size={{ xs: 12, md: 6, lg: 3 }} key={post.id}>
                            <Card
                                sx={{
                                    borderRadius: 4,
                                    overflow: "hidden",
                                    boxShadow: 4,
                                    cursor: "pointer",
                                    position: "relative",
                                    transition: "0.4s",
                                    "&:hover": {
                                        boxShadow: 10,
                                        transform: "translateY(-6px)",
                                    },
                                }}
                            >
                                <CardActionArea>
                                    {/* Image */}
                                    <Box sx={{ position: "relative", height: 200, overflow: "hidden" }}>
                                        <CardMedia
                                            component="img"
                                            src={post.image}
                                            alt={post.title}
                                            sx={{
                                                height: "100%",
                                                width: "100%",
                                                transition: "0.6s",
                                                "&:hover": { transform: "scale(1.1)" },
                                            }}
                                        />

                                        {/* Overlay */}
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                inset: 0,
                                                background: post.gradient,
                                                opacity: 0,
                                                transition: "0.4s",
                                                "&:hover": {
                                                    opacity: 0.28,
                                                },
                                            }}
                                        />

                                        {/* Category */}
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: 12,
                                                left: 12,
                                                bgcolor: "white",
                                                px: 1.6,
                                                py: 0.6,
                                                borderRadius: "20px",
                                                fontSize: "0.7rem",
                                                fontWeight: "bold",
                                                boxShadow: 3,
                                            }}
                                        >
                                            {post.category}
                                        </Box>

                                        {/* Trending */}
                                        {post.trending && (
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    top: 12,
                                                    right: 12,
                                                    bgcolor: "#f97316",
                                                    p: 1,
                                                    borderRadius: "50%",
                                                    boxShadow: 4,
                                                    animation: "pulse 1.5s infinite",
                                                    "@keyframes pulse": {
                                                        "0%": { transform: "scale(1)" },
                                                        "50%": { transform: "scale(1.15)" },
                                                        "100%": { transform: "scale(1)" },
                                                    },
                                                }}
                                            >
                                                <ArrowTrending24Regular style={{ color: "white", fontSize: 18 }} />
                                            </Box>
                                        )}
                                    </Box>

                                    {/* Content */}
                                    <CardContent>
                                        {/* Meta */}
                                        <Stack direction="row" spacing={2} mb={1}>
                                            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ fontSize: 12, color: "gray" }}>
                                                <CalendarLtr24Regular style={{ fontSize: 14 }} />
                                                <span>{post.date}</span>
                                            </Stack>

                                            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ fontSize: 12, color: "gray" }}>
                                                <Clock24Regular style={{ fontSize: 14 }} />
                                                <span>{post.readTime}</span>
                                            </Stack>
                                        </Stack>

                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            sx={{
                                                mb: 1,
                                                transition: "color 0.3s",
                                                "&:hover": { color: "#2563eb" },
                                            }}
                                        >
                                            {post.title}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            {post.description}
                                        </Typography>

                                        <Button
                                            size="small"
                                            sx={{
                                                color: "#2563eb",
                                                fontWeight: "bold",
                                                textTransform: "none",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                                "&:hover": { gap: 2 },
                                                transition: "0.3s",
                                            }}
                                        >
                                            Read article <ArrowRight24Regular />
                                        </Button>
                                    </CardContent>
                                </CardActionArea>

                                {/* Hover bottom line */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        height: 3,
                                        width: 0,
                                        background: post.gradient,
                                        transition: "0.4s",
                                        ".MuiCard-root:hover &": { width: "100%" },
                                    }}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* CTA */}
                <Box mt={10} textAlign="center">
                    <Box
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 3,
                            bgcolor: "white",
                            px: 5,
                            py: 3,
                            borderRadius: 4,
                            boxShadow: 5,
                        }}
                    >
                        <Stack direction="row" spacing={-1.5}>
                            {[1, 2, 3].map((i) => (
                                <Avatar
                                    key={i}
                                    sx={{
                                        width: 38,
                                        height: 38,
                                        background: "linear-gradient(to bottom right, #3b82f6, #8b5cf6)",
                                        border: "2px solid white",
                                    }}
                                />
                            ))}
                        </Stack>

                        <Box textAlign="left">
                            <Typography fontWeight="bold" fontSize={14}>
                                Join 10,000+ readers
                            </Typography>
                            <Typography fontSize={12} color="text.secondary">
                                Get weekly insights delivered
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            sx={{
                                background: "linear-gradient(to right, #2563eb, #7c3aed)",
                                textTransform: "none",
                                px: 4,
                                py: 1,
                                borderRadius: 2,
                                fontWeight: "bold",
                                "&:hover": {
                                    background: "linear-gradient(to right, #1d4ed8, #6d28d9)",
                                },
                            }}
                        >
                            Subscribe
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
