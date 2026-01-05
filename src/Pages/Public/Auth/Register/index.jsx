import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Alert,
  CircularProgress
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Eye24Regular, EyeOff24Regular } from "@fluentui/react-icons";
import { AuthSlider, OtpModal } from "../../../../Component";
import { useRegister } from "../../../../Hooks/auth";
import { signInWithGooglePopup } from "../../../../utils/googleAuth";
import { useGoogleAuthRegister } from "../../../../Hooks/google_auth";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../../utils/toast";
import { OTP_MODES } from "../../../../Config/auth/constants";
import { useLoader } from "../../../../Contexts/LoaderContext";

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [googleBtnLoading, setGoogleBtnLoading] = useState(false);

  const registerUser = useRegister();
  const googleRegister = useGoogleAuthRegister();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setFormData({
      ...formData,
      [field]: value
    });

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ""
      });
    }
  };

  const handleBlur = (field) => () => {
    setTouched({
      ...touched,
      [field]: true
    });
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    let error = "";

    switch (field) {
      case "firstName":
        if (!value.trim()) {
          error = "First name is required";
        } else if (value.trim().length < 2) {
          error = "First name must be at least 2 characters";
        }
        break;

      case "lastName":
        if (!value.trim()) {
          error = "Last name is required";
        } else if (value.trim().length < 2) {
          error = "Last name must be at least 2 characters";
        }
        break;

      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          error = "Email is required";
        } else if (!emailRegex.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      }

      case "phone": {
        const phoneRegex = /^[\d\s\-\\+\\(\\)]{10,}$/;
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!phoneRegex.test(value)) {
          error = "Please enter a valid phone number (min 10 digits)";
        }
        break;
      }

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        } else if (!/(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/.test(value)) {
          error =
            "Password must contain letters and special characters (!@#$%^&*)";
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password";
        } else if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;

      case "acceptTerms":
        if (!value) {
          error = "You must accept the terms and conditions";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error
    }));

    return error;
  };

  const validateForm = () => {
    const fields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "password",
      "confirmPassword",
      "acceptTerms"
    ];
    const newErrors = {};
    let isValid = true;

    fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(fields.reduce((acc, field) => ({ ...acc, [field]: true }), {}));

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      setShowOtpModal(true);
    }
  };

  const handleOtpMethodSubmit = async (otpMethod) => {
    setIsSubmitting(true);
    setShowOtpModal(false);
    showLoader();

    try {
      const response = await registerUser({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        verify_method: otpMethod
      });

      if (response) {
        setShowOtpModal(false);
        showToast.success(`OTP sent to your ${otpMethod}!`);
        navigate("/verify-email", {
          state: {
            email: formData.email,
            otpMethod: "registration",
            mode: OTP_MODES.VERIFY_EMAIL
          }
        });
      }
    } catch (error) {
      setIsSubmitting(false);

      console.error("Registration error:", error);
      setErrors((prev) => ({
        ...prev,
        general: "Registration failed. Please try again."
      }));
    } finally {
      setIsSubmitting(false);
      hideLoader();
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleBtnLoading(true);
      const googleAccessToken = await signInWithGooglePopup();

      await googleRegister(googleAccessToken);
    } catch (error) {
      console.error("Google sign-in error:", error);
    } finally {
      setGoogleBtnLoading(false);
    }
  };

  const inputBaseStyles = {
    mb: 2.5,
    backgroundColor: "transparent !important",
    "& .MuiInputBase-root": {
      backgroundColor: "transparent !important",
      borderRadius: 0,
      color: theme.palette.text.primary
    },
    "& input": {
      backgroundColor: "transparent !important",
      color: theme.palette.text.primary
    }
  };

  const getFieldError = (field) => {
    return touched[field] && errors[field];
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        display: "flex",
        overflow: "hidden"
      }}
    >
      <Grid
        container
        sx={{
          minHeight: "100vh",
          margin: 0,
          width: "100%"
        }}
      >
        <Grid
          size={{ xs: 12, md: 7 }}
          sx={{
            bgcolor: theme.palette.primary.light,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: { xs: 4, md: 7 }
          }}
        >
          <AuthSlider />
        </Grid>

        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            px: { xs: 4, md: 6 },
            bgcolor: theme.palette.background.default
          }}
        >
          <Box sx={{ maxWidth: 450, width: "100%" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 2,
                textAlign: "center",
                fontSize: { xs: "1.25rem", md: "1rem" },
                color: theme.palette.text.heading
              }}
            >
              Connect with other Creatives
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="outlined"
                onClick={handleGoogleSignIn}
                disabled={googleBtnLoading}
                sx={{
                  mb: 3,
                  py: 1,
                  borderColor: theme.palette.divider,
                  color: theme.palette.text.primary,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  "&:hover": {
                    borderColor: theme.palette.divider,
                    background: theme.palette.background.paper
                  }
                }}
                startIcon={
                  !googleBtnLoading && (
                    <svg width="18" height="18" viewBox="0 0 18 18">
                      <path
                        fill="#4285F4"
                        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                      />
                      <path
                        fill="#34A853"
                        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"
                      />
                      <path
                        fill="#EA4335"
                        d="M9 3.582c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.29C4.672 5.163 6.656 3.582 9 3.582z"
                      />
                    </svg>
                  )
                }
              >
                {googleBtnLoading
                  ? "Connecting to Google..."
                  : "Sign Up with Google"}
              </Button>
            </Box>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} mt={5}>
                <Grid size={{ xs: 6 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 0.5,
                      fontWeight: 600,
                      color: theme.palette.text.primary
                    }}
                  >
                    First Name *
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    value={formData.firstName}
                    onChange={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    error={!!getFieldError("firstName")}
                    helperText={getFieldError("firstName")}
                    sx={inputBaseStyles}
                  />
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 0.5,
                      fontWeight: 600,
                      color: theme.palette.text.primary
                    }}
                  >
                    Last Name *
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    value={formData.lastName}
                    onChange={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    error={!!getFieldError("lastName")}
                    helperText={getFieldError("lastName")}
                    sx={inputBaseStyles}
                  />
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 0.5,
                      fontWeight: 600,
                      color: theme.palette.text.primary
                    }}
                  >
                    Email *
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    type="email"
                    value={formData.email}
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    error={!!getFieldError("email")}
                    helperText={getFieldError("email")}
                    sx={inputBaseStyles}
                  />
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 0.5,
                      fontWeight: 600,
                      color: theme.palette.text.primary
                    }}
                  >
                    Phone Number *
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    error={!!getFieldError("phone")}
                    helperText={getFieldError("phone")}
                    sx={inputBaseStyles}
                  />
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 0.5,
                      fontWeight: 600,
                      color: theme.palette.text.primary
                    }}
                  >
                    Password *
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                    error={!!getFieldError("password")}
                    helperText={getFieldError("password")}
                    sx={inputBaseStyles}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ? (
                              <EyeOff24Regular />
                            ) : (
                              <Eye24Regular />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 0.5,
                      fontWeight: 600,
                      color: theme.palette.text.primary
                    }}
                  >
                    Confirm Password *
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    error={!!getFieldError("confirmPassword")}
                    helperText={getFieldError("confirmPassword")}
                    sx={inputBaseStyles}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleToggleConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <EyeOff24Regular />
                            ) : (
                              <Eye24Regular />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.acceptTerms}
                    onChange={handleChange("acceptTerms")}
                    onBlur={handleBlur("acceptTerms")}
                    size="small"
                    sx={{
                      color: theme.palette.primary.main,
                      "&.Mui-checked": {
                        color: theme.palette.primary.main
                      }
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: ".875rem",
                      color: theme.palette.text.primary
                    }}
                  >
                    I agree to the{" "}
                    <Link
                      href="#"
                      sx={{
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" }
                      }}
                    >
                      terms & conditions
                    </Link>
                  </Typography>
                }
                sx={{ mb: 2 }}
              />

              {getFieldError("acceptTerms") && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {getFieldError("acceptTerms")}
                </Alert>
              )}

              {errors.general && (
                <ThemedText style={{ color: "red", marginTop: 5 }}>
                  {errors.general}
                </ThemedText>
              )}

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderRadius: 2,
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark
                  }
                }}
              >
                {isSubmitting ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={20} color={"#2C3891"} />
                    <span>Creating Account...</span>
                  </Box>
                ) : (
                  "CREATE ACCOUNT"
                )}
              </Button>
            </form>

            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                mt: 3,
                color: theme.palette.text.secondary
              }}
            >
              Own an Account?{" "}
              <Link
                href="/login"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" }
                }}
              >
                Jump right in
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <OtpModal
        open={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        formData={formData}
        onMethodSelect={handleOtpMethodSubmit}
      />
    </Box>
  );
};

export default LoginPage;
