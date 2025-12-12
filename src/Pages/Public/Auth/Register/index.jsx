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
  Link
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Eye24Regular, EyeOff24Regular } from "@fluentui/react-icons";
import { AuthSlider } from "../../../../Component";

const LoginPage = () => {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Luper Terwase",
    email: "Terwasemmanuel15@gmail.com",
    password: "••••••••••••",
    acceptTerms: true
  });

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
    });
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
                }
              >
                Sign in with Google
              </Button>
            </Box>
            <Typography
              variant="body2"
              sx={{
                mb: 0.5,
                fontWeight: 700,
                color: theme.palette.text.heading
              }}
            >
              FullName
            </Typography>
            <TextField
              fullWidth
              variant="standard"
              value={formData.fullName}
              onChange={handleChange("fullname")}
              sx={inputBaseStyles}
            />
            <Typography
              variant="body2"
              sx={{
                mb: 0.5,
                fontWeight: 700,
                color: theme.palette.text.heading
              }}
            >
              Email
            </Typography>
            <TextField
              fullWidth
              variant="standard"
              value={formData.email}
              onChange={handleChange("email")}
              sx={inputBaseStyles}
            />

            <Typography
              variant="body2"
              sx={{
                mb: 0.5,
                fontWeight: 700,
                color: theme.palette.text.heading
              }}
            >
              Password
            </Typography>
            <TextField
              fullWidth
              variant="standard"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange("password")}
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

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.acceptTerms}
                  onChange={handleChange("acceptTerms")}
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
                  I agree to the terms & conditions
                </Typography>
              }
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              variant="contained"
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
                }
              }}
            >
              SIGN IN
            </Button>

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
    </Box>
  );
};

export default LoginPage;
