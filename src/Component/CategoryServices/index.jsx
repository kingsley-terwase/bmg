/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useRef, useCallback } from "react";
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
    useTheme,
    CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { decodeServiceId, encodeServiceId, resolveAwsImage } from "../../utils/functions";
import { formatGHS } from "../../utils/currency";
import { calculateServicePrice } from "../../Hooks/services";
import { useGetCategoryServices } from "../../Hooks/general";
import BrandLoader from "../BrandLoader";
import FAQSection from "../FAQ";

export default function CategoryServices() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { categoryId } = useParams();

    // Decode the base64 encoded category ID
    const decodedCategoryId = decodeServiceId(categoryId);

    const [page, setPage] = useState(1);
    const [allServices, setAllServices] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    // Ref for intersection observer
    const observerTarget = useRef(null);

    // Hooks
    const {
        data: categoryServices,
        loading: categoryLoading,
        total
    } = useGetCategoryServices({ id: decodedCategoryId, page, limit: 8 });

    const category = categoryServices?.category;
    const services = categoryServices?.category_services || [];
    const faqs = categoryServices?.category?.faqs;

    // Load more services when new data arrives
    useEffect(() => {
        if (services.length > 0) {
            setAllServices(prev => {
                // Avoid duplicates by checking IDs
                const newServices = services.filter(
                    service => !prev.some(existing => existing.id === service.id)
                );
                const updatedServices = [...prev, ...newServices];

                // Check if there are more services to load
                // Stop if we received fewer services than requested or reached total
                if (services.length < 8 || updatedServices.length >= total) {
                    setHasMore(false);
                }

                return updatedServices;
            });
        } else if (services.length === 0 && page > 1) {
            // No services returned for this page, stop loading
            setHasMore(false);
        }
    }, [services, total, page]);

    // Intersection Observer callback
    const handleObserver = useCallback((entries) => {
        const [target] = entries;
        if (target.isIntersecting && hasMore && !categoryLoading) {
            setPage(prev => prev + 1);
        }
    }, [hasMore, categoryLoading]);

    // Set up Intersection Observer
    useEffect(() => {
        const element = observerTarget.current;
        const option = {
            root: null,
            rootMargin: "100px", // Load before user reaches the bottom
            threshold: 0
        };

        const observer = new IntersectionObserver(handleObserver, option);
        if (element) observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, [handleObserver]);

    // Reset when category changes
    useEffect(() => {
        setPage(1);
        setAllServices([]);
        setHasMore(true);
    }, [decodedCategoryId]);

    const renderServiceCard = (service) => {
        const { finalPrice, discountLabel, hasDiscount, originalPrice } = calculateServicePrice(service);
        const service_type = service?.service_types?.[0];
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
                        src={resolveAwsImage(service_type?.service_type_image)}
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
                            {service?.service_name}
                        </Typography>

                        <Typography variant="caption" color="text.secondary" dangerouslySetInnerHTML={{
                            __html: service_type?.description?.slice(0, 60) + "..."
                        }} />

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
                                    {formatGHS(originalPrice)}
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
                                navigate(`/service/${encodeServiceId(service.id)}/${service?.service_name}`)
                            }
                        >
                            Start Now
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    };

    if (page === 1 && categoryLoading) {
        return <BrandLoader />;
    }

    return (
        <Box sx={{ width: "100%", py: 8, background: theme.palette.background.default }}>
            <Container maxWidth="lg">
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
                                        e.currentTarget.src = "/placeholder-image.jpg";
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

                        <Typography color="text.secondary" dangerouslySetInnerHTML={{
                            __html: category?.description
                        }} />

                        {category.short_description && (
                            <Grid container spacing={2} sx={{ mt: 3 }}>
                                {Object.values(category.short_description)
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

                {allServices.length === 0 && !categoryLoading ? (
                    <Box sx={{ textAlign: "center", py: 8 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            No Services Available
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 3 }}>
                            Services for this category will be available soon.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => navigate("/categories")}
                        >
                            Browse Other Categories
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                            Available Services ({total || allServices.length})
                        </Typography>

                        <Grid container spacing={3}>
                            {allServices.map(renderServiceCard)}
                        </Grid>

                        {/* Loading indicator for subsequent pages */}
                        {categoryLoading && page > 1 && (
                            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                                <CircularProgress />
                            </Box>
                        )}

                        {/* Intersection observer target */}
                        {hasMore && (
                            <Box
                                ref={observerTarget}
                                sx={{
                                    height: 20,
                                    display: "flex",
                                    justifyContent: "center",
                                    py: 2
                                }}
                            />
                        )}

                        {/* End of results message */}
                        {!hasMore && allServices.length > 0 && (
                            <Box sx={{ textAlign: "center", py: 4 }}>
                                <Typography variant="body2" color="text.secondary">
                                    You've reached the end of the list
                                </Typography>
                            </Box>
                        )}
                    </>
                )}

                <FAQSection data={faqs} loading={categoryLoading} label={`${category?.name} Services`} />
            </Container>
        </Box>
    );
}

