// ServicesGrid.jsx
import React, { useState } from "react";
import {
    CheckmarkCircle24Filled,
} from "@fluentui/react-icons";

import {
    Box,
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Chip,
    Stack,
    Typography,
    Button,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Pagination,
    useTheme,
    CircularProgress,
    Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useServices } from "../../Hooks/web_services";
import { formatGHS } from "../../utils/currency";

const ITEMS_PER_PAGE = 8;

export default function ServicesGrid() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [page, setPage] = useState(1);

    // 🔹 Fetch services from API
    const { services, loading, error } = useServices();

    // 🔹 Helper function to resolve AWS images
    const resolveAwsImage = (image) => {
        if (!image) return null;
        if (image.startsWith('http')) return image;
        return `${import.meta.env.VITE_AWS_BUCKET_URL}/${image}`;
    };

    // 🔹 Hash function to encode service ID (add this to ServicesGrid.jsx)
    const encodeServiceId = (id) => {
        try {
            // Create the hash string
            const hashString = `service_${id}_${Date.now() % 10000}`;

            // Base64 encode
            let encoded = btoa(hashString);

            // Make URL-safe by replacing characters
            encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

            return encoded;
        } catch (err) {
            console.error("Failed to encode service ID:", err);
            return id; // Fallback to plain ID
        }
    };

    // 🔹 Pagination
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedItems = services.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE);

    // 🔹 Loading state
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
                    Loading services...
                </Typography>
            </Box>
        );
    }

    // 🔹 Error state
    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    // 🔹 Empty state
    if (!services || services.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                    No Services Available
                </Typography>
                <Typography color="text.secondary">
                    Services will be available soon. Please check back later.
                </Typography>
            </Container>
        );
    }

    return (
        <Box sx={{ width: "100%", py: 6, background: theme.palette.background.default }}>
            <Container maxWidth="lg">

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
                        Explore Our Services
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Popular services people are buying right now!
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {paginatedItems.map((service) => {
                        // 🔹 Calculate discount
                        const hasDiscount =
                            service.discount_value &&
                            Number(service.discount_value) > 0;

                        let finalPrice = service.service_price;
                        let discountLabel = null;

                        if (hasDiscount) {
                            if (service.discount_type === "fixed") {
                                finalPrice -= Number(service.discount_value);
                                discountLabel = `₦${service.discount_value} OFF`;
                            } else {
                                const discount =
                                    (service.service_price *
                                        Number(service.discount_value)) /
                                    100;
                                finalPrice -= discount;
                                discountLabel = `${service.discount_value}% OFF`;
                            }
                        }

                        // 🔹 Get features from service attributes
                        const features = service.service_attributes
                            ? Object.values(service.service_attributes).filter(Boolean)
                            : [];

                        return (
                            <Grid key={service.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                <Card
                                    elevation={4}
                                    sx={{
                                        borderRadius: 4,
                                        height: "100%",
                                        overflow: "hidden",
                                        display: "flex",
                                        flexDirection: "column",
                                        transition: "0.25s ease",
                                        background: theme.palette.background.paper,
                                        "&:hover": {
                                            transform: "translateY(-6px)",
                                            boxShadow: theme.shadows[10],
                                        },
                                    }}
                                >
                                    <Box sx={{ position: "relative" }}>
                                        <CardMedia
                                            component="img"
                                            image={resolveAwsImage(service.service_image) || "/placeholder-service.png"}
                                            onError={(e) => {
                                                e.currentTarget.src = "/placeholder-service.png";
                                            }}
                                            sx={{
                                                height: 160,
                                                objectFit: "cover",
                                            }}
                                        />

                                        {discountLabel && (
                                            <Chip
                                                label={discountLabel}
                                                size="small"
                                                sx={{
                                                    position: "absolute",
                                                    top: 10,
                                                    left: 10,
                                                    bgcolor: "error.main",
                                                    color: "#fff",
                                                    fontWeight: 700,
                                                    borderRadius: 2,
                                                }}
                                            />
                                        )}
                                    </Box>

                                    <CardContent sx={{ flex: "1 1 auto", pb: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
                                            {service.service_name}
                                        </Typography>

                                        <Typography sx={{ fontWeight: 600 }} variant="caption" color="text.secondary">
                                            {service.service_description?.slice(0, 60)}...
                                        </Typography>

                                        <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
                                            <Typography
                                                variant="h6"
                                                sx={{ fontWeight: 800, color: theme.palette.success.main }}
                                            >
                                                {formatGHS(finalPrice)}
                                            </Typography>

                                            {hasDiscount && (
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        textDecoration: "line-through",
                                                        color: theme.palette.text.disabled,
                                                    }}
                                                >
                                                    {formatGHS(service.service_price)}
                                                </Typography>
                                            )}

                                        </Stack>

                                        <Divider sx={{ my: 1.5 }} />
                                        <List dense disablePadding>
                                            {(features.length > 0
                                                ? features
                                                : ["Fast delivery", "Professional quality", "24/7 Support"]
                                            )
                                                .slice(0, 3)
                                                .map((feature, index) => (
                                                    <ListItem key={index} sx={{ px: 0, py: 0.4 }}>
                                                        <ListItemIcon sx={{ minWidth: 30 }}>
                                                            <CheckmarkCircle24Filled
                                                                style={{
                                                                    color: theme.palette.success.main,
                                                                }}
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={
                                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                                    {feature}
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItem>
                                                ))}
                                        </List>
                                    </CardContent>
                                    <CardActions sx={{ pb: 2, px: 2 }}>
                                        <Button
                                            onClick={() =>
                                                navigate(`/service/${encodeServiceId(service.id)}`)
                                            }
                                            fullWidth
                                            variant="contained"
                                            sx={{
                                                textTransform: "none",
                                                fontWeight: 700,
                                                borderRadius: 2,
                                                py: 1.1,
                                                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                                "&:hover": {
                                                    background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                                                },
                                            }}
                                        >
                                            Start Now
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>

                {totalPages > 1 && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(e, val) => setPage(val)}
                            size="large"
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    fontWeight: 700,
                                    "&.Mui-selected": {
                                        background: theme.palette.primary.main,
                                        color: theme.palette.primary.contrastText,
                                    },
                                },
                            }}
                        />
                    </Box>
                )}
            </Container>
        </Box>
    );
}