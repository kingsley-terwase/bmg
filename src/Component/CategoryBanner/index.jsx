import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import {
    ArrowRight20Regular,
    Sparkle24Regular
} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";

const CategoryBanner = ({ title, subtitle }) => {
    const navigate = useNavigate()
    return (
        <Container maxWidth="lg" sx={{ mb: 8 }}>
            <Box
                sx={{
                    width: "100%",
                    background: "linear-gradient(to right, #1e1b4b, #312e81, #1e1b4b)",
                    borderRadius: "24px",
                    py: { xs: 6, md: 7 },
                    px: { xs: 4, md: 8 },
                    boxShadow: 6,
                    position: "relative",
                    overflow: "hidden",
                }}
            >

                {/* Decorative Blobs */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 250,
                        height: 250,
                        backgroundColor: "#9333ea",
                        borderRadius: "50%",
                        filter: "blur(60px)",
                        opacity: 0.2,
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: 320,
                        height: 320,
                        backgroundColor: "#2563eb",
                        borderRadius: "50%",
                        filter: "blur(60px)",
                        opacity: 0.2,
                    }}
                />

                {/* Content */}
                <Box textAlign="center" position="relative" zIndex={10}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            color: "white",
                            mb: 2,
                            letterSpacing: "-0.5px",
                            fontSize: { xs: "2rem", md: "2.5rem" },
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "1.2rem",
                            color: "#c7d2fe",
                            mb: 4,
                            fontWeight: 500,
                        }}
                    >
                        {subtitle}
                    </Typography>

                    {/* Button */}
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "white",
                            color: "#1e1b4b",
                            px: 5,
                            py: 1.5,
                            fontWeight: 700,
                            borderRadius: "12px",
                            textTransform: "none",
                            boxShadow: 3,
                            "&:hover": {
                                backgroundColor: "#f4f4f5",
                                boxShadow: 5,
                                transform: "scale(1.05)",
                            },
                            transition: "all .3s ease",
                        }}
                        onClick={() => navigate('/how-it-works')}
                    >
                        How it works
                        <ArrowRight20Regular style={{ marginLeft: "8px" }} />
                    </Button>
                </Box>

                <Box sx={{ position: "absolute", top: 32, left: 48, opacity: 0.3 }}>
                    <Sparkle24Regular className="animate-pulse" style={{ color: "white" }} />
                </Box>

                <Box
                    sx={{
                        position: "absolute",
                        bottom: 48,
                        right: 64,
                        opacity: 0.3,
                        animation: "pulse 2s ease-in-out infinite",
                        animationDelay: "0.5s",
                    }}
                >
                    <Sparkle24Regular style={{ color: "white" }} />
                </Box>
            </Box>
        </Container>
    );
};

export default CategoryBanner;
