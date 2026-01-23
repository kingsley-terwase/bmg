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
import { calculateServicePrice, useGetServices } from "../../Hooks/services";
import { formatGHS } from "../../utils/currency";
import { encodeServiceId, resolveAwsImage } from "../../utils/functions";
import BrandLoader from "../BrandLoader";

const ITEMS_PER_PAGE = 8;

export default function ServicesGrid() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [page, setPage] = useState(1);

    // 🔹 Fetch services from API
    const { services, loading } = useGetServices();

    // 🔹 Pagination
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedItems = services.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE);


    return (
        loading ? <BrandLoader /> : !services || services.length === 0 ? <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                No Services Available
            </Typography>
            <Typography color="text.secondary">
                Services will be available soon. Please check back later.
            </Typography>
        </Container> :
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
                            const { finalPrice, discountLabel, hasDiscount, serviceType } = calculateServicePrice(service)

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
                                                image={resolveAwsImage(service?.service_types?.[0]?.service_type_image) || "/placeholder-service.jpg"}
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
                                                {serviceType?.description?.slice(0, 60)}...
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
                                                        {formatGHS(serviceType?.price)}
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
                                                    navigate(`/service/${encodeServiceId(service.id)}/${service?.service_name}`)
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