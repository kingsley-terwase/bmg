import React, { useState } from "react";
import { Box, Chip, Typography, Stack, Container, CircularProgress } from "@mui/material";
import { Briefcase20Filled } from "@fluentui/react-icons";
import { useGetCategories } from "../../Hooks/general";

const CategoryTabs = () => {
    const [active, setActive] = useState("Trending");
    const { data: categories, loading } = useGetCategories();

    return (
        <Box
            sx={{
                width: "100%",
                backgroundColor: "#F0F1FE",
                borderBottom: "1px solid #E5E7EB",
                py: 2,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Container maxWidth="lg">
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                        px: 2,
                        maxWidth: "1200px",
                        width: "100%",
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: "#111827",
                            mr: 1,
                            flexShrink: 0,
                        }}
                    >
                        Trending
                    </Typography>

                    {loading ? (
                        <CircularProgress size={24} sx={{ ml: 2 }} />
                    ) : (
                        categories?.map((cat) => (
                            <Chip
                                key={cat.id}
                                icon={<Briefcase20Filled />}
                                label={cat.name}
                                clickable
                                onClick={() => setActive(cat.name)}
                                sx={{
                                    borderRadius: "20px",
                                    px: 1,
                                    py: 1.5,
                                    height: "30px",
                                    fontSize: "0.8rem",
                                    color: active === cat.name ? "#1D4ED8" : "#6B7280",
                                    backgroundColor:
                                        active === cat.name ? "#DBEAFE" : "rgba(0,0,0,0.02)",
                                    border:
                                        active === cat.name
                                            ? "1px solid #3B82F6"
                                            : "1px solid #3B82F6",
                                    transition: "all 0.2s ease-in-out",
                                    "&:hover": {
                                        backgroundColor: "#EFF6FF",
                                        borderColor: "#93C5FD",
                                    },
                                }}
                            />
                        ))
                    )}
                </Stack>
            </Container>
        </Box>
    );
};

export default CategoryTabs;