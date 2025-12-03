import React from "react";
import {
    Box,
    Grid,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";
import { ArrowRight24Filled } from "@fluentui/react-icons";

const trendingServices = [
    {
        id: 1,
        title: "AI",
        image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
        gradient: "linear-gradient(to top, rgba(147,51,234,0.2), rgba(37,99,235,0.2))",
    },
    {
        id: 2,
        title: "Business Development",
        image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        gradient: "linear-gradient(to top, rgba(100,116,139,0.2), rgba(31,41,55,0.2))",
    },
    {
        id: 3,
        title: "Web Design",
        image:
            "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=600&fit=crop",
        gradient: "linear-gradient(to top, rgba(59,130,246,0.2), rgba(6,182,212,0.2))",
    },
    {
        id: 4,
        title: "Vibe Coding",
        image:
            "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&h=600&fit=crop",
        gradient: "linear-gradient(to top, rgba(79,70,229,0.2), rgba(147,51,234,0.2))",
    },
];

export default function TrendingService() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(to bottom right, #f9fafb, #ffffff, #f3f4f6)",
                py: 6,
                px: 2,
            }}
        >
            <Box maxWidth="lg" mx="auto">
                {/* Top Header Section */}
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={6}>
                    <Box>
                        <Typography variant="h2" fontWeight="bold" color="text.primary" mb={2}>
                            TRENDING
                        </Typography>

                        <Box
                            mb={2}
                            sx={{
                                display: "inline-block",
                                px: 2,
                                py: 1,
                                borderRadius: "50px",
                                backgroundColor: "orange.50",
                                border: "1px solid #fed7aa",
                            }}
                        >
                            <Typography variant="caption" fontWeight="bold" color="orange">
                                Weekly Spotlight
                            </Typography>
                        </Box>

                        <Typography variant="body1" color="text.secondary" maxWidth="600px">
                            Bite-sized digital marketing services to help you grow your business.
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        endIcon={<ArrowRight24Filled />}
                        sx={{
                            background: "linear-gradient(to right, #f97316, #ea580c)",
                            px: 4,
                            py: 1.5,
                            borderRadius: "12px",
                            fontWeight: "bold",
                            textTransform: "none",
                            boxShadow: 3,
                            "&:hover": {
                                background: "linear-gradient(to right, #ea580c, #c2410c)",
                                transform: "translateY(-3px)",
                                boxShadow: 6,
                            },
                            transition: "0.3s",
                            whiteSpace: "nowrap",
                        }}
                    >
                        View More
                    </Button>
                </Box>

                <Grid container spacing={3}>
                    {trendingServices.map((service) => (
                        <Grid size={{xs:12, sm:6, md:4, lg:3 }} key={service.id}>
                            <Card
                                sx={{
                                    borderRadius: "20px",
                                    overflow: "hidden",
                                    position: "relative",
                                    cursor: "pointer",
                                    "&:hover .zoomImage": { transform: "scale(1.12)" },
                                    "&:hover .shine": { transform: "translateX(100%)" },
                                    "&:hover .borderEffect": { borderColor: "rgba(251,146,60,0.5)" },
                                    transition: "0.5s",
                                }}
                            >
                                {/* Image */}
                                <CardMedia
                                    component="img"
                                    height="280"
                                    image={service.image}
                                    alt={service.title}
                                    className="zoomImage"
                                    sx={{
                                        transition: "0.7s",
                                    }}
                                />

                                {/* Gradient Overlay */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                        background: service.gradient,
                                    }}
                                />

                                {/* Dark Overlay */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                        background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3), transparent)",
                                    }}
                                />

                                {/* Hover Border */}
                                <Box
                                    className="borderEffect"
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                        border: "4px solid transparent",
                                        borderRadius: "20px",
                                        transition: "0.5s",
                                    }}
                                />

                                {/* Title */}
                                <CardContent
                                    sx={{
                                        position: "absolute",
                                        bottom: 0,
                                        width: "100%",
                                        px: 3,
                                        pb: 3,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: "rgba(255,255,255,0.9)",
                                            backdropFilter: "blur(6px)",
                                            py: 1.5,
                                            borderRadius: "12px",
                                            textAlign: "center",
                                            fontWeight: "bold",
                                            transition: "0.3s",
                                            "&:hover": {
                                                transform: "scale(1.05)",
                                                backgroundColor: "#fff",
                                            },
                                        }}
                                    >
                                        <Typography fontWeight="bold" color="text.primary">
                                            {service.title}
                                        </Typography>
                                    </Box>
                                </CardContent>

                                {/* Shine Effect */}
                                <Box
                                    className="shine"
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                        transform: "translateX(-100%)",
                                        background:
                                            "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)",
                                        transition: "1s",
                                    }}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Bottom Call to Action */}
                <Box textAlign="center" mt={6}>
                    <Typography color="text.secondary" mb={2}>
                        Explore more trending services and boost your business today
                    </Typography>

                    <Box display="flex" justifyContent="center" gap={1}>
                        {[...Array(4)].map((_, i) => (
                            <Box
                                key={i}
                                sx={{
                                    height: 8,
                                    width: i === 0 ? 32 : 12,
                                    borderRadius: 5,
                                    backgroundColor: i === 0 ? "orange" : "grey.400",
                                    cursor: "pointer",
                                    "&:hover": { backgroundColor: "orange" },
                                    transition: "0.3s",
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
