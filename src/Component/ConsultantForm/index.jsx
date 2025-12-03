import React, { useState } from "react";
import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Button,
} from "@mui/material";

import {
    Person24Regular,
    Mail24Regular,
    Call24Regular,
    Briefcase24Regular,
    ChevronDown24Regular,
} from "@fluentui/react-icons";

export default function ConsultantForm() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        service: "",
    });

    const services = [
        "Business Consulting",
        "Financial Advisory",
        "Marketing Strategy",
        "Technology Solutions",
        "Legal Services",
        "HR Consulting",
        "Operations Management",
        "Other",
    ];

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSubmit = () => {
        alert("Thank you! Your consultation request has been submitted.");
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                p: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Decorative background blur circles */}
            <Box
                sx={{
                    position: "absolute",
                    top: 100,
                    left: 100,
                    width: 300,
                    height: 300,
                    background: "rgba(255,255,255,0.15)",
                    borderRadius: "50%",
                    filter: "blur(90px)",
                }}
            />

            {/* <Box
                sx={{
                    position: "absolute",
                    bottom: 100,
                    right: 100,
                    width: 380,
                    height: 380,
                    background: "rgba(168,85,247,0.25)",
                    borderRadius: "50%",
                    filter: "blur(90px)",
                }}
            /> */}

            <Grid
                container
                spacing={8}
                alignItems="center"
            // sx={{ position: "relative", zIndex: 10, maxWidth: "1100px" }}
            >
                <Grid size={{ xs: 12, md: 6 }} sx={{ color: "white" }}>
                    <Typography sx={{ fontSize: "1.2rem", opacity: 0.9, mb: 2 }}>
                        Didn't find what you want?
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: { xs: "3rem", md: "2.5rem" },
                            fontWeight: 900,
                            lineHeight: 1.1,
                            mb: 4,
                            background:
                                "linear-gradient(to right, #fff, #f3f3f3)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        BOOK A FREE
                        <br />
                        CONSULTATION
                    </Typography>

                    <Typography sx={{ fontSize: "1.2rem", opacity: 0.9, maxWidth: 400 }}>
                        Talk to our team of experts for professional advice on how to solve
                        your business needs.
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 5,
                            borderRadius: "28px",
                            background: "white",
                        }}
                    >
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12 }}>
                                <Typography fontWeight={600} mb={1}>
                                    Full Name
                                </Typography>
                                <Box>
                                    <Person24Regular
                                        style={{
                                            position: "absolute",
                                            left: 12,
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            color: "#4f46e5",
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        placeholder="Enter your full name"
                                        value={formData.fullName}
                                        onChange={handleChange("fullName")}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                pl: 5,
                                                background: "#eef2ff",
                                                borderRadius: 3,
                                                "&:hover": { background: "#e0e7ff" },
                                                "&.Mui-focused": {
                                                    background: "white",
                                                    boxShadow: "0 0 12px rgba(79,70,229,0.25)",
                                                    borderColor: "#4f46e5",
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Typography fontWeight={600} mb={1}>
                                    Select Service
                                </Typography>

                                <FormControl fullWidth>
                                    <Box>
                                        <Briefcase24Regular
                                            style={{
                                                position: "absolute",
                                                left: 12,
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                zIndex: 2,
                                                color: "#4f46e5",
                                            }}
                                        />

                                        <Select
                                            value={formData.service}
                                            onChange={handleChange("service")}
                                            displayEmpty
                                            IconComponent={() => (
                                                <ChevronDown24Regular
                                                    style={{
                                                        color: "#4f46e5",
                                                        position: "absolute",
                                                        right: 12,
                                                        top: "50%",
                                                        transform: "translateY(-50%)",
                                                    }}
                                                />
                                            )}
                                            sx={{
                                                pl: 5,
                                                borderRadius: 3,
                                                background: "#eef2ff",
                                                "&:hover": { background: "#e0e7ff" },
                                                "&.Mui-focused": {
                                                    background: "white",
                                                    boxShadow: "0 0 12px rgba(79,70,229,0.25)",
                                                    borderColor: "#4f46e5",
                                                },
                                            }}
                                        >
                                            <MenuItem value="">Choose a service</MenuItem>
                                            {services.map((s) => (
                                                <MenuItem key={s} value={s}>
                                                    {s}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Box>
                                </FormControl>
                            </Grid>

                            {/* Email */}
                            <Grid size={{ xs: 12 }}>
                                <Typography fontWeight={600} mb={1}>
                                    Email
                                </Typography>
                                <Box sx={{ position: "relative" }}>
                                    <Mail24Regular
                                        style={{
                                            position: "absolute",
                                            left: 12,
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            color: "#4f46e5",
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        placeholder="your@email.com"
                                        value={formData.email}
                                        onChange={handleChange("email")}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                pl: 5,
                                                background: "#eef2ff",
                                                borderRadius: 3,
                                                "&:hover": { background: "#e0e7ff" },
                                                "&.Mui-focused": {
                                                    background: "white",
                                                    boxShadow: "0 0 12px rgba(79,70,229,0.25)",
                                                    borderColor: "#4f46e5",
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Typography fontWeight={600} mb={1}>
                                    Phone
                                </Typography>
                                <Box sx={{ position: "relative" }}>
                                    <Call24Regular
                                        style={{
                                            position: "absolute",
                                            left: 12,
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            color: "#4f46e5",
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        placeholder="+1 (555) 000-0000"
                                        value={formData.phone}
                                        onChange={handleChange("phone")}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                pl: 5,
                                                background: "#eef2ff",
                                                borderRadius: 3,
                                                "&:hover": { background: "#e0e7ff" },
                                                "&.Mui-focused": {
                                                    background: "white",
                                                    boxShadow: "0 0 12px rgba(79,70,229,0.25)",
                                                    borderColor: "#4f46e5",
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Button
                                    fullWidth
                                    onClick={handleSubmit}
                                    sx={{
                                        mt: 2,
                                        py: 2,
                                        borderRadius: 3,
                                        fontSize: "1.1rem",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        background:
                                            "linear-gradient(to right, #4f46e5, #7c3aed)",
                                        color: "white",
                                        boxShadow: "0 10px 25px rgba(79,70,229,0.35)",
                                        "&:hover": {
                                            boxShadow: "0 12px 28px rgba(79,70,229,0.5)",
                                            transform: "translateY(-2px)",
                                        },
                                    }}
                                >
                                    Book Now
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
