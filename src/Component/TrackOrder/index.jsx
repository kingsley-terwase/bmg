import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    TextField,
    Paper,
    Grid,
    Avatar,
    useTheme,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import PhoneIcon from "@mui/icons-material/Phone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

const steps = [
    { id: 1, title: "Link to your website", icon: <LinkIcon /> },
    { id: 2, title: "Logo", icon: <ImageIcon /> },
    { id: 3, title: "Description", icon: <DescriptionIcon /> },
    { id: 4, title: "Contact Info", icon: <PhoneIcon /> },
    { id: 5, title: "Confirm Details", icon: <CheckCircleIcon /> },
    { id: 6, title: "Checkout", icon: <InventoryIcon /> },
];

export default function OrderTracker() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        websiteLink: "",
        logoFile: null,
        description: "",
        brandName: "",
        email: "",
        phone: "",
        socialMedia: "",
    });

    const handleNext = () =>
        currentStep < steps.length && setCurrentStep((s) => s + 1);

    const handlePrev = () =>
        currentStep > 1 && setCurrentStep((s) => s - 1);

    const handleInputChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) setFormData({ ...formData, logoFile: file });
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Box>
                        <Box textAlign="center" mb={{ xs: 3, md: 4 }}>
                            <Typography variant="h4" fontWeight="bold">
                                Link to your website & Socials
                            </Typography>
                            <Typography color="text.secondary">
                                Provide URLs to your website for reference
                            </Typography>
                        </Box>

                        <TextField
                            fullWidth
                            name="websiteLink"
                            label="Website Link"
                            value={formData.websiteLink}
                            onChange={handleInputChange}
                            placeholder="https://yourwebsite.com"
                            sx={{ mb: 3 }}
                        />

                        <Paper
                            elevation={0}
                            sx={{
                                border: `2px dashed ${theme.palette.divider}`,
                                p: { xs: 3, md: 5 },
                                borderRadius: 2,
                                textAlign: "center",
                                bgcolor: "transparent",
                            }}
                        >
                            <label style={{ cursor: "pointer" }}>
                                <input type="file" hidden onChange={handleFileUpload} />
                                <Avatar
                                    sx={{
                                        bgcolor: theme.palette.grey[200],
                                        width: 64,
                                        height: 64,
                                        mx: "auto",
                                        mb: 2,
                                    }}
                                >
                                    <ImageIcon sx={{ color: theme.palette.primary.main }} />
                                </Avatar>
                                <Typography fontWeight={600}>Upload File</Typography>
                                <Typography fontSize={13} color="text.secondary">
                                    Optional screenshots
                                </Typography>
                            </label>
                        </Paper>
                    </Box>
                );

            case 2:
                return (
                    <Box>
                        <Box textAlign="center" mb={4}>
                            <Typography variant="h4" fontWeight="bold">
                                Provide your Brand Logo
                            </Typography>
                            <Typography color="text.secondary">
                                Upload your logo or inspiration
                            </Typography>
                        </Box>

                        <Paper
                            elevation={0}
                            sx={{
                                border: `2px dashed ${theme.palette.divider}`,
                                p: { xs: 4, md: 8 },
                                borderRadius: 2,
                                textAlign: "center",
                            }}
                        >
                            <label style={{ cursor: "pointer" }}>
                                <input type="file" hidden onChange={handleFileUpload} />
                                <Avatar
                                    sx={{
                                        bgcolor: theme.palette.grey[200],
                                        width: 90,
                                        height: 90,
                                        mx: "auto",
                                        mb: 2,
                                    }}
                                >
                                    <ImageIcon
                                        sx={{
                                            fontSize: 40,
                                            color: theme.palette.primary.main,
                                        }}
                                    />
                                </Avatar>

                                <Typography fontWeight={600}>Drop logo here</Typography>
                                <Typography fontSize={13} color="text.secondary">
                                    JPG, PNG, PDF
                                </Typography>

                                {formData.logoFile && (
                                    <Typography
                                        mt={2}
                                        color={theme.palette.success.main}
                                    >
                                        ✓ {formData.logoFile.name}
                                    </Typography>
                                )}
                            </label>
                        </Paper>
                    </Box>
                );

            case 3:
                return (
                    <Box>
                        <Box textAlign="center" mb={4}>
                            <Typography variant="h4" fontWeight="bold">
                                Describe Your Vision
                            </Typography>
                            <Typography color="text.secondary">
                                Colors, style, features
                            </Typography>
                        </Box>

                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            name="description"
                            label="Design Details"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </Box>
                );

            case 4:
                return (
                    <Box>
                        <Box textAlign="center" mb={4}>
                            <Typography variant="h4" fontWeight="bold">
                                Contact Information
                            </Typography>
                            <Typography color="text.secondary">
                                We’ll contact you for updates
                            </Typography>
                        </Box>

                        <Grid container spacing={3}>
                            {[
                                { label: "Brand Name", name: "brandName" },
                                { label: "Email", name: "email" },
                                { label: "Phone", name: "phone" },
                                { label: "Social Media", name: "socialMedia" },
                            ].map((field) => (
                                <Grid item xs={12} md={6} key={field.name}>
                                    <TextField
                                        fullWidth
                                        label={field.label}
                                        name={field.name}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                );

            case 5:
                return (
                    <Box>
                        <Box textAlign="center" mb={4}>
                            <Typography variant="h4" fontWeight="bold">
                                Review Your Details
                            </Typography>
                            <Typography color="text.secondary">
                                Confirm everything
                            </Typography>
                        </Box>

                        <Grid container spacing={2}>
                            {Object.entries(formData).map(([key, value]) => (
                                <Grid item xs={12} md={6} key={key}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            border: `1px solid ${theme.palette.divider}`,
                                            borderRadius: 2,
                                        }}
                                    >
                                        <Typography fontWeight={600}>
                                            {key}
                                        </Typography>
                                        <Typography>
                                            {value?.name || value || "—"}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                );

            case 6:
                return (
                    <Box textAlign="center">
                        <Avatar
                            sx={{
                                bgcolor: theme.palette.success.light,
                                width: 100,
                                height: 100,
                                mx: "auto",
                                mb: 3,
                            }}
                        >
                            <CheckCircleIcon
                                sx={{
                                    fontSize: 60,
                                    color: theme.palette.success.main,
                                }}
                            />
                        </Avatar>

                        <Typography variant="h4" fontWeight="bold">
                            Checkout 🎉
                        </Typography>

                        <Button
                            variant="contained"
                            size="large"
                            sx={{ mt: 4 }}
                            onClick={() => navigate("/checkout")}
                        >
                            Go to Checkout
                        </Button>
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", py: 4, px: 2 }}>
            <Box maxWidth={900} mx="auto">

                {/* ===== TRACKER WITH LINE ===== */}
                <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
                    <Box position="relative" display="flex" alignItems="center">
                        <Box
                            sx={{
                                position: "absolute",
                                top: 30,
                                left: 0,
                                right: 0,
                                height: 2,
                                bgcolor: theme.palette.divider,
                            }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                top: 30,
                                left: 0,
                                height: 2,
                                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                                bgcolor: theme.palette.primary.main,
                                transition: "width .4s ease",
                            }}
                        />

                        {steps.map((step) => {
                            const active = currentStep === step.id;
                            const done = currentStep > step.id;

                            return (
                                <Box key={step.id} flex={1} textAlign="center" zIndex={1}>
                                    <Avatar
                                        sx={{
                                            mx: "auto",
                                            mb: 1,
                                            bgcolor: done
                                                ? theme.palette.success.main
                                                : active
                                                    ? theme.palette.primary.main
                                                    : theme.palette.grey[300],
                                            color: "#fff",
                                        }}
                                    >
                                        {done ? <CheckCircleIcon /> : step.icon}
                                    </Avatar>
                                    <Typography
                                        fontSize={11}
                                        fontWeight={active ? 700 : 400}
                                    >
                                        {step.title}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                </Paper>

                {/* ===== CONTENT ===== */}
                <Paper elevation={0} sx={{ p: { xs: 3, md: 5 } }}>
                    {renderStepContent()}
                </Paper>

                {/* ===== NAV BUTTONS ===== */}
                {currentStep < 6 && (
                    <Box
                        mt={4}
                        display="flex"
                        gap={2}
                        flexDirection={{ xs: "column", md: "row" }}
                    >
                        <Button
                            variant="outlined"
                            onClick={handlePrev}
                            startIcon={<ChevronLeftIcon />}
                            sx={{
                                borderColor: theme.palette.primary.main,
                                color: theme.palette.primary.main,
                            }}
                        >
                            Prev
                        </Button>

                        <Button
                            variant="contained"
                            onClick={handleNext}
                            endIcon={<ChevronRightIcon />}
                        >
                            Next
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
