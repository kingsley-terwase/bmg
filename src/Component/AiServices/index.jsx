import React from "react";

import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    Button,
    Chip,
} from "@mui/material";
import { services } from "./data";

export default function AIServicesSection() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                py: 10,
                background: "linear-gradient(to bottom right, #f8fafc, #f1f5f9, #e0f2fe)",
            }}
        >
            <Container maxWidth="lg">
                {/* Header Button */}
                <Box textAlign="center" mb={3}>
                    <Button
                        sx={{
                            background: "#3d4a7a",
                            color: "#fff",
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600,
                            "&:hover": {
                                background: "#2d3561",
                            },
                        }}
                    >
                        Leverage AI for better output
                    </Button>
                </Box>

                {/* Header Text */}
                <Box mb={8}>
                    <Typography variant="h3" fontWeight="bold" color="text.primary" mb={2}>
                        AI Services
                    </Typography>

                    <Typography variant="body1" color="text.secondary" maxWidth="600px" mb={4}>
                        Pretium lectus ultrices sit tempor, sit ullamcorper volutpat at et. Auctor turpis
                        semper id sit ornare maecenas lectus sed.
                    </Typography>

                    <Button
                        sx={{
                            background: "linear-gradient(to right, #f97316, #ea580c)",
                            color: "white",
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600,
                            "&:hover": {
                                background: "linear-gradient(to right, #ea580c, #c2410c)",
                            },
                        }}
                    >
                        Start for Free
                    </Button>
                </Box>

                <Grid container spacing={4}>
                    {services.map((service) => {
                        const Icon = service.icon;
                        return (
                            <Grid size={{xs:12, sm:6, md:4, }} key={service.id}>
                                <Card
                                    sx={{
                                        p: 4,
                                        borderRadius: 4,
                                        background: service.gradient,
                                        boxShadow: 3,
                                        position: "relative",
                                        transition: "0.3s",
                                        "&:hover": {
                                            transform: "translateY(-8px)",
                                            boxShadow: 6,
                                        },
                                    }}
                                >
                                    {/* New Badge */}
                                    <Chip
                                        label={service.badge}
                                        size="small"
                                        sx={{
                                            position: "absolute",
                                            top: 16,
                                            left: 16,
                                            bgcolor:
                                                service.badgeColor === "orange" ? "#fed7aa" : "#bfdbfe",
                                            color:
                                                service.badgeColor === "orange" ? "#c2410c" : "#1d4ed8",
                                            fontWeight: 600,
                                        }}
                                    />

                                    {/* Icon */}
                                    <Box display="flex" justifyContent="center" my={3}>
                                        <Box
                                            sx={{
                                                p: 3,
                                                borderRadius: 3,
                                                background: service.iconBg,
                                                transition: "0.3s",
                                                "&:hover": { transform: "scale(1.1)" },
                                            }}
                                        >
                                            <Icon
                                                style={{ width: 48, height: 48, color: service.iconColor }}
                                            />
                                        </Box>
                                    </Box>

                                    {/* Text Content */}
                                    <CardContent sx={{ textAlign: "center" }}>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            color="text.primary"
                                            mb={1}
                                        >
                                            {service.title}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">
                                            {service.description}
                                        </Typography>
                                    </CardContent>

                                    {/* Hover Border */}
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            inset: 0,
                                            borderRadius: 4,
                                            border: `2px solid ${service.borderColor}`,
                                            opacity: 0,
                                            transition: "0.3s",
                                            pointerEvents: "none",
                                            "&:hover": { opacity: 1 },
                                        }}
                                    />
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </Box>
    );
}
