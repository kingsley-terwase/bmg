import React, { useState } from "react";
import {
  Grid,
  Box,
  Input,
  Stack,
  Switch,
  TextField,
  Typography,
  Chip,
  IconButton,
  FormControl,
  MenuItem,
  Select,
  InputAdornment,
  Divider
} from "@mui/material";
import {
  AddOutlined,
  DeleteOutlined,
  VisibilityOutlined,
  ArrowBackOutlined,
  CloseOutlined,
  AttachMoneyOutlined
} from "@mui/icons-material";
import { CustomButton, InputLabel, PagesHeader } from "../../../Component";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../utils/toast";

const AddSubscriptionPage = () => {
  const [planName, setPlanName] = useState("");
  const [planSlug, setPlanSlug] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("monthly");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [features, setFeatures] = useState([]);
  const [currentFeature, setCurrentFeature] = useState("");
  const [maxUsers, setMaxUsers] = useState("");
  const [maxProjects, setMaxProjects] = useState("");
  const [support, setSupport] = useState("email");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddFeature = () => {
    if (currentFeature.trim()) {
      setFeatures([...features, currentFeature.trim()]);
      setCurrentFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (
      !planName.trim() ||
      !price ||
      !description.trim() ||
      features.length === 0
    ) {
      showToast.warning(
        "Please fill in all required fields and add at least one feature"
      );
      return;
    }

    setLoading(true);

    const formData = {
      planName,
      planSlug,
      price: parseFloat(price),
      duration,
      description,
      isActive,
      isFeatured,
      features,
      maxUsers: maxUsers ? parseInt(maxUsers) : null,
      maxProjects: maxProjects ? parseInt(maxProjects) : null,
      support
    };

    // Simulate API call
    setTimeout(() => {
      console.log("Subscription plan data:", formData);
      showToast.success("Subscription plan added successfully!");
      setLoading(false);

      // Reset form
      setPlanName("");
      setPlanSlug("");
      setPrice("");
      setDuration("monthly");
      setDescription("");
      setFeatures([]);
      setMaxUsers("");
      setMaxProjects("");
      setSupport("email");
    }, 1500);
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <PagesHeader
        label="Add Subscription Plan"
        desc="Create new subscription plans with pricing, features, and benefits"
        searchEnabled={false}
        actions={[
          {
            label: "View Subscription Plan",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/add/sub-plans")
          },
          {
            label: "Add Category",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/categories")
          },
          {
            label: "Add Service",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/services")
          }
        ]}
      />

      <Box sx={{ bgcolor: "white", borderRadius: 2, p: 4 }}>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Basic Information
            </Typography>
            <Divider />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel text="Plan Name *" />
            <Input
              disableUnderline
              fullWidth
              placeholder="e.g., Premium Plan, Business Plan"
              value={planName}
              onChange={(e) => {
                setPlanName(e.target.value);
                setPlanSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
              }}
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                px: 2,
                py: 1.5,
                fontSize: "14px"
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel text="Plan Slug" />
            <Input
              disableUnderline
              fullWidth
              placeholder="premium-plan"
              value={planSlug}
              onChange={(e) => setPlanSlug(e.target.value)}
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                px: 2,
                py: 1.5,
                fontSize: "14px",
                bgcolor: "#f9f9f9"
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel text="Price *" />
            <Input
              disableUnderline
              fullWidth
              type="number"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <AttachMoneyOutlined sx={{ fontSize: 20, color: "#666" }} />
                </InputAdornment>
              }
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                px: 2,
                py: 1.5,
                fontSize: "14px"
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel text="Billing Duration" />
            <FormControl fullWidth>
              <Select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #e0e0e0"
                  }
                }}
              >
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="quarterly">Quarterly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
                <MenuItem value="lifetime">Lifetime</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <InputLabel text="Description *" />
            <TextField
              multiline
              rows={4}
              fullWidth
              placeholder="Describe what this plan offers..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#e0e0e0"
                  }
                }
              }}
            />
          </Grid>

          {/* Features Section */}
          <Grid size={{ xs: 12 }} mt={2}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Plan Features
            </Typography>
            <Divider />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <InputLabel text="Add Features *" />
            <Stack direction="row" spacing={2}>
              <Input
                disableUnderline
                fullWidth
                placeholder="e.g., Unlimited storage, 24/7 support"
                value={currentFeature}
                onChange={(e) => setCurrentFeature(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddFeature()}
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  px: 2,
                  py: 1.5,
                  fontSize: "14px"
                }}
              />
              <IconButton
                onClick={handleAddFeature}
                sx={{
                  bgcolor: "#1976d2",
                  color: "white",
                  "&:hover": { bgcolor: "#1565c0" }
                }}
              >
                <AddOutlined />
              </IconButton>
            </Stack>

            {features.length > 0 && (
              <Box mt={2}>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {features.map((feature, index) => (
                    <Chip
                      key={index}
                      label={feature}
                      onDelete={() => handleRemoveFeature(index)}
                      deleteIcon={<CloseOutlined />}
                      sx={{ bgcolor: "#e3f2fd" }}
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </Grid>

          {/* Limits Section */}
          <Grid size={{ xs: 12 }} mt={2}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Usage Limits
            </Typography>
            <Divider />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <InputLabel text="Max Users" />
            <Input
              disableUnderline
              fullWidth
              type="number"
              placeholder="Unlimited if empty"
              value={maxUsers}
              onChange={(e) => setMaxUsers(e.target.value)}
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                px: 2,
                py: 1.5,
                fontSize: "14px"
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <InputLabel text="Max Projects" />
            <Input
              disableUnderline
              fullWidth
              type="number"
              placeholder="Unlimited if empty"
              value={maxProjects}
              onChange={(e) => setMaxProjects(e.target.value)}
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                px: 2,
                py: 1.5,
                fontSize: "14px"
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <InputLabel text="Support Level" />
            <FormControl fullWidth>
              <Select
                value={support}
                onChange={(e) => setSupport(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #e0e0e0"
                  }
                }}
              >
                <MenuItem value="none">No Support</MenuItem>
                <MenuItem value="email">Email Support</MenuItem>
                <MenuItem value="priority">Priority Support</MenuItem>
                <MenuItem value="dedicated">Dedicated Support</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Status Section */}
          <Grid size={{ xs: 12 }} mt={2}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Plan Status
            </Typography>
            <Divider />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 3 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Active Status
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Make this plan available for subscription
                  </Typography>
                </Box>
                <Switch
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  color="success"
                />
              </Stack>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 3 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Featured Plan
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Highlight this plan as recommended
                  </Typography>
                </Box>
                <Switch
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  color="warning"
                />
              </Stack>
            </Box>
          </Grid>

          {/* Action Buttons */}
          <Grid size={{ xs: 12 }} mt={3}>
            <Stack direction="row" justifyContent="space-between">
              <CustomButton
                title="Back"
                color="inherit"
                variant="outlined"
                startIcon={<ArrowBackOutlined />}
                onClick={() => console.log("Go back")}
              />

              <Stack direction="row" gap={2}>
                <CustomButton
                  title="Reset"
                  color="danger"
                  variant="outlined"
                  startIcon={<DeleteOutlined />}
                  onClick={() => {
                    setPlanName("");
                    setPrice("");
                    setDescription("");
                    setFeatures([]);
                  }}
                />
                <CustomButton
                  title={loading ? "Submitting..." : "Create Plan"}
                  variant="filled"
                  disabled={loading}
                  onClick={handleSubmit}
                />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddSubscriptionPage;
