/* eslint-disable no-unused-vars */
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
    CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";

import {
    Person24Regular,
    Mail24Regular,
    Call24Regular,
    ChevronDown24Regular,
} from "@fluentui/react-icons";
import { FONT_FAMILY } from "../../Config/font";
import { useGetServices } from "../../Hooks/services";
import { COUNTRY_CODES } from "../../utils/data";
import { useSubmitConsultation } from "../../Hooks/general";

export default function ConsultantForm() {
    const theme = useTheme();

    const initialFormData = {
        fullName: "",
        email: "",
        countryCode: "+234",
        phone: "",
        service: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});

    const { services } = useGetServices();
    const { submitConsultation, loading } = useSubmitConsultation();

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors({ ...errors, [field]: "" });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Full Name validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = "Name must be at least 2 characters";
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Phone validation
        const phoneRegex = /^[0-9]{7,15}$/;
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
            newErrors.phone = "Please enter a valid phone number (7-15 digits)";
        }

        // Service validation
        if (!formData.service) {
            newErrors.service = "Please select a service";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            toast.error("Please fill in all required fields correctly.", {
                position: "top-right",
                autoClose: 4000,
            });
            return;
        }

        try {
            await submitConsultation({
                full_name: formData.fullName,
                email: formData.email,
                phone: formData.countryCode + formData.phone,
                service: formData.service,
            });

        } catch (error) {
            // Show error toast if submission fails
            toast.error("Failed to submit consultation. Please try again.", {
                position: "top-right",
                autoClose: 4000,
            });
        }
    };

    return (
        <Box
            sx={{
                minHeight: { xs: "0", md: "100vh" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: theme.palette.background.default,
                position: "relative",
                overflow: "hidden",
                pt: { xs: 4, md: 0 },
            }}
        >
            <Container data-aos="fade-up" maxWidth="lg">
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
                                        error={!!errors.fullName}
                                        helperText={errors.fullName}
                                        disabled={loading}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                fontSize: "0.95rem",
                                                color: theme.palette.text.primary,
                                                "& fieldset": {
                                                    border: errors.fullName
                                                        ? `1px solid ${theme.palette.error.main}`
                                                        : "none",
                                                },
                                                "&.Mui-focused": {
                                                    background: theme.palette.background.paper,
                                                    boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
                                                },
                                                "&.Mui-disabled": {
                                                    opacity: 0.6,
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
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        disabled={loading}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                fontSize: "0.95rem",
                                                color: theme.palette.text.primary,
                                                "& fieldset": {
                                                    border: errors.email
                                                        ? `1px solid ${theme.palette.error.main}`
                                                        : "none",
                                                },
                                                "&:hover": {
                                                    background: theme.palette.primary.lightBg,
                                                },
                                                "&.Mui-focused": {
                                                    background: theme.palette.background.paper,
                                                    boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
                                                },
                                                "&.Mui-disabled": {
                                                    opacity: 0.6,
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
                                        <FormControl sx={{ width: "120px" }}>
                                            <Select
                                                value={formData.countryCode}
                                                onChange={handleChange("countryCode")}
                                                IconComponent={ChevronDown24Regular}
                                                disabled={loading}
                                                sx={{
                                                    fontSize: "0.95rem",
                                                    color: theme.palette.text.primary,
                                                    "& fieldset": {
                                                        border: "none",
                                                    },
                                                    "&:hover": {
                                                        background: theme.palette.primary.lightBg,
                                                    },
                                                    "& .MuiSelect-select": {
                                                        py: 1.5,
                                                        px: 1.5,
                                                    },
                                                    "&.Mui-disabled": {
                                                        opacity: 0.6,
                                                    },
                                                }}
                                            >
                                                {COUNTRY_CODES.map((country) => (
                                                    <MenuItem key={country.code} value={country.code}>
                                                        {country.flag} {country.code}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            fullWidth
                                            placeholder="802 123 4567"
                                            value={formData.phone}
                                            onChange={handleChange("phone")}
                                            error={!!errors.phone}
                                            helperText={errors.phone}
                                            disabled={loading}
                                            sx={{
                                                flex: 1,
                                                "& .MuiOutlinedInput-root": {
                                                    fontSize: "0.95rem",
                                                    color: theme.palette.text.primary,
                                                    "& fieldset": {
                                                        border: errors.phone
                                                            ? `1px solid ${theme.palette.error.main}`
                                                            : "none",
                                                    },
                                                    "&:hover": {
                                                        background: theme.palette.primary.lightBg,
                                                    },
                                                    "&.Mui-focused": {
                                                        background: theme.palette.background.paper,
                                                        boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
                                                    },
                                                    "&.Mui-disabled": {
                                                        opacity: 0.6,
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
                                    <FormControl fullWidth error={!!errors.service}>
                                        <Select
                                            value={formData.service}
                                            onChange={handleChange("service")}
                                            displayEmpty
                                            IconComponent={ChevronDown24Regular}
                                            disabled={loading}
                                            sx={{
                                                fontSize: "0.95rem",
                                                color: theme.palette.text.primary,
                                                "& fieldset": {
                                                    border: errors.service
                                                        ? `1px solid ${theme.palette.error.main}`
                                                        : "none",
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
                                                "&.Mui-disabled": {
                                                    opacity: 0.6,
                                                },
                                            }}
                                        >
                                            <MenuItem value="" sx={{ color: theme.palette.text.secondary }}>
                                                Service
                                            </MenuItem>
                                            {services?.length > 0 &&
                                                services.map((s, i) => (
                                                    <MenuItem key={i} value={s?.id}>
                                                        {s?.service_name}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                        {errors.service && (
                                            <Typography
                                                sx={{
                                                    color: theme.palette.error.main,
                                                    fontSize: "0.75rem",
                                                    mt: 0.5,
                                                    ml: 1.5,
                                                }}
                                            >
                                                {errors.service}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>

                                {/* Submit Button */}
                                <Grid size={{ xs: 12 }}>
                                    <Button
                                        fullWidth
                                        onClick={handleSubmit}
                                        disabled={loading}
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
                                            "&.Mui-disabled": {
                                                background: theme.palette.action.disabledBackground,
                                                color: theme.palette.action.disabled,
                                                opacity: 0.7,
                                            },
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        {loading ? (
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <CircularProgress size={20} sx={{ color: "inherit" }} />
                                                <span>Submitting...</span>
                                            </Box>
                                        ) : (
                                            "Submit"
                                        )}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    {/* Right Side - Illustration/Image Placeholder */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
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
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}