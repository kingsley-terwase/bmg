import React, { useState } from "react";
import {
    Box,
    Grid,
    Typography,
    TextField,
    MenuItem,
    Select,
    FormControl,
    Button,
    useTheme,
    Container,
} from "@mui/material";

import {
    Person24Regular,
    Mail24Regular,
    Call24Regular,
    ChevronDown24Regular,
} from "@fluentui/react-icons";
import { FONT_FAMILY } from "../../Config/font";

export default function ConsultantForm() {
    const theme = useTheme();

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

    const handleChange = (field) => (e) =>
        setFormData({ ...formData, [field]: e.target.value });

    const handleSubmit = () => {
        alert("Thank you! Your consultation request has been submitted.");
    };

    return (
        <Box
            sx={{
                minHeight:{ xs: "0", md:"100vh"},
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: theme.palette.background.default,
                position: "relative",
                overflow: "hidden",
                pt: { xs: 4, md: 0 },
            }}
        >
            <Container data-aos='fade-up' maxWidth="lg">
                <Grid container spacing={8} alignItems="center">
                    {/* Left Side - Form */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                maxWidth: 550,
                                mx: { xs: "auto", md: 0 },
                            }}
                        >
                            {/* Heading */}
                            <Typography
                                sx={{
                                    fontSize: { xs: "2.5rem", md: "4.5rem" },
                                    fontWeight: 900,
                                    lineHeight: 1.1,
                                    mb: 5,
                                    color: theme.palette.text.heading,
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                BOOK A FREE 💬
                                <br />
                                CONSULTATION
                            </Typography>


                            {/* Form Fields */}
                            <Grid container spacing={2.5}>
                                {/* Full Name */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        placeholder="Full Name"
                                        value={formData.fullName}
                                        onChange={handleChange("fullName")}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                // background: theme.palette.background.paper,
                                                // borderRadius: "50px",
                                                fontSize: "0.95rem",
                                                color: theme.palette.text.primary,
                                                "& fieldset": {
                                                    border: "none",
                                                },
                                                // "&:hover": {
                                                //     background: theme.palette.primary.lightBg,
                                                // },
                                                "&.Mui-focused": {
                                                    background: theme.palette.background.paper,
                                                    boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
                                                },
                                            },
                                            "& .MuiOutlinedInput-input": {
                                                py: 1.5,
                                                px: 2.5,
                                                "&::placeholder": {
                                                    color: theme.palette.text.secondary,
                                                    opacity: 0.7,
                                                },
                                            },
                                        }}
                                    />
                                </Grid>

                                {/* Email */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange("email")}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                // background: theme.palette.background.paper,
                                                // borderRadius: "50px",
                                                fontSize: "0.95rem",
                                                color: theme.palette.text.primary,
                                                "& fieldset": {
                                                    border: "none",
                                                },
                                                "&:hover": {
                                                    background: theme.palette.primary.lightBg,
                                                },
                                                "&.Mui-focused": {
                                                    background: theme.palette.background.paper,
                                                    boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
                                                },
                                            },
                                            "& .MuiOutlinedInput-input": {
                                                py: 1.5,
                                                px: 2.5,
                                                "&::placeholder": {
                                                    color: theme.palette.text.secondary,
                                                    opacity: 0.7,
                                                },
                                            },
                                        }}
                                    />
                                </Grid>

                                {/* Phone with Country Code */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        <TextField
                                            value="+234"
                                            disabled
                                            sx={{
                                                width: "90px",
                                                "& .MuiOutlinedInput-root": {
                                                    // background: theme.palette.background.paper,
                                                    // borderRadius: "50px",
                                                    fontSize: "0.95rem",
                                                    color: theme.palette.text.primary,
                                                    "& fieldset": {
                                                        border: "none",
                                                    },
                                                },
                                                "& .MuiOutlinedInput-input": {
                                                    py: 1.5,
                                                    px: 2,
                                                    textAlign: "center",
                                                },
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            placeholder="802 123 4567"
                                            value={formData.phone}
                                            onChange={handleChange("phone")}
                                            sx={{
                                                flex: 1,
                                                "& .MuiOutlinedInput-root": {
                                                    // background: theme.palette.background.paper,
                                                    // borderRadius: "50px",
                                                    fontSize: "0.95rem",
                                                    color: theme.palette.text.primary,
                                                    "& fieldset": {
                                                        border: "none",
                                                    },
                                                    "&:hover": {
                                                        background: theme.palette.primary.lightBg,
                                                    },
                                                    "&.Mui-focused": {
                                                        background: theme.palette.background.paper,
                                                        boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
                                                    },
                                                },
                                                "& .MuiOutlinedInput-input": {
                                                    py: 1.5,
                                                    px: 2.5,
                                                    "&::placeholder": {
                                                        color: theme.palette.text.secondary,
                                                        opacity: 0.7,
                                                    },
                                                },
                                            }}
                                        />
                                    </Box>
                                </Grid>

                                {/* Service Select */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <FormControl fullWidth>
                                        <Select
                                            value={formData.service}
                                            onChange={handleChange("service")}
                                            displayEmpty
                                            IconComponent={ChevronDown24Regular}
                                            sx={{
                                                // background: theme.palette.background.paper,
                                                // borderRadius: "50px",
                                                fontSize: "0.95rem",
                                                color: theme.palette.text.primary,
                                                "& fieldset": {
                                                    border: "none",
                                                },
                                                "&:hover": {
                                                    background: theme.palette.primary.lightBg,
                                                },
                                                "&.Mui-focused": {
                                                    background: theme.palette.background.paper,
                                                    boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
                                                },
                                                "& .MuiSelect-select": {
                                                    py: 1.5,
                                                    px: 2.5,
                                                },
                                                "& .MuiSvgIcon-root": {
                                                    color: theme.palette.text.primary,
                                                    right: 12,
                                                },
                                            }}
                                        >
                                            <MenuItem value="" sx={{ color: theme.palette.text.secondary }}>
                                                Service
                                            </MenuItem>
                                            {services.map((s) => (
                                                <MenuItem key={s} value={s}>
                                                    {s}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Submit Button */}
                                <Grid size={{ xs: 12 }}>
                                    <Button
                                        fullWidth
                                        onClick={handleSubmit}
                                        sx={{
                                            mt: 2,
                                            py: 1.8,
                                            borderRadius: "50px",
                                            fontSize: "1.1rem",
                                            textTransform: "uppercase",
                                            fontWeight: 700,
                                            letterSpacing: "0.5px",
                                            background: theme.palette.primary.main,
                                            color: theme.palette.success.contrastText,
                                            boxShadow: `0 8px 24px ${theme.palette.primary.main}55`,
                                            "&:hover": {
                                                background: theme.palette.primary.bg,
                                                boxShadow: `0 12px 32px ${theme.palette.primary.main}88`,
                                                transform: "translateY(-2px)",
                                            },
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    {/* Right Side - Illustration/Image Placeholder */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                display:{ xs: "none", md:"flex"},
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 4,
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            {/* Placeholder for illustration */}
                            <Box
                                sx={{
                                    textAlign: "center",
                                    p: 4,
                                }}
                            >
                                <img
                                    src="/Marq/m_8.png"
                                    alt="Consultation Illustration"
                                    style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                    }}
                                />
                            </Box>

                            {/* Decorative circles */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 20,
                                    right: 20,
                                    width: 100,
                                    height: 100,
                                    borderRadius: "50%",
                                    background: theme.palette.success.main,
                                    // opacity: 0.1,
                                }}
                            />
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 40,
                                    left: 40,
                                    width: 150,
                                    height: 150,
                                    borderRadius: "50%",
                                    background: theme.palette.warning.main,
                                    // opacity: 0.1,
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}