import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Card,
    Typography,
    Avatar,
    IconButton,
    Button,
    Container,
} from "@mui/material";

import {
    Play24Regular,
    ChevronLeft24Regular,
    ChevronRight24Regular,
    TextQuote24Regular,
} from "@fluentui/react-icons";

const testimonials = [
    {
        id: 1,
        name: "Hellen Jummy",
        role: "Financial Counselor",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        videoThumbnail:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        testimonial:
            "Lacus vestibulum ultricies mi risus, duis non, volutpat nullam non.",
        rating: 5,
        bg: "linear-gradient(to bottom right, #ffe4ef, #ede9fe)",
    },
    {
        id: 2,
        name: "Ralph Edwards",
        role: "Math Teacher",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        videoThumbnail:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800",
        testimonial:
            "Odio rhoncus ornare ut quam. Molestie vel duis quis scelerisque.",
        rating: 5,
        bg: "linear-gradient(to bottom right, #e0f2fe, #cffafe)",
    },
    {
        id: 3,
        name: "Hellena John",
        role: "Psychology Student",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
        videoThumbnail:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800",
        testimonial:
            "Sagittis nunc egestas leo et malesuada urna risus. Morbi proin et cras.",
        rating: 5,
        bg: "linear-gradient(to bottom right, #ede9fe, #e0e7ff)",
    },
    {
        id: 4,
        name: "Sarah Mitchell",
        role: "Business Owner",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
        videoThumbnail:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
        testimonial:
            "Sapien amet sapiente amet neque nulla nulla pretium. Lorem ipsum dolor.",
        rating: 5,
        bg: "linear-gradient(to bottom right, #fff7ed, #fef3c7)",
    },
];

export default function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    useEffect(() => {
        if (!autoPlay) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [autoPlay]);

    const prev = () => {
        setAutoPlay(false);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const next = () => {
        setAutoPlay(false);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const visible = [
        testimonials[currentIndex],
        testimonials[(currentIndex + 1) % testimonials.length],
        testimonials[(currentIndex + 2) % testimonials.length],
    ];

    return (
        <Box
            sx={{
                py: 10,
                px: 2,
                background: "linear-gradient(to bottom right, #f8fafc, #ffffff)",
            }}
        >
           <Container maxWidth="lg">
             <Box textAlign="center" mb={8}>
                <Typography
                    sx={{
                        display: "inline-block",
                        px: 3,
                        py: 1,
                        borderRadius: 10,
                        fontWeight: 700,
                        backgroundColor: "#dbeafe",
                        color: "#1e40af",
                        mb: 2,
                    }}
                >
                    ⭐ Customer Stories
                </Typography>

                <Typography variant="h3" fontWeight={800} mb={1}>
                    Trusted By 1000+ SMEs
                </Typography>

                <Typography color="text.secondary">
                    What they say about us
                </Typography>
            </Box>

            {/* CAROUSEL */}
            <Box sx={{ position: "relative", mb: 6 }}>
                <Grid container spacing={3}>
                    {visible.map((item, i) => (
                        <Grid size={{ xs:12, md:4 }} key={item.id}>
                            <Card
                                sx={{
                                    borderRadius: 4,
                                    overflow: "hidden",
                                    position: "relative",
                                    boxShadow: 4,
                                    transition: "0.4s",
                                    transform: i === 1 ? "scale(1.05)" : "scale(0.95)",
                                }}
                            >
                                {/* IMAGE */}
                                <Box
                                    sx={{
                                        height: 260,
                                        position: "relative",
                                        overflow: "hidden",
                                    }}
                                >
                                    <img
                                        src={item.videoThumbnail}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            inset: 0,
                                            background: item.bg,
                                            opacity: 0.45,
                                        }}
                                    />

                                    {/* Play button */}
                                    <IconButton
                                        sx={{
                                            position: "absolute",
                                            inset: 0,
                                            m: "auto",
                                            width: 65,
                                            height: 65,
                                            bgcolor: "white",
                                            boxShadow: 4,
                                        }}
                                    >
                                        <Play24Regular style={{ color: "#2563eb" }} />
                                    </IconButton>
                                </Box>

                                {/* CONTENT */}
                                <Box sx={{ p: 2, position: "relative" }}>
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: -20,
                                            right: 25,
                                            bgcolor: "#3b82f6",
                                            px: 1,
                                            py:0.6,
                                            borderRadius: "50%",
                                            boxShadow: 3,
                                        }}
                                    >
                                        <TextQuote24Regular style={{ color: "white" }} />
                                    </Box>

                                    <Typography color="text.secondary" mb={3}>
                                        “{item.testimonial}”
                                    </Typography>

                                    {/* AUTHOR */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 2,
                                            alignItems: "center",
                                            pt: 2,
                                            borderTop: "1px solid #eee",
                                        }}
                                    >
                                        <Avatar
                                            src={item.image}
                                            sx={{ width: 56, height: 56, border: "3px solid #e0f2fe" }}
                                        />
                                        <Box>
                                            <Typography fontWeight={700}>{item.name}</Typography>
                                            <Typography color="text.secondary">{item.role}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <IconButton
                    onClick={prev}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: -10,
                        transform: "translateY(-50%)",
                        bgcolor: "white",
                        boxShadow: 3,
                    }}
                >
                    <ChevronLeft24Regular />
                </IconButton>

                <IconButton
                    onClick={next}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: -10,
                        transform: "translateY(-50%)",
                        bgcolor: "white",
                        boxShadow: 3,
                    }}
                >
                    <ChevronRight24Regular />
                </IconButton>
            </Box>

            <Box display="flex" justifyContent="center" gap={1} mt={4}>
                {testimonials.map((_, i) => (
                    <Box
                        key={i}
                        onClick={() => {
                            setAutoPlay(false);
                            setCurrentIndex(i);
                        }}
                        sx={{
                            width: i === currentIndex ? 30 : 10,
                            height: 10,
                            borderRadius: 5,
                            bgcolor: i === currentIndex ? "#2563eb" : "#cbd5e1",
                            cursor: "pointer",
                            transition: "0.3s",
                        }}
                    />
                ))}
            </Box>

            <Grid container spacing={3} mt={8}>
                {[
                    { label: "Happy Clients", value: "1000+" },
                    { label: "Projects Done", value: "2500+" },
                    { label: "Success Rate", value: "98%" },
                    { label: "Countries", value: "45+" },
                ].map((item, i) => (
                    <Grid size={{ xs:6, md:3 }} key={i} textAlign="center">
                        <Typography variant="h4" fontWeight={800}>
                            {item.value}
                        </Typography>
                        <Typography color="text.secondary">{item.label}</Typography>
                    </Grid>
                ))}
            </Grid>
           </Container>
        </Box>
    );
}
