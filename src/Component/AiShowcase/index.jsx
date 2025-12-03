import React, { useState } from "react";
import {
    Video24Regular,
    Image24Regular,
    VideoClip24Regular,
    ChartMultiple24Regular,
    MicSparkle24Regular,
    Globe24Regular,
    Play24Filled,
} from "@fluentui/react-icons";

import {
    Box,
    Typography,
    Button,
    Stack,
    Paper,
    IconButton,
    Grid,
    Container,
} from "@mui/material";

const AIServicesShowcase = () => {
    const [activeService, setActiveService] = useState(0);

    const services = [
        { id: 0, name: "AI Video Generator", icon: <Video24Regular />, image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=600&fit=crop", gradient: "linear-gradient(to bottom right, #a855f7, #4f46e5)" },
        { id: 1, name: "AI Image Generator", icon: <Image24Regular />, image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop", gradient: "linear-gradient(to bottom right, #22d3ee, #2563eb)" },
        { id: 2, name: "AI Video Editor", icon: <VideoClip24Regular />, image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop", gradient: "linear-gradient(to bottom right, #fb923c, #dc2626)" },
        { id: 3, name: "AI Biz Strategy", icon: <ChartMultiple24Regular />, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop", gradient: "linear-gradient(to bottom right, #10b981, #0d9488)" },
        { id: 4, name: "AI Voice Generator", icon: <MicSparkle24Regular />, image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=800&h=600&fit=crop", gradient: "linear-gradient(to bottom right, #ec4899, #be123c)" },
        { id: 5, name: "AI Web Generator", icon: <Globe24Regular />, image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop", gradient: "linear-gradient(to bottom right, #8b5cf6, #6d28d9)" },
    ];

    const getCardStyle = (index) => {
        if (index === activeService) {
            return {
                zIndex: 50,
                transform: "scale(1)",
                opacity: 1,
                left: "50%",
                top: "50%",
                transformOrigin: "center",
                translate: "-50% -50%",
            };
        }

        const positions = [
            { x: "-120px", y: "-80px", scale: 0.7, rotate: -8, zIndex: 30 },
            { x: "100px", y: "-100px", scale: 0.65, rotate: 5, zIndex: 25 },
            { x: "-150px", y: "80px", scale: 0.6, rotate: -5, zIndex: 20 },
            { x: "120px", y: "100px", scale: 0.55, rotate: 8, zIndex: 15 },
            { x: "-80px", y: "120px", scale: 0.5, rotate: -3, zIndex: 10 },
        ];

        const relativeIndex = (index - activeService + services.length) % services.length;
        const posIndex = Math.min(relativeIndex - 1, positions.length - 1);

        if (relativeIndex === 0) return { display: "none" };

        const pos = positions[posIndex];

        return {
            transform: `translate(${pos.x}, ${pos.y}) scale(${pos.scale}) rotate(${pos.rotate}deg)`,
            zIndex: pos.zIndex,
            opacity: 0.85,
        };
    };

    return (
        <Box sx={{ bgcolor: "#f9fafb", py: 8 }}>
            <Container maxWidth="lg">
                <Box sx={{ maxWidth: "1400px", mx: "auto", px: 3 }}>
                    <Grid container alignItems="center" justifyContent="space-between" mb={6}>
                        <Grid size={{ xs: 12, md: 8, }} xs={12} md={8}>
                            <Typography variant="h3" fontWeight="700" mb={1}>
                                Unlock Infinite Possibilities with AI Precision
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Have the world at your finger tips with BMG AI Service
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }} mt={{ xs: 3, md: 0 }}>
                            <Button
                                variant="outlined"
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    borderColor: "#1e1b4b",
                                    color: "#1e1b4b",
                                    fontWeight: 600,
                                    borderWidth: 2,
                                    borderRadius: 3,
                                    "&:hover": {
                                        backgroundColor: "#1e1b4b",
                                        color: "white",
                                    },
                                }}
                            >
                                Get Started Now
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container spacing={6}>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Stack spacing={2}>
                                {services.map((service, index) => (
                                    <Button
                                        key={service.id}
                                        fullWidth
                                        startIcon={service.icon}
                                        onClick={() => setActiveService(index)}
                                        sx={{
                                            textTransform: "none",
                                            px: 3,
                                            py: 2,
                                            borderRadius: 3,
                                            fontWeight: 600,
                                            boxShadow: 2,
                                            bgcolor: activeService === index ? "#1e1b4b" : "white",
                                            color: activeService === index ? "white" : "#1e1b4b",
                                            "&:hover": { boxShadow: 4 },
                                        }}
                                    >
                                        {service.name}
                                    </Button>
                                ))}
                            </Stack>
                        </Grid>

                        <Grid size={{ xs: 12, md: 9 }}>
                            <Box
                                sx={{
                                    position: "relative",
                                    height: { xs: "450px", md: "600px" },
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {services.map((service, index) => {
                                    const style = getCardStyle(index);
                                    if (style.display === "none") return null;

                                    return (
                                        <Paper
                                            key={service.id}
                                            onClick={() => setActiveService(index)}
                                            sx={{
                                                position: "absolute",
                                                cursor: "pointer",
                                                transition: "0.7s ease",
                                                width: { xs: "85%", md: index === activeService ? "600px" : "520px" },
                                                height: { xs: "65%", md: index === activeService ? "400px" : "320px" },
                                                overflow: "hidden",
                                                borderRadius: 4,
                                                ...style,
                                            }}
                                        >
                                            {/* Top Bar */}
                                            <Box sx={{ p: 2, display: "flex", gap: 1 }}>
                                                <Box sx={{ width: 14, height: 14, bgcolor: "#ef4444", borderRadius: "50%" }} />
                                                <Box sx={{ width: 14, height: 14, bgcolor: "#facc15", borderRadius: "50%" }} />
                                                <Box sx={{ width: 14, height: 14, bgcolor: "#4ade80", borderRadius: "50%" }} />
                                            </Box>

                                            {/* IMAGE */}
                                            <Box sx={{ position: "relative", width: "100%", height: "100%", mt: -3 }}>
                                                <img
                                                    src={service.image}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                />

                                                <Box
                                                    sx={{
                                                        position: "absolute",
                                                        inset: 0,
                                                        background: service.gradient,
                                                        opacity: 0.25,
                                                        mixBlendMode: "overlay",
                                                    }}
                                                />

                                                {/* ACTIVE INFORMATION */}
                                                {index === activeService && (
                                                    <Box
                                                        sx={{
                                                            position: "absolute",
                                                            bottom: 0,
                                                            left: 0,
                                                            right: 0,
                                                            p: 3,
                                                            background: "linear-gradient(to top, rgba(0,0,0,.8), transparent)",
                                                        }}
                                                    >
                                                        <Stack direction="row" spacing={2} alignItems="center">
                                                            <Box
                                                                sx={{
                                                                    width: 60,
                                                                    height: 60,
                                                                    bgcolor: "rgba(255,255,255,0.25)",
                                                                    backdropFilter: "blur(6px)",
                                                                    borderRadius: 3,
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                }}
                                                            >
                                                                {service.icon}
                                                            </Box>

                                                            <Box>
                                                                <Typography variant="h6" color="white">
                                                                    {service.name}
                                                                </Typography>
                                                                <Typography variant="body2" color="white">
                                                                    Transform your ideas into reality
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                    </Box>
                                                )}

                                                {/* PLAY BUTTON */}
                                                {(index === 0 || index === 2) && index === activeService && (
                                                    <IconButton
                                                        sx={{
                                                            position: "absolute",
                                                            top: "50%",
                                                            left: "50%",
                                                            transform: "translate(-50%, -50%)",
                                                            width: 80,
                                                            height: 80,
                                                            bgcolor: "white",
                                                            borderRadius: "50%",
                                                            boxShadow: 6,
                                                        }}
                                                    >
                                                        <Play24Filled />
                                                    </IconButton>
                                                )}
                                            </Box>
                                        </Paper>
                                    );
                                })}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default AIServicesShowcase;
