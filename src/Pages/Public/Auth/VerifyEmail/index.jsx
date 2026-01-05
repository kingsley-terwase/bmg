import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Link,
  CircularProgress
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AuthSlider } from "../../../../Component";
import {
  useVerifyLogin,
  useVerifyRegisteration,
  useVerifyForgotPwdOtp,
  useResendOTP
} from "../../../../Hooks/auth";
import { showToast } from "../../../../utils/toast";

import { useLocation, useNavigate } from "react-router-dom";
import { OTP_MODES } from "../../../../Config/auth/constants";

const VerifyEmailPage = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const { verifyLogin } = useVerifyLogin();
  const { verifyEmailOtp } = useVerifyRegisteration();
  const { verifyOtp } = useVerifyForgotPwdOtp();
  const { resendOTP } = useResendOTP();

  const {
    mode = OTP_MODES.VERIFY_EMAIL,
    email,
    otpMethod
  } = location.state || {};

  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    ""
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`code-input-${index + 1}`)?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      document.getElementById(`code-input-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newCode = pastedData.split("");
      setVerificationCode([...newCode, ...Array(6 - newCode.length).fill("")]);
    }
  };

  const handleVerify = async () => {
    const otp = verificationCode.join("");

    setIsSubmitting(true);
    if (otp.length !== 6) {
      return showToast.error("Invalid OTP, Please enter a 6-digit OTP.");
    }
    try {
      if (mode === OTP_MODES.LOGIN) {
        await verifyLogin({
          email: email,
          otp: otp,
          otp_type: "login"
        });
      } else if (mode === OTP_MODES.FORGOT_PASSWORD) {
        const success = await verifyOtp(otp, email);
        if (success) {
          setIsSubmitting(false);
          navigate({
            pathname: "/(auth)/reset-password",
            state: { otp, email }
          });
        }
      } else if (mode === OTP_MODES.VERIFY_EMAIL) {
        await verifyEmailOtp({
          email: email,
          otp: otp,
          otp_type: "registration"
        });
      }
    } catch (error) {
      showToast.error(error || "OTP Verification Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setVerificationCode(["", "", "", "", "", ""]);
    setIsResending(true);
    try {
      if (mode === OTP_MODES.VERIFY_EMAIL) {
        await resendOTP(otpMethod, email);
      } else if (mode === OTP_MODES.FORGOT_PASSWORD) {
        await resendOTP(otpMethod, email);
      } else if (mode === OTP_MODES.LOGIN) {
        await resendOTP(otpMethod, email);
      }

      setCountdown(60);
    } catch (error) {
      showToast.show(error || "OTP Resend Failed");
    }
    setIsResending(false);
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
          <Box sx={{ maxWidth: 450, width: "100%", textAlign: "center" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: { xs: "1.5rem", md: "1.75rem" },
                color: theme.palette.text.heading
              }}
            >
              Verify Email Address
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mb: 4,
                color: theme.palette.text.secondary,
                fontSize: "0.95rem",
                lineHeight: 1.6
              }}
            >
              We've sent a verification code to you. Please enter the 6-digit
              code below to verify your account.
            </Typography>

            {/* Verification Code Input */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: { xs: 1, sm: 2 },
                mb: 3
              }}
            >
              {verificationCode.map((digit, index) => (
                <Box
                  key={index}
                  component="input"
                  id={`code-input-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  sx={{
                    width: { xs: "45px", sm: "55px" },
                    height: { xs: "45px", sm: "55px" },
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    fontWeight: 600,
                    textAlign: "center",
                    border: `2px solid ${
                      digit ? theme.palette.primary.main : theme.palette.divider
                    }`,
                    borderRadius: 2,
                    outline: "none",
                    transition: "all 0.2s ease",
                    backgroundColor: "transparent",
                    color: theme.palette.text.primary,
                    "&:focus": {
                      borderColor: theme.palette.primary.main,
                      boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`
                    },
                    "&::placeholder": {
                      color: theme.palette.text.disabled
                    }
                  }}
                />
              ))}
            </Box>

            {/* Timer or Resend */}
            <Typography
              variant="body2"
              sx={{
                mb: 4,
                color: theme.palette.text.secondary,
                fontSize: "0.875rem"
              }}
            >
              Didn't receive the code?{" "}
              <Link
                component="button"
                onClick={handleResendOTP}
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" }
                }}
              >
                {isResending ? (
                  <CircularProgress size={20} color={"#ed6c02"} />
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      color: countdown > 0 ? "gray" : "#2C3891",
                      fontSize: "0.875rem",
                      fontWeight: 600
                    }}
                  >
                    {countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"}
                  </Typography>
                )}
              </Link>
            </Typography>

            {/* Verify Button */}
            <Button
              onClick={handleVerify}
              fullWidth
              variant="contained"
              disabled={
                verificationCode.some((digit) => !digit) || isSubmitting
              }
              sx={{
                py: 1.5,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 2,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.primary.bg
                },
                "&:disabled": {
                  backgroundColor: theme.palette.action.disabledBackground,
                  color: theme.palette.action.disabled
                }
              }}
            >
              VERIFY EMAIL
            </Button>

            {/* Back to Login */}
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                mt: 3,
                color: theme.palette.text.secondary
              }}
            >
              Remember your password?{" "}
              <Link
                href="/login"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" }
                }}
              >
                Back to Login
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VerifyEmailPage;
