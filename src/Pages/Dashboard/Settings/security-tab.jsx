import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Divider,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff, Save } from "@mui/icons-material";
import { showToast } from "../../../utils/toast";

const SecurityTab = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const toggleVisibility = (field) => {
    setShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.currentPassword) {
      nextErrors.currentPassword = "Current password is required";
    }

    if (!form.newPassword) {
      nextErrors.newPassword = "New password is required";
    } else if (form.newPassword.length < 8) {
      nextErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your new password";
    } else if (form.newPassword !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      showToast.warning("Please fix the errors below.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        current_password: form.currentPassword,
        new_password: form.newPassword,
      };

      console.log("Submitting password change:", payload);

      // await updatePassword(payload);

      showToast.success("Password updated successfully");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      showToast.error(error?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" mb={3}>
          Password & Security
        </Typography>

        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Current Password"
            type={show.current ? "text" : "password"}
            value={form.currentPassword}
            onChange={handleChange("currentPassword")}
            error={Boolean(errors.currentPassword)}
            helperText={errors.currentPassword}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => toggleVisibility("current")}
                  edge="end"
                >
                  {show.current ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />

          <TextField
            fullWidth
            label="New Password"
            type={show.new ? "text" : "password"}
            value={form.newPassword}
            onChange={handleChange("newPassword")}
            error={Boolean(errors.newPassword)}
            helperText={errors.newPassword}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => toggleVisibility("new")} edge="end">
                  {show.new ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Confirm New Password"
            type={show.confirm ? "text" : "password"}
            value={form.confirmPassword}
            onChange={handleChange("confirmPassword")}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => toggleVisibility("confirm")}
                  edge="end"
                >
                  {show.confirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              startIcon={<Save />}
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SecurityTab;
