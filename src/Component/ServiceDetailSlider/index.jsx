import React, { useState } from "react";
import { Box, Card, Typography, Button, CircularProgress, Alert } from "@mui/material";
import { motion } from "framer-motion";
import {
    CheckmarkCircle24Regular,
    ChevronLeft20Filled,
    ChevronRight20Filled
} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { calculateServicePrice } from "../../Hooks/services";
import { formatGHS } from "../../utils/currency";
import { resolveAwsImage } from "../../utils/functions";

export default function ServiceDetailSlider({ service, loading, error, hashedId }) {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);

    const serviceTypes = service?.service_types || []

    const nextSlide = () => setIndex((prev) => (prev + 1) % serviceTypes.length);
    const prevSlide = () =>
        setIndex((prev) => (prev - 1 + serviceTypes.length) % serviceTypes.length);

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

    // Get features from service attributes
    const features = service.service_attributes
        ? Object.values(service.service_attributes).filter(Boolean)
        : ["Elite Graphic Designer", "Full copyright ownership", "Professional quality", "Fast delivery", "24/7 Support"];

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
            {service?.service_types?.map((service_type, i) => {
                const { hasDiscount, finalPrice, discountLabel } = calculateServicePrice(service, i)
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
                            {service_type?.service_type_name}
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
                                src={resolveAwsImage(service_type?.service_type_image)}
                                alt={service_type?.service_type_name}
                                onError={(e) => {
                                    e.currentTarget.src = "/placeholder-service.jpg";
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
                                    <DiscountTag top="8px" left="8px" discount={discountLabel} />
                                    <DiscountTag bottom="8px" right="8px" discount={discountLabel} />
                                </>
                            )}
                        </Box>

                        {service_type?.description && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 2, px: 1, fontSize: "0.85rem" }}
                                dangerouslySetInnerHTML={{
                                    __html: service_type?.description
                                }}
                            />
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
                                    {formatGHS(service_type?.price)}
                                </Typography>
                            )}

                            <Typography sx={{ fontWeight: 700, color: hasDiscount ? "#F59E0B" : "#00C851" }}>
                                {formatGHS(finalPrice)}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => navigate(`/process-order/${hashedId}/${service?.service_name
                                    }`)}
                                sx={{
                                    bgcolor: "#FBBF24",
                                    color: "#000",
                                    fontWeight: 700,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    "&:hover": { bgcolor: "#f5a217" },
                                }}
                            >
                                {hasDiscount ? `Buy Now - ${discountLabel}%` : "Buy Now"}
                            </Button>

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => navigate(`/process-order/${hashedId}/${service?.service_name
                                    }`)}
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
            {service?.service_types.length > 1 && (
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
            - {discount}
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