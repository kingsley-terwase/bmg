import React, { useState } from "react";
import { Box, Card, Typography, Button, CircularProgress, Alert } from "@mui/material";
import { motion } from "framer-motion";
import {
    CheckmarkCircle24Regular,
    ChevronLeft20Filled,
    ChevronRight20Filled
} from "@fluentui/react-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useService } from "../../Hooks/web_services";
import { formatGHS } from "../../utils/currency";

// Decode the hashed service ID
const decodeServiceId = (hash) => {
    try {
        if (!hash) return null;
        
        // URL decode first (handles URL-encoded base64)
        let decodedHash = decodeURIComponent(hash);
        
        // Replace URL-safe base64 characters if used
        decodedHash = decodedHash.replace(/-/g, '+').replace(/_/g, '/');
        
        // Decode base64
        const decoded = atob(decodedHash);
        
        // Extract service ID from format: service_{id}_{timestamp}
        const match = decoded.match(/service_(\d+)_/);
        return match ? match[1] : null;
    } catch (err) {
        console.error("Failed to decode service ID:", err);
        console.error("Hash received:", hash);
        return null;
    }
};

// Resolve AWS image URLs
const resolveAwsImage = (image) => {
    if (!image) return null;
    if (image.startsWith('http')) return image;
    return `${import.meta.env.VITE_AWS_BUCKET_URL}/${image}`;
};

