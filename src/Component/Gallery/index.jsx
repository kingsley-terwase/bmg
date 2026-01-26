import React, { useState } from "react";
import {
    Box,
    Grid,
    Typography,
    Card,
    Modal,
    IconButton,
    Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BrandLoader from "../BrandLoader";

const galleryItems = [
    { id: 1, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=600&fit=crop", span: { md: 2, xs: 1 } },
    { id: 2, image: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=800&h=400&fit=crop", span: { md: 2, xs: 1 } },
    { id: 3, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=600&fit=crop", span: { md: 2, xs: 1 } },
    { id: 4, image: "/Images/Img_4.jpg", span: { md: 2, xs: 1 } },
    { id: 5, image: "/Images/Img_5.jpg", span: { md: 2, xs: 1 } },
    { id: 6, image: "/Images/Img_4.jpg", span: { md: 2, xs: 1 } },
    { id: 7, image: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=800&h=600&fit=crop", span: { md: 2, xs: 1 } },
    { id: 8, image: "/Images/Img_5.jpg", span: { md: 2, xs: 1 } },
];

export default function Gallery({ data, loading }) {
    const [selectedImage, setSelectedImage] = useState(null);
    console.log("data:", data)
    return (
        loading ? <BrandLoader /> :
            <Box sx={{ py: 10, px: 2, background: "linear-gradient(to bottom right, #f8fafc, #e2e8f0)" }}>
                <Box maxWidth="lg" mx="auto">
                    <Box textAlign="center" mb={8}>
                        <Typography
                            variant="h3"
                            fontWeight={900}
                            sx={{
                                color: "#000",
                            }}
                        >
                            Product Gallery
                        </Typography>

                        <Typography variant="h6" color="text.secondary">
                            Explore our product packaging and design showcase
                        </Typography>
                    </Box>

                    {/* GRID */}
                    <Grid container spacing={1}>
                        {galleryItems.map((item) => (
                            <Grid
                                key={item.id}
                                size={{ xs: 12, sm: 3, }}
                                md={item.span.md === 2 ? 6 : 3}
                            >
                                <Card
                                    onClick={() => setSelectedImage(item.image)}
                                    sx={{
                                        height: item.span.md === 2 ? 320 : 180,
                                        position: "relative",
                                        borderRadius: 2,
                                        overflow: "hidden",
                                        boxShadow: 4,
                                        cursor: "pointer",
                                        transition: "0.3s",
                                        "&:hover": {
                                            transform: "scale(1.03)",
                                            boxShadow: 10,
                                        },
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={item.image}
                                        alt=""
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box
                        sx={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                            mt: -10, // replaces your top:-80
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                background: "#ea580c",
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: "15px",
                                px: 3,
                                py: 1,
                                borderRadius: 2,
                                boxShadow: 2,
                                textTransform: "none",
                                "&:hover": {
                                    background: "#ea580c",
                                    transform: "scale(1.03)",
                                },
                            }}
                        >
                            View More
                        </Button>
                    </Box>


                    <Modal open={Boolean(selectedImage)} onClose={() => setSelectedImage(null)}>
                        <Box
                            onClick={() => setSelectedImage(null)}
                            sx={{
                                position: "fixed",
                                inset: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "rgba(0,0,0,0.9)",
                                p: 4,
                            }}
                        >
                            <Box
                                sx={{
                                    maxWidth: "900px",
                                    width: "100%",
                                    background: "white",
                                    p: 4,
                                    borderRadius: 3,
                                    position: "relative",
                                }}
                            >
                                <IconButton
                                    onClick={() => setSelectedImage(null)}
                                    sx={{ position: "absolute", top: -50, right: -10, color: "white" }}
                                >
                                    <CloseIcon sx={{ fontSize: 40 }} />
                                </IconButton>

                                <Typography variant="h5" fontWeight={700} mb={2}>
                                    Product Preview
                                </Typography>

                                <Box
                                    sx={{
                                        borderRadius: 3,
                                        overflow: "hidden",
                                        height: "60vh",
                                        background: "#e2e8f0",
                                    }}
                                >
                                    {selectedImage && (
                                        <img
                                            src={selectedImage}
                                            alt=""
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
            </Box>
    );
}
