/* eslint-disable react-hooks/purity */
import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    TextField,
    Paper,
    Grid,
    Avatar,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Chip,
} from "@mui/material";
import {
    TextFields as TextFieldsIcon,
    CheckBox as CheckBoxIcon,
    RadioButtonChecked as RadioButtonCheckedIcon,
    ArrowDropDownCircle as ArrowDropDownCircleIcon,
    AttachFile as AttachFileIcon,
    CheckCircle as CheckCircleIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { calculateServicePrice } from "../../Hooks/services";

// Price calculation utility
const formatGHS = (amount) => {
    return `GHS ${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Icon mapping for input types
const getInputIcon = (inputType) => {
    const iconMap = {
        text: <TextFieldsIcon />,
        checkbox: <CheckBoxIcon />,
        radio: <RadioButtonCheckedIcon />,
        select: <ArrowDropDownCircleIcon />,
        file: <AttachFileIcon />,
    };
    return iconMap[inputType] || <TextFieldsIcon />;
};

export default function OrderTracker({ service, service_type_id }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    // Ensure service is provided
    if (!service) {
        return (
            <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h5" color="error">
                    No service data provided
                </Typography>
            </Box>
        );
    }

    // Find the selected service type index
    const serviceTypeIndex = service.service_types?.findIndex(st => st.id === service_type_id) ?? 0;
    const priceData = calculateServicePrice(service, serviceTypeIndex >= 0 ? serviceTypeIndex : 0);

    // Generate steps from requirements + review step
    const steps = [
        ...service.requirements.map((req, idx) => ({
            id: idx + 1,
            title: req.requirement.name,
            icon: getInputIcon(req.requirement.input_type),
            inputType: req.requirement.input_type,
            required: req.required,
            min: req.min,
            max: req.max,
            options: req.requirement.options || [],
        })),
        {
            id: service.requirements.length + 1,
            title: "Review & Checkout",
            icon: <ShoppingCartIcon />,
            inputType: "review",
        }
    ];

    const handleNext = () => {
        if (validateCurrentStep()) {
            currentStep < steps.length && setCurrentStep((s) => s + 1);
        }
    };

    const handlePrev = () => {
        currentStep > 1 && setCurrentStep((s) => s - 1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleCheckboxChange = (name, value) => {
        const currentValues = formData[name] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];

        setFormData({ ...formData, [name]: newValues });
        setErrors({ ...errors, [name]: "" });
    };

    const validateCurrentStep = () => {
        const step = steps[currentStep - 1];
        if (step.inputType === "review") return true;

        const value = formData[step.title];
        const newErrors = {};

        if (step.required && (!value || (Array.isArray(value) && value.length === 0))) {
            newErrors[step.title] = "This field is required";
        }

        if (step.min && value && value.length < step.min) {
            newErrors[step.title] = `Minimum ${step.min} characters required`;
        }

        if (step.max && value && value.length > step.max) {
            newErrors[step.title] = `Maximum ${step.max} characters allowed`;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddToCart = () => {
        // Create cart item with service and form data
        const cartItem = {
            id: `${service.id}-${priceData.serviceType.id}-${Date.now()}`,
            service_id: service.id,
            service_type_id: priceData.serviceType.id,
            name: service.service_name,
            service_type_name: priceData.serviceType.service_type_name,
            description: priceData.serviceType.description,
            image: priceData.serviceType.service_type_image,
            originalPrice: priceData.originalPrice,
            finalPrice: priceData.finalPrice,
            discountAmount: priceData.discountAmount,
            hasDiscount: priceData.hasDiscount,
            quantity: 1,
            requirements: formData,
            service_data: service,
        };

        // Dispatch to Redux
        dispatch(addToCart(cartItem));

        // Show success toast
        toast.success(`${service.service_name} added to cart!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        // Navigate to checkout page
        navigate('/checkout');
    };

    const renderStepContent = () => {
        const step = steps[currentStep - 1];

        if (step.inputType === "review") {
            return (
                <Box>
                    <Box textAlign="center" mb={4}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Review Your Information
                        </Typography>
                        <Typography color="text.secondary">
                            Please confirm all details before adding to cart
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        {steps.slice(0, -1).map((reviewStep, idx) => (
                            <Grid item xs={12} md={6} key={idx}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        border: "1px solid",
                                        borderColor: "divider",
                                        borderRadius: 2,
                                        height: "100%",
                                    }}
                                >
                                    <Box display="flex" alignItems="center" mb={1.5}>
                                        <Avatar
                                            sx={{
                                                bgcolor: "primary.light",
                                                width: 32,
                                                height: 32,
                                                mr: 1.5,
                                            }}
                                        >
                                            {React.cloneElement(reviewStep.icon, {
                                                sx: { fontSize: 18, color: "primary.main" }
                                            })}
                                        </Avatar>
                                        <Typography fontWeight={600} color="text.secondary" fontSize={13}>
                                            {reviewStep.title}
                                            {reviewStep.required && (
                                                <Chip
                                                    label="Required"
                                                    size="small"
                                                    sx={{ ml: 1, height: 18, fontSize: 10 }}
                                                    color="primary"
                                                />
                                            )}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body1" fontWeight={500}>
                                        {Array.isArray(formData[reviewStep.title])
                                            ? formData[reviewStep.title].length > 0
                                                ? formData[reviewStep.title].join(", ")
                                                : "—"
                                            : formData[reviewStep.title] || "—"}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Price Display */}
                    {priceData.finalPrice > 0 && (
                        <Box mt={4} textAlign="center">
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    border: "2px solid",
                                    borderColor: "primary.main",
                                    borderRadius: 2,
                                    display: "inline-block",
                                }}
                            >
                                {priceData.hasDiscount && (
                                    <Box mb={1}>
                                        <Typography
                                            variant="body2"
                                            sx={{ textDecoration: "line-through", color: "text.disabled" }}
                                        >
                                            {formatGHS(priceData.originalPrice)}
                                        </Typography>
                                        <Chip
                                            label={priceData.discountLabel}
                                            size="small"
                                            color="error"
                                            sx={{ mt: 0.5 }}
                                        />
                                    </Box>
                                )}
                                <Typography variant="h5" fontWeight="bold" color="primary">
                                    Total: {formatGHS(priceData.finalPrice)}
                                </Typography>
                            </Paper>
                        </Box>
                    )}

                    <Box mt={4} textAlign="center">
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<ShoppingCartIcon />}
                            onClick={handleAddToCart}
                            sx={{
                                px: 5,
                                py: 1.5,
                                fontSize: 16,
                                textTransform: "none",
                                fontWeight: 600,
                            }}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </Box>
            );
        }

        return (
            <Box>
                <Box textAlign="center" mb={4}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {step.title}
                        {step.required && (
                            <Chip
                                label="Required"
                                size="small"
                                sx={{ ml: 2 }}
                                color="error"
                            />
                        )}
                    </Typography>
                    <Typography color="text.secondary">
                        Step {currentStep} of {steps.length}
                    </Typography>
                </Box>

                {step.inputType === "text" && (
                    <TextField
                        fullWidth
                        name={step.title}
                        label={step.title}
                        value={formData[step.title] || ""}
                        onChange={handleInputChange}
                        error={!!errors[step.title]}
                        helperText={
                            errors[step.title] ||
                            (step.min && step.max
                                ? `${step.min}-${step.max} characters`
                                : step.min
                                    ? `Minimum ${step.min} characters`
                                    : step.max
                                        ? `Maximum ${step.max} characters`
                                        : "")
                        }
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                fontSize: 16,
                            }
                        }}
                    />
                )}

                {step.inputType === "checkbox" && (
                    <Box>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                border: "1px solid",
                                borderColor: errors[step.title] ? "error.main" : "divider",
                                borderRadius: 2,
                            }}
                        >
                            <FormGroup>
                                <Grid container spacing={2}>
                                    {step.options.map((option) => (
                                        <Grid item xs={12} sm={6} key={option}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={(formData[step.title] || []).includes(option)}
                                                        onChange={() => handleCheckboxChange(step.title, option)}
                                                    />
                                                }
                                                label={option}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </FormGroup>
                        </Paper>
                        {errors[step.title] && (
                            <Typography color="error" fontSize={12} mt={1} ml={2}>
                                {errors[step.title]}
                            </Typography>
                        )}
                    </Box>
                )}

                {step.inputType === "radio" && (
                    <Box>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                border: "1px solid",
                                borderColor: errors[step.title] ? "error.main" : "divider",
                                borderRadius: 2,
                            }}
                        >
                            <FormGroup>
                                <Grid container spacing={2}>
                                    {step.options.map((option) => (
                                        <Grid item xs={12} sm={6} key={option}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={formData[step.title] === option}
                                                        onChange={() => {
                                                            setFormData({ ...formData, [step.title]: option });
                                                            setErrors({ ...errors, [step.title]: "" });
                                                        }}
                                                    />
                                                }
                                                label={option}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </FormGroup>
                        </Paper>
                        {errors[step.title] && (
                            <Typography color="error" fontSize={12} mt={1} ml={2}>
                                {errors[step.title]}
                            </Typography>
                        )}
                    </Box>
                )}
            </Box>
        );
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f8f9fa", py: 5, px: 2 }}>
            <Box maxWidth={1000} mx="auto">
                {/* Service Header */}
                <Box textAlign="center" mb={4}>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        {service.service_name} Service
                    </Typography>
                    <Typography color="text.secondary" fontSize={18}>
                        {priceData.serviceType?.service_type_name || "Complete the form to get started with your order"}
                    </Typography>
                </Box>

                {/* Progress Tracker */}
                <Paper elevation={1} sx={{ p: { xs: 2, md: 3 }, mb: 4, borderRadius: 3 }}>
                    <Box position="relative" display="flex" alignItems="center">
                        {/* Background line */}
                        <Box
                            sx={{
                                position: "absolute",
                                top: 30,
                                left: { xs: "5%", md: "10%" },
                                right: { xs: "5%", md: "10%" },
                                height: 3,
                                bgcolor: "grey.200",
                                borderRadius: 2,
                            }}
                        />
                        {/* Progress line */}
                        <Box
                            sx={{
                                position: "absolute",
                                top: 30,
                                left: { xs: "5%", md: "10%" },
                                height: 3,
                                width: `${((currentStep - 1) / (steps.length - 1)) * (steps.length === 1 ? 0 : 80)}%`,
                                bgcolor: "primary.main",
                                transition: "width 0.4s ease",
                                borderRadius: 2,
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
                                            mb: 1.5,
                                            width: { xs: 50, md: 60 },
                                            height: { xs: 50, md: 60 },
                                            bgcolor: done
                                                ? "success.main"
                                                : active
                                                    ? "primary.main"
                                                    : "grey.300",
                                            color: "#fff",
                                            transition: "all 0.3s ease",
                                            boxShadow: active ? 3 : 0,
                                        }}
                                    >
                                        {done ? (
                                            <CheckCircleIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
                                        ) : (
                                            React.cloneElement(step.icon, {
                                                sx: { fontSize: { xs: 24, md: 28 } }
                                            })
                                        )}
                                    </Avatar>
                                    <Typography
                                        fontSize={{ xs: 10, md: 12 }}
                                        fontWeight={active ? 700 : 500}
                                        color={active ? "primary" : "text.secondary"}
                                        sx={{
                                            display: { xs: "none", sm: "block" },
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        {step.title}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                </Paper>

                {/* Content */}
                <Paper elevation={1} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, mb: 3 }}>
                    {renderStepContent()}
                </Paper>

                {/* Navigation Buttons */}
                {currentStep < steps.length && (
                    <Box
                        display="flex"
                        gap={2}
                        justifyContent="space-between"
                        flexDirection={{ xs: "column-reverse", sm: "row" }}
                    >
                        <Button
                            variant="outlined"
                            onClick={handlePrev}
                            disabled={currentStep === 1}
                            startIcon={<ChevronLeftIcon />}
                            sx={{
                                flex: 1,
                                py: 1.5,
                                fontSize: 15,
                                textTransform: "none",
                                fontWeight: 600,
                            }}
                        >
                            Previous
                        </Button>

                        <Button
                            variant="contained"
                            onClick={handleNext}
                            endIcon={<ChevronRightIcon />}
                            sx={{
                                flex: 1,
                                py: 1.5,
                                fontSize: 15,
                                textTransform: "none",
                                fontWeight: 600,
                            }}
                        >
                            {currentStep === steps.length - 1 ? "Review Order" : "Continue"}
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
}