export default function ServiceDetailSlider() {
    const { id: hashedId } = useParams();
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);

    // Decode the hashed ID once
    const serviceId = decodeServiceId(hashedId);
    
    // Use the existing hook with decoded ID
    const { service, loading, error } = useService(serviceId);

    const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
    const prevSlide = () =>
        setIndex((prev) => (prev - 1 + slides.length) % slides.length);

    // Loading state
    if (loading) {
        return (
            <Box
                sx={{
                    width: "100%",
                    minHeight: "60vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <CircularProgress size={50} />
                <Typography variant="body1" color="text.secondary">
                    Loading service details...
                </Typography>
            </Box>
        );
    }

    // Error state
    if (error || !service) {
        return (
            <Box sx={{ maxWidth: 600, mx: "auto", mt: 8, px: 2 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error || "Service not found"}
                </Alert>
                <Button 
                    variant="contained" 
                    onClick={() => navigate("/")}
                    sx={{ textTransform: "none" }}
                >
                    Back to Services
                </Button>
            </Box>
        );
    }

    // Calculate pricing
    const hasDiscount = service.discount_value && Number(service.discount_value) > 0;
    let finalPrice = service.service_price;
    let originalPrice = service.service_price;
    let discountPercentage = 0;

    if (hasDiscount) {
        if (service.discount_type === "fixed") {
            finalPrice -= Number(service.discount_value);
            discountPercentage = Math.round((Number(service.discount_value) / originalPrice) * 100);
        } else {
            const discount = (originalPrice * Number(service.discount_value)) / 100;
            finalPrice -= discount;
            discountPercentage = Number(service.discount_value);
        }
    }

    // Get features from service attributes
    const features = service.service_attributes
        ? Object.values(service.service_attributes).filter(Boolean)
        : ["Elite Graphic Designer", "Full copyright ownership", "Professional quality", "Fast delivery", "24/7 Support"];

    // Prepare slides - for now using single image, but structure supports multiple
    const slides = [
        {
            title: service.service_name,
            description: service.service_description,
            price: originalPrice,
            finalPrice: finalPrice,
            discount: discountPercentage,
            img: resolveAwsImage(service.service_image) || "/placeholder-service.png",
        }
    ];

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                maxWidth: 1100,
                mx: "auto",
                height: 650,
                overflow: "hidden",
                mt: 8,
                mb: 8,
            }}
        >
            {slides.map((slide, i) => {
                const isCenter = i === index;

                return (
                    <Card
                        key={i}
                        component={motion.div}
                        initial={false}
                        animate={{
                            scale: isCenter ? 1 : 0.75,
                            opacity: isCenter ? 1 : 0.35,
                            x: (i - index) * 380,
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        sx={{
                            position: "absolute",
                            top: 20,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 460,
                            height: 'auto',
                            borderRadius: 4,
                            boxShadow: isCenter
                                ? "0 8px 30px rgba(0,0,0,0.2)"
                                : "0 4px 15px rgba(0,0,0,0.1)",
                            p: 2.5,
                            background: "#fff",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, mb: 2, textAlign: "center" }}
                        >
                            {slide.title}
                        </Typography>

                        <Box
                            sx={{
                                position: "relative",
                                borderRadius: 3,
                                overflow: "hidden",
                                width: "100%",
                                height: 200,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mb: 2,
                                bgcolor: "#f5f5f5",
                            }}
                        >
                            <img
                                src={slide.img}
                                alt={slide.title}
                                onError={(e) => {
                                    e.currentTarget.src = "/placeholder-service.png";
                                }}
                                style={{ 
                                    width: "100%", 
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: 12 
                                }}
                            />

                            {hasDiscount && (
                                <>
                                    <DiscountTag top="8px" left="8px" discount={slide.discount} />
                                    <DiscountTag bottom="8px" right="8px" discount={slide.discount} />
                                </>
                            )}
                        </Box>

                        {slide.description && (
                            <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ mb: 2, px: 1, fontSize: "0.85rem" }}
                            >
                                {slide.description}
                            </Typography>
                        )}

                        <Box sx={{ px: 1, mb: 2 }}>
                            {features.slice(0, 5).map((feat, idx) => (
                                <Box
                                    key={idx}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        mb: 0.5,
                                    }}
                                >
                                    <CheckmarkCircle24Regular color="#00C851" />
                                    <Typography sx={{ fontSize: "0.9rem" }}>{feat}</Typography>
                                </Box>
                            ))}
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            {hasDiscount && (
                                <Typography
                                    sx={{
                                        textDecoration: "line-through",
                                        color: "#444",
                                        fontWeight: 600,
                                    }}
                                >
                                    {formatGHS(slide.price)}
                                </Typography>
                            )}

                            <Typography sx={{ fontWeight: 700, color: hasDiscount ? "#F59E0B" : "#00C851" }}>
                                {formatGHS(slide.finalPrice)}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => navigate("/track-order")}
                                sx={{
                                    bgcolor: "#FBBF24",
                                    color: "#000",
                                    fontWeight: 700,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    "&:hover": { bgcolor: "#f5a217" },
                                }}
                            >
                                {hasDiscount ? `Buy Now - ${slide.discount}%` : "Buy Now"}
                            </Button>

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => navigate("/track-order")}
                                sx={{
                                    bgcolor: "#000",
                                    color: "#fff",
                                    fontWeight: 700,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    "&:hover": { opacity: 0.85 },
                                }}
                            >
                                Custom Order
                            </Button>
                        </Box>
                    </Card>
                );
            })}

            {/* Show navigation only when there are multiple slides */}
            {slides.length > 1 && (
                <>
                    <NavButton direction="left" onClick={prevSlide} />
                    <NavButton direction="right" onClick={nextSlide} />
                </>
            )}
        </Box>
    );
}

function DiscountTag({ discount, ...pos }) {
    return (
        <Box
            sx={{
                position: "absolute",
                bgcolor: "#22C55E",
                color: "#fff",
                fontSize: "0.7rem",
                px: 1,
                py: 0.3,
                borderRadius: 1,
                fontWeight: 700,
                ...pos,
            }}
        >
            - {discount}%
        </Box>
    );
}

function NavButton({ direction, onClick }) {
    return (
        <Button
            onClick={onClick}
            sx={{
                position: "absolute",
                top: "50%",
                [direction === "left" ? "left" : "right"]: 10,
                transform: "translateY(-50%)",
                minWidth: 40,
                height: 40,
                p: 1,
                borderRadius: "50%",
                bgcolor: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                "&:hover": { bgcolor: "#eee" },
            }}
        >
            {direction === "left" ? <ChevronLeft20Filled /> : <ChevronRight20Filled />}
        </Button>
    );
}