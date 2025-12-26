import React from "react";
import {
    Box,
    Grid,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
    useTheme,
    Container
} from "@mui/material";
import { ArrowRight24Filled } from "@fluentui/react-icons";
import { FONT_FAMILY } from "../../Config/font";
import { useNavigate } from "react-router-dom";

const trendingServices = [
    {
        id: 1,
        title: "AI",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
        // Use theme.primary + theme.secondary as gradient
        // getGradient: (theme) =>
        //     `linear-gradient(to top, ${theme.palette.primary.light}40, ${theme.palette.secondary.main}40)`
    },
    {
        id: 2,
        title: "Business Development",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        // getGradient: (theme) =>
        //     `linear-gradient(to top, ${theme.palette.text.secondary}40, ${theme.palette.background.paper}40)`
    },
    {
        id: 3,
        title: "Web Design",
        image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800",
        // getGradient: (theme) =>
        //     `linear-gradient(to top, ${theme.palette.info.main}40, ${theme.palette.info.light}40)`
    },
    {
        id: 4,
        title: "Vibe Coding",
        image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800",
        // getGradient: (theme) =>
        //     `linear-gradient(to top, ${theme.palette.secondary.dark}40, ${theme.palette.primary.main}40)`
    },
];

export default function TrendingService() {
    const theme = useTheme();
    const navigate = useNavigate();
    const handleViewMore = () => {
        navigate('/service');
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: theme.palette.primary.lightBg,
                py: 3,
                px: 2,
            }}
        >
            <Container data-aos='fade-up' maxWidth="lg" mx="auto">
                <Box display={{ xs: "block", md: "flex" }} justifyContent="space-between" alignItems="flex-start" mb={4}>
                    <Box sx={{ mb: { xs: 3, md: 0 } }}>
                        <Typography
                            sx={{
                                fontFamily: FONT_FAMILY.primary,
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                            }}
                            variant="h2"
                            fontWeight="900"
                            color="text.primary"
                            mb={2}
                        >
                            TRENDING🔥
                        </Typography>


                        <Box
                            mb={2}
                            sx={{
                                display: "inline-block",
                                px: 2,
                                py: 0.3,
                                borderRadius: 1,
                                backgroundColor: theme.palette.warning.light + "40",
                                border: `1px solid ${theme.palette.warning.light}`,
                            }}
                        >
                            <Typography variant="caption" fontWeight="bold" color="warning.main">
                                Weekly Spotlight
                            </Typography>
                        </Box>

                        <Typography sx={{ fontFamily: FONT_FAMILY.tertiary }} variant="body1" color="text.secondary" maxWidth="600px">
                            Bite-sized digital marketing services to help you grow your business.
                        </Typography>
                    </Box>

                    <Button
                        onClick={handleViewMore}
                        variant="outlined"
                        endIcon={<ArrowRight24Filled />}
                        sx={{
                            // background: theme.palette.primary.light,
                            px: 3,
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: "bold",
                            textTransform: "none",                            
                            boxShadow: 3,
                            "&:hover": {
                                background: `linear-gradient(to right, 
                                    ${theme.palette.primary.dark}, 
                                    ${theme.palette.primary.main}
                                )`,
                                color: theme.palette.text.small,
                                transform: "translateY(-3px)",
                                boxShadow: 6,
                            },
                        }}
                    >
                        Discover more services
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {trendingServices.map((service) => (
                        <Grid key={service.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Card
                                sx={{
                                    borderRadius: "20px",
                                    overflow: "hidden",
                                    position: "relative",
                                    cursor: "pointer",
                                    "&:hover .zoomImage": { transform: "scale(1.12)" },
                                    "&:hover .shine": { transform: "translateX(100%)" },
                                    "&:hover .borderEffect": {
                                        borderColor: theme.palette.warning.main + "80",
                                    },
                                    transition: "0.5s",
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="280"
                                    image={service.image}
                                    alt={service.title}
                                    className="zoomImage"
                                    sx={{ transition: "0.7s" }}
                                />

                                {/* Gradient */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                    }}
                                />

                                <Box
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                    }}
                                />

                                <Box
                                    className="borderEffect"
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                        border: "4px solid transparent",
                                        borderRadius: "20px",
                                        transition: "0.5s",
                                    }}
                                />

                                <CardContent
                                    sx={{
                                        position: "absolute",
                                        bottom: 0,
                                        width: "100%",
                                        px: 3,
                                        pb: 3,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: theme.palette.background.paper + "dd",
                                            backdropFilter: "blur(6px)",
                                            py: 1.5,
                                            borderRadius: "12px",
                                            textAlign: "center",
                                            fontWeight: "bold",
                                            transition: "0.3s",
                                            "&:hover": {
                                                transform: "scale(1.05)",
                                                backgroundColor: theme.palette.background.paper,
                                            },
                                        }}
                                    >
                                        <Typography fontWeight="bold" color="text.primary">
                                            {service.title}
                                        </Typography>
                                    </Box>
                                </CardContent>

                                {/* Shine */}
                                <Box
                                    className="shine"
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                        transform: "translateX(-100%)",
                                        background: `linear-gradient(to right, transparent, ${theme.palette.background.paper}55, transparent)`,
                                        transition: "1s",
                                    }}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box textAlign="center" mt={6}>
                    <Typography color="text.secondary" sx={{ fontFamily: FONT_FAMILY.tertiary }} mb={2}>
                        Explore more trending services and boost your business today
                    </Typography>

                    <Box display="flex" justifyContent="center" gap={1}>
                        {[...Array(4)].map((_, i) => (
                            <Box
                                key={i}
                                sx={{
                                    height: 8,
                                    width: i === 0 ? 32 : 12,
                                    borderRadius: 5,
                                    backgroundColor:
                                        i === 0
                                            ? theme.palette.warning.main
                                            : theme.palette.divider,
                                    cursor: "pointer",
                                    "&:hover": { backgroundColor: theme.palette.warning.main },
                                    transition: "0.3s",
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
