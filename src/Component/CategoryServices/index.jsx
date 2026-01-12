// CategoryServices.jsx
import React, { useState, useEffect, useMemo } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { useCategory } from "../../Hooks/web_categories";
import { useServices } from "../../Hooks/web_services";
import CategoryTabs from "../CategoryTab";
import { formatGHS } from "../../utils/currency";

const ITEMS_PER_PAGE = 8;

// 🔹 Hash function to encode service ID
const encodeServiceId = (id) => {
    try {
        const hashString = `service_${id}_${Date.now() % 10000}`;
        let encoded = btoa(hashString);
        encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
        return encoded;
    } catch (err) {
        console.error("Failed to encode service ID:", err);
        return id;
    }
};

export default function CategoryServices() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { categoryId } = useParams();

    // 🔹 Decode the base64 encoded category ID
    const decodedCategoryId = useMemo(() => {
        try {
            return Number(atob(categoryId));
        } catch {
            return null;
        }
    }, [categoryId]);

    const [page, setPage] = useState(1);

    // 🔹 Hooks
    const {
        category,
        loading: categoryLoading,
        error: categoryError,
    } = useCategory(decodedCategoryId);

    const {
        services,
        loading: servicesLoading,
        error: servicesError,
    } = useServices();

    // 🔹 Helper function to resolve AWS images
    const resolveAwsImage = (image) => {
        if (!image) return null;

        // If already a full URL (AWS, CloudFront, etc.)
        if (image.startsWith('http')) return image;

        // Otherwise assume it's a key from AWS bucket
        return `${import.meta.env.VITE_AWS_BUCKET_URL}/${image}`;
    };

    // 🔹 Reset pagination when category changes
    useEffect(() => {
        setPage(1);
    }, [decodedCategoryId]);

    // 🔹 Filter services by category (using DECODED ID)
    const categoryServices = useMemo(() => {
        if (!services || !decodedCategoryId) return [];
        return services.filter(
            (service) => service.category_id === decodedCategoryId
        );
    }, [services, decodedCategoryId]);

    // 🔹 Pagination
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedServices = categoryServices.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );
    const totalPages = Math.ceil(categoryServices.length / ITEMS_PER_PAGE);

    // =============================
    // ⛔ BLOCK ONLY ON CATEGORY LOAD
    // =============================
    if (categoryLoading) {
        return (
            <Box
                sx={{
                    width: "100%",
                    minHeight: "60vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress size={50} />
            </Box>
        );
    }

    // ❌ Category error or invalid ID
    if (categoryError || !decodedCategoryId) {
        return (
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Alert severity="error">
                    {categoryError || "Invalid category ID"}
                </Alert>
            </Container>
        );
    }

    return (
        <Box sx={{ width: "100%", py: 8, background: theme.palette.background.default }}>
            {/* <CategoryTabs/> */}
            <Container maxWidth="lg">

                {/* ================= CATEGORY HEADER ================= */}
                {category && (
                    <Box sx={{ mb: 5, mt: 4 }}>
                        {category.image && (
                            <Box
                                sx={{
                                    width: "100%",
                                    height: 250,
                                    borderRadius: 4,
                                    overflow: "hidden",
                                    mb: 3,
                                    boxShadow: theme.shadows[8],
                                }}
                            >
                                <img
                                    src={resolveAwsImage(category.image)}
                                    alt={category.name}
                                    onError={(e) => {
                                        e.currentTarget.src = "/placeholder-image.png";
                                    }}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                        )}

                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 800, mb: 1 }}
                        >
                            {category.name} Services
                        </Typography>

                        <Typography color="text.secondary">
                            {category.description}
                        </Typography>

                        {category.short_descriptions && (
                            <Grid container spacing={2} sx={{ mt: 3 }}>
                                {Object.values(category.short_descriptions)
                                    .filter(Boolean)
                                    .slice(0, 3)
                                    .map((desc, idx) => (
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                                            <Box
                                                sx={{
                                                    p: 2,
                                                    borderRadius: 2,
                                                    border: `1px solid ${theme.palette.divider}`,
                                                    background: theme.palette.background.paper,
                                                }}
                                            >
                                                <Typography variant="body2">
                                                    {desc}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                            </Grid>
                        )}
                    </Box>
                )}

                {/* ================= SERVICES ================= */}
                {servicesError && (
                    <Alert severity="error" sx={{ mb: 4 }}>
                        {servicesError}
                    </Alert>
                )}

                {servicesLoading ? (
                    <Box sx={{ textAlign: "center", py: 8 }}>
                        <CircularProgress size={40} />
                        <Typography sx={{ mt: 2 }}>
                            Loading services...
                        </Typography>
                    </Box>
                ) : categoryServices.length === 0 ? (
                    <Box sx={{ textAlign: "center", py: 8 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            No Services Available
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 3 }}>
                            Services for this category will be available soon.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => navigate("/category")}
                        >
                            Browse Other Categories
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                            Available Services ({categoryServices.length})
                        </Typography>

                        <Grid container spacing={3}>
                            {paginatedServices.map((service) => {
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

                                const features = service.service_attributes
                                    ? Object.values(service.service_attributes).filter(Boolean)
                                    : [];

                                return (
                                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={service.id}>
                                        <Card
                                            sx={{
                                                height: "100%",
                                                borderRadius: 4,
                                                transition: "0.3s",
                                                "&:hover": {
                                                    transform: "translateY(-6px)",
                                                },
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="160"
                                                src={resolveAwsImage(service.service_image)}
                                                onError={(e) => {
                                                    e.currentTarget.src = "/placeholder-service.png";
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
                                                    }}
                                                />
                                            )}

                                            <CardContent>
                                                <Typography fontWeight={800}>
                                                    {service.service_name}
                                                </Typography>

                                                <Typography variant="caption" color="text.secondary">
                                                    {service.service_description?.slice(0, 60)}...
                                                </Typography>

                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    mt={2}
                                                >
                                                    <Typography fontWeight={800} color="success.main">
                                                        {formatGHS(finalPrice)}
                                                    </Typography>

                                                    {hasDiscount && (
                                                        <Typography variant="caption" sx={{ textDecoration: "line-through" }}>
                                                            {formatGHS(service.service_price)}
                                                        </Typography>
                                                    )}
                                                </Stack>

                                                <Divider sx={{ my: 2 }} />

                                                <List dense disablePadding>
                                                    {(features.length ? features : [
                                                        "Fast delivery",
                                                        "Professional quality",
                                                        "24/7 Support",
                                                    ])
                                                        .slice(0, 3)
                                                        .map((feature, i) => (
                                                            <ListItem key={i} disablePadding>
                                                                <ListItemIcon sx={{ minWidth: 30 }}>
                                                                    <CheckmarkCircle24Filled
                                                                        style={{ color: theme.palette.success.main }}
                                                                    />
                                                                </ListItemIcon>
                                                                <ListItemText
                                                                    primary={
                                                                        <Typography variant="body2">
                                                                            {feature}
                                                                        </Typography>
                                                                    }
                                                                />
                                                            </ListItem>
                                                        ))}
                                                </List>
                                            </CardContent>

                                            <CardActions sx={{ px: 3, mb: 2 }}>
                                                <Button
                                                    sx={{ borderRadius: 2 }}
                                                    fullWidth
                                                    variant="contained"
                                                    onClick={() =>
                                                        navigate(`/service/${encodeServiceId(service.id)}`)
                                                    }
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
                                />
                            </Box>
                        )}
                    </>
                )}
            </Container>
        </Box>
    );
}