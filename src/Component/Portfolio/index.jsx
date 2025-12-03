import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";

const PortfolioSection = () => {
    const items = [
        "/Images/Img_4.jpg",
        "https://source.unsplash.com/300x300/?studio",
        "https://source.unsplash.com/300x300/?team",
        "https://source.unsplash.com/300x300/?branding",
        "https://source.unsplash.com/300x300/?marketing",
        "https://source.unsplash.com/300x300/?socialmedia",
        "https://source.unsplash.com/300x300/?printing",
        "https://source.unsplash.com/300x300/?design",
        "https://source.unsplash.com/300x300/?technology",
        "https://source.unsplash.com/300x300/?documents",
        "https://source.unsplash.com/300x300/?laptop",
        "https://source.unsplash.com/300x300/?brochure",
        "https://source.unsplash.com/300x300/?pdf",
        "https://source.unsplash.com/300x300/?email",
    ];

    return (
        <Box
            sx={{
                width: "100%",
                backgroundColor: "#f4f4ff",
                py: 6,
                px: 3,
                borderRadius: 4,
            }}
        >
            <Box textAlign="center" mb={4}>
                <Typography
                    variant="h4"
                    fontWeight="700"
                    color="text.primary"
                    sx={{ mb: 1 }}
                >
                    Portfolio
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    maxWidth="700px"
                    mx="auto"
                >
                    Take advantage of our special marketing Kit for bulk SMS, mailing
                    among others
                </Typography>
            </Box>

            <Grid container spacing={2} justifyContent="center">
                {items.map((img, index) => (
                    <Grid size={ {xs:4, sm:3, md:2 }} key={index}>
                        <Box
                            sx={{
                                width: "100%",
                                height: 100,
                                borderRadius: 3,
                                overflow: "hidden",
                                boxShadow: 2,
                                cursor: "pointer",
                                transition: "0.3s",
                                "&:hover": { transform: "translateY(-5px)", boxShadow: 5 },
                            }}
                        >
                            <img
                                src={img}
                                alt="portfolio"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <Box textAlign="center" mt={5}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#1e1b4b",
                        px: 5,
                        py: 1.5,
                        fontWeight: "bold",
                        borderRadius: 2,
                        textTransform: "none",
                        "&:hover": {
                            backgroundColor: "#312e81",
                        },
                    }}
                >
                    View Portfolio
                </Button>
            </Box>
        </Box>
    );
};

export default PortfolioSection;
