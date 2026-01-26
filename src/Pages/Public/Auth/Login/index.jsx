import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Eye24Regular, EyeOff24Regular } from "@fluentui/react-icons";
import { AuthSlider, OtpModal } from "../../../../Component";
import { useLogin } from "../../../../Hooks/auth";
import { showToast } from "../../../../utils/toast";
import { OTP_MODES } from "../../../../Config/auth/constants";
import { signInWithGooglePopup } from "../../../../utils/googleAuth";
import { useGoogleAuthLogin } from "../../../../Hooks/google_auth";
import { useLoader } from "../../../../Contexts/LoaderContext";
import { useUserContext } from "../../../../Contexts";

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const loginUser = useLogin();
  const googleLogin = useGoogleAuthLogin();
  const { hideLoader, showLoader } = useLoader();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [googleBtnLoading, setGoogleBtnLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const { user } = useUserContext();

  useEffect(() => {
    if (user?.user) {
      navigate('/dashboard');
    }
  }, [user, navigate])

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setFormData({
      ...formData,
      [field]: value,
    });

    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const handleBlur = (field) => () => {
    setTouched({
      ...touched,
      [field]: true,
    });
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    let error = "";

    switch (field) {
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          error = "Email is required";
        } else if (!emailRegex.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      }

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));

    return error;
  };

  const validateForm = () => {
    const fields = ["email", "password"];
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

  const handleGoogleSignIn = async () => {
    try {
      setGoogleBtnLoading(true);
      showLoader();
      const googleAccessToken = await signInWithGooglePopup();

      await googleLogin(googleAccessToken);
    } catch (error) {
      console.error("Google sign-in error:", error);
    } finally {
      setGoogleBtnLoading(false);
      hideLoader();
    }
  };

  const handleOtpMethodSelect = async (otpMethod) => {
    setIsSubmitting(true);
    setShowOtpModal(false);
    showLoader();

    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
        verify_method: otpMethod
      });

      if (response) {
        showToast.success(
          `✓ OTP sent to your ${otpMethod}! Please check your ${otpMethod === "email" ? "inbox" : "messages"
          }.`
        );
        navigate("/verify-email", {
          state: {
            email: formData.email,
            otpMethod: "login",
            mode: OTP_MODES.LOGIN
          }
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        submit: error.message || "Login failed. Please check your credentials."
      });
    } finally {
      setIsSubmitting(false);
      hideLoader();
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
        {/* Left Side - Auth Slider */}
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

        {/* Right Side - Login Form */}
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

            {/* Google Sign In */}
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
                  : "Sign In with Google"}
              </Button>
            </Box>

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Typography
                variant="body2"
                sx={{
                  mb: 0.5,
                  fontWeight: 600,
                  color: theme.palette.text.heading
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
              <Typography
                variant="body2"
                sx={{
                  mb: 0.5,
                  fontWeight: 600,
                  color: theme.palette.text.heading
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
                        {showPassword ? <EyeOff24Regular /> : <Eye24Regular />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.rememberMe}
                      onChange={handleChange("rememberMe")}
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
                      Remember me
                    </Typography>
                  }
                />

                <Link
                  href="/forgot-password"
                  sx={{
                    fontSize: ".875rem",
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" }
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>
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
                  color: theme.palette.primary.contrastText,
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark
                  },
                  "&:disabled": {
                    bgcolor: theme.palette.action.disabledBackground
                  }
                }}
              >
                {isSubmitting ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={20} color="inherit" />
                    <span>Signing In...</span>
                  </Box>
                ) : (
                  "SIGN IN"
                )}
              </Button>
            </Box>

            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                mt: 3,
                color: theme.palette.text.secondary
              }}
            >
              Don't have an Account?{" "}
              <Link
                href="/register"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" }
                }}
              >
                Create One
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <OtpModal
        open={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        formData={formData}
        onMethodSelect={handleOtpMethodSelect}
      />
    </Box>
  );
};

export default LoginPage;
