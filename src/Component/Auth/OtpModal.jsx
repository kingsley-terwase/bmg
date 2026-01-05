import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  IconButton
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const OtpModal = ({ open, onClose, formData, onMethodSelect }) => {
  const theme = useTheme();
  const [otpMethod, setOtpMethod] = useState("email");

  const handleConfirm = () => {
    onMethodSelect(otpMethod);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="otp-modal-title"
      aria-describedby="otp-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 450 },
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 4
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              bgcolor: theme.palette.primary.light,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              mb: 2
            }}
          >
            <CheckCircleOutlineIcon
              sx={{ fontSize: 32, color: theme.palette.primary.main }}
            />
          </Box>
          <Typography
            id="otp-modal-title"
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 1,
              color: theme.palette.text.primary
            }}
          >
            Verify Your Account
          </Typography>
          <Typography
            id="otp-modal-description"
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Choose how you'd like to receive your verification code
          </Typography>
        </Box>

        {/* OTP Method Selection */}
        <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
          <RadioGroup
            value={otpMethod}
            onChange={(e) => setOtpMethod(e.target.value)}
          >
            {/* Email Option */}
            <Box
              onClick={() => setOtpMethod("email")}
              sx={{
                border: `2px solid ${
                  otpMethod === "email"
                    ? theme.palette.primary.main
                    : theme.palette.divider
                }`,
                borderRadius: 2,
                p: 2,
                mb: 2,
                cursor: "pointer",
                transition: "all 0.2s",
                bgcolor:
                  otpMethod === "email"
                    ? theme.palette.primary.light + "20"
                    : "transparent",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  bgcolor: theme.palette.primary.light + "10"
                }
              }}
            >
              <FormControlLabel
                value="email"
                control={
                  <Radio
                    sx={{
                      color: theme.palette.primary.main,
                      "&.Mui-checked": {
                        color: theme.palette.primary.main
                      }
                    }}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EmailIcon sx={{ color: theme.palette.primary.main }} />
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.text.primary
                        }}
                      >
                        Email Verification
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        Send code to{" "}
                        <Box
                          component="span"
                          sx={{ fontWeight: 500, color: theme.palette.text.primary }}
                        >
                          {formData.email}
                        </Box>
                      </Typography>
                    </Box>
                  </Box>
                }
                sx={{ width: "100%", m: 0 }}
              />
            </Box>

            {/* SMS Option */}
            <Box
              onClick={() => setOtpMethod("sms")}
              sx={{
                border: `2px solid ${
                  otpMethod === "sms"
                    ? theme.palette.primary.main
                    : theme.palette.divider
                }`,
                borderRadius: 2,
                p: 2,
                cursor: "pointer",
                transition: "all 0.2s",
                bgcolor:
                  otpMethod === "sms"
                    ? theme.palette.primary.light + "20"
                    : "transparent",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  bgcolor: theme.palette.primary.light + "10"
                }
              }}
            >
              <FormControlLabel
                value="sms"
                control={
                  <Radio
                    sx={{
                      color: theme.palette.primary.main,
                      "&.Mui-checked": {
                        color: theme.palette.primary.main
                      }
                    }}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PhoneAndroidIcon
                      sx={{ color: theme.palette.success.main }}
                    />
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.text.primary
                        }}
                      >
                        SMS Verification
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        Send code to{" "}
                        <Box
                          component="span"
                          sx={{ fontWeight: 500, color: theme.palette.text.primary }}
                        >
                          {formData.phone}
                        </Box>
                      </Typography>
                    </Box>
                  </Box>
                }
                sx={{ width: "100%", m: 0 }}
              />
            </Box>
          </RadioGroup>
        </FormControl>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={onClose}
            sx={{
              py: 1.5,
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 600,
              borderColor: theme.palette.divider,
              color: theme.palette.text.primary,
              "&:hover": {
                borderColor: theme.palette.primary.main,
                bgcolor: theme.palette.primary.light + "10"
              }
            }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={handleConfirm}
            sx={{
              py: 1.5,
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 600,
              bgcolor: theme.palette.primary.main,
              "&:hover": {
                bgcolor: theme.palette.primary.dark
              }
            }}
          >
            Send  Code
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default OtpModal;