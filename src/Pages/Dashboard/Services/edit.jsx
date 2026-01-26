/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Input,
  Stack,
  Switch,
  Typography,
  Chip,
  IconButton,
  FormControl,
  MenuItem,
  Select,
  Collapse,
} from "@mui/material";
import {
  AddOutlined,

  VisibilityOutlined,
  ArrowBackOutlined,
  CloseOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import {
  InputLabel,
  CustomButton,
  PagesHeader,
} from "../../../Component";
import { styles } from "../../../styles/dashboard";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useUpdateService, useGetService } from "../../../Hooks/Dashboard/services";
import { useFetchCategories } from "../../../Hooks/Dashboard/categories";
import { useFetchSubCategories } from "../../../Hooks/Dashboard/sub_categories";
import { showToast } from "../../../utils/toast";
import { useLoader } from "../../../Contexts/LoaderContext";

const EditServicePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { hideLoader, showLoader } = useLoader();

  const [serviceName, setServiceName] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCatId, setSubCatId] = useState("");
  const [serviceStatus, setServiceStatus] = useState(true);
  const [attributes, setAttributes] = useState([]);
  const [currentAttribute, setCurrentFeature] = useState("");

  // requirements - updated structure
  const [requirements, setRequirements] = useState([]);
  const [currentRequirement, setCurrentRequirement] = useState({
    name: "",
    input_type: "",
    required: true,
    min: "",
    max: "",
    options: [],
    currentOption: "",
  });
  const [detailsOne, setDetailsOne] = useState("");
  const [detailsTwo, setDetailsTwo] = useState("");
  const [detailsThree, setDetailsThree] = useState("");

  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const { updateService } = useUpdateService();
  const { serviceData, getService } = useGetService();
  const { categories } = useFetchCategories();
  const { subCat } = useFetchSubCategories();

  // Load service data on mount
  useEffect(() => {
    if (id) {
      showLoader("Loading service data...");
      getService(id);
    } else if (location.state?.data) {
      // If data is passed via navigation state
      prefillFormData(location.state.data);
    }
  }, [id]);

  // Prefill form when service data is loaded
  useEffect(() => {
    if (serviceData && !dataLoaded) {
      prefillFormData(serviceData);
    }
  }, [serviceData, dataLoaded]);

  const prefillFormData = (data) => {
    setServiceName(data.service_name || "");
    setCategoryId(data.category_id || "");
    setSubCatId(data.subcategory_id || "");
    setServiceStatus(data.service_status ?? true);
    setAttributes(data.service_attributes || []);
    setRequirements(data.requirements || []);
    setDetailsOne(data.service_details_1 || "");
    setDetailsTwo(data.service_details_2 || "");
    setDetailsThree(data.service_details_3 || "");
    setServiceId(data.id || "");
    setDataLoaded(true);
    hideLoader();
  };

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (currentAttribute.trim()) {
      setAttributes([...attributes, currentAttribute.trim()]);
      setCurrentFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  // ===== REQUIREMENTS =====
  const needsOptions = (type) => {
    return type === "checkbox" || type === "radio";
  };

  const needsMinMax = (type) => {
    return type === "text" || type === "number";
  };

  const addOptionToCurrentRequirement = (e) => {
    if (e) e.preventDefault();

    if (!currentRequirement.currentOption.trim()) return;

    setCurrentRequirement({
      ...currentRequirement,
      options: [
        ...currentRequirement.options,
        currentRequirement.currentOption.trim(),
      ],
      currentOption: "",
    });
  };

  const removeOptionFromCurrentRequirement = (index) => {
    setCurrentRequirement({
      ...currentRequirement,
      options: currentRequirement.options.filter((_, i) => i !== index),
    });
  };

  const addRequirement = (e) => {
    if (e) e.preventDefault();

    if (!currentRequirement.name || !currentRequirement.input_type) {
      showToast.warning("Please fill in requirement name and input type");
      return;
    }

    // Validate options for checkbox/radio
    if (
      needsOptions(currentRequirement.input_type) &&
      currentRequirement.options.length === 0
    ) {
      showToast.warning(
        "Please add at least one option for checkbox/radio type",
      );
      return;
    }

    // Build the requirement object
    const newRequirement = {
      requirement: {
        name: currentRequirement.name,
        input_type: currentRequirement.input_type,
      },
      required: currentRequirement.required,
    };

    // Add options if checkbox or radio
    if (needsOptions(currentRequirement.input_type)) {
      newRequirement.requirement.options = currentRequirement.options;
    }

    // Add min/max if text or number
    if (needsMinMax(currentRequirement.input_type)) {
      if (currentRequirement.min) {
        newRequirement.min = parseInt(currentRequirement.min);
      }
      if (currentRequirement.max) {
        newRequirement.max = parseInt(currentRequirement.max);
      }
    }

    setRequirements([...requirements, newRequirement]);
    setCurrentRequirement({
      name: "",
      input_type: "",
      required: true,
      min: "",
      max: "",
      options: [],
      currentOption: "",
    });
  };

  const removeRequirement = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !serviceName.trim() ||
      !categoryId ||
      !subCatId ||
      attributes.length < 3
    ) {
      showToast.warning(
        "Please fill in all required fields and add at least three service features.",
      );
      return;
    }

    setLoading(true);
    showLoader("Updating Service...");

    try {
      const payload = {
        service_name: serviceName,
        category_id: categoryId,
        subcategory_id: subCatId,
        service_attributes: attributes,
        service_status: serviceStatus,
        service_requirements:
          requirements.length > 0 ? requirements : undefined,
        service_details_1: detailsOne || null,
        service_details_2: detailsTwo || null,
        service_details_3: detailsThree || null,
      };

      const response = await updateService(serviceId, payload);
      if (response) {
        showToast.success("Service updated successfully!");
        navigate("/dashboard/admin/services");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      showToast.error("Failed to update service");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to discard changes?")) {
      navigate("/dashboard/admin/services");
    }
  };

  const getRequirementDisplayText = (req) => {
    let text = `${req.requirement.name} (${req.requirement.input_type})`;

    if (req.requirement.options) {
      text += ` - Options: ${req.requirement.options.join(", ")}`;
    }

    if (req.min || req.max) {
      text += ` - Range: ${req.min || "∞"} to ${req.max || "∞"}`;
    }

    text += req.required ? " - Required" : " - Optional";

    return text;
  };

  if (!dataLoaded) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading service data...</Typography>
      </Box>
    );
  }

  return (
    <>
      <PagesHeader
        label="Edit Service"
        desc="Update service information, attributes, requirements, and details"
        searchEnabled={false}
        actions={[
          {
            label: "View Services",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/services"),
          },
          {
            label: "Service Details",
            icon: <VisibilityOutlined />,
            onClick: () => navigate(`/dashboard/admin/services/${id}`),
          },
        ]}
      />

      <Box sx={styles.card}>
        <Box component="form" mt={3} onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  p: 3,
                  bgcolor: "white",
                }}
              >
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Service Name" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter Service Name"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px",
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth>
                      <InputLabel text="Service Category" />
                      <Select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        disableUnderline
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <InputLabel text="Select Service Category" />
                        </MenuItem>

                        {categories.map((cat, index) => (
                          <MenuItem key={index} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth>
                      <InputLabel text="Service Sub Category" />
                      <Select
                        value={subCatId}
                        onChange={(e) => setSubCatId(e.target.value)}
                        disableUnderline
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <InputLabel text="Select Service Sub Category" />
                        </MenuItem>

                        {subCat.map((cat, index) => (
                          <MenuItem key={index} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Box
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 2,
                        p: 3,
                        bgcolor: "white",
                        mt: 3,
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight={600} mb={2}>
                        Service Status
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="body2" fontWeight={500}>
                          {serviceStatus ? "Active" : "Inactive"}
                        </Typography>
                        <Switch
                          checked={serviceStatus}
                          onChange={(e) => setServiceStatus(e.target.checked)}
                          disabled={loading}
                          color="warning"
                        />
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="h4" fontWeight={600} mb={1}>
                Service Attributes
              </Typography>

              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  p: 3,
                  bgcolor: "white",
                  mt: 2,
                }}
              >
                <Grid size={{ xs: 12 }}>
                  <InputLabel text="Add Features *" />
                  <Stack direction="row" spacing={2}>
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="e.g., Unlimited storage, 24/7 support"
                      value={currentAttribute}
                      onChange={(e) => setCurrentFeature(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddFeature(e);
                        }
                      }}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px",
                      }}
                    />
                    <IconButton
                      onClick={handleAddFeature}
                      type="button"
                      sx={{
                        bgcolor: "#1976d2",
                        color: "white",
                        "&:hover": { bgcolor: "#1565c0" },
                      }}
                    >
                      <AddOutlined />
                    </IconButton>
                  </Stack>

                  {attributes.length > 0 && (
                    <Box mt={2}>
                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {attributes.map((feature, index) => (
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
              </Box>

              <Typography variant="h4" fontWeight={600} mt={3} mb={1}>
                Service Details
              </Typography>
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  p: 3,
                  bgcolor: "white",
                  mt: 2,
                }}
              >
                <Grid size={{ xs: 12 }}>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Service Detail One" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter Service Detail One"
                      value={detailsOne}
                      onChange={(e) => setDetailsOne(e.target.value)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px",
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }} mt={2}>
                    <InputLabel text="Service Detail Two" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter Service Detail Two"
                      value={detailsTwo}
                      onChange={(e) => setDetailsTwo(e.target.value)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px",
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }} mt={2}>
                    <InputLabel text="Service Detail Three" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter Service Detail Three"
                      value={detailsThree}
                      onChange={(e) => setDetailsThree(e.target.value)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px",
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h4" fontWeight={600} mt={4} mb={1}>
                Service Requirements
              </Typography>

              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  p: 3,
                  bgcolor: "white",
                }}
              >
                <Stack spacing={2}>
                  {/* Requirement Name */}
                  <Box>
                    <InputLabel text="Requirement Name" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="e.g., Instagram Username, Target Countries"
                      value={currentRequirement.name}
                      onChange={(e) =>
                        setCurrentRequirement({
                          ...currentRequirement,
                          name: e.target.value,
                        })
                      }
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px",
                      }}
                    />
                  </Box>

                  {/* Input Type */}
                  <Box>
                    <InputLabel text="Input Type" />
                    <Select
                      fullWidth
                      value={currentRequirement.input_type}
                      onChange={(e) =>
                        setCurrentRequirement({
                          ...currentRequirement,
                          input_type: e.target.value,
                          options: [], // Reset options when changing type
                          currentOption: "",
                        })
                      }
                      displayEmpty
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select input type
                      </MenuItem>
                      <MenuItem value="text">Text</MenuItem>
                      <MenuItem value="number">Number</MenuItem>
                      <MenuItem value="file">File</MenuItem>
                      <MenuItem value="url">URL</MenuItem>
                      <MenuItem value="checkbox">Checkbox</MenuItem>
                      <MenuItem value="radio">Radio</MenuItem>
                    </Select>
                  </Box>

                  {/* Min/Max for text and number */}
                  <Collapse in={needsMinMax(currentRequirement.input_type)}>
                    <Stack direction="row" spacing={2}>
                      <Box flex={1}>
                        <InputLabel text="Min Length/Value (Optional)" />
                        <Input
                          disableUnderline
                          fullWidth
                          type="number"
                          placeholder="Min"
                          value={currentRequirement.min}
                          onChange={(e) =>
                            setCurrentRequirement({
                              ...currentRequirement,
                              min: e.target.value,
                            })
                          }
                          sx={{
                            border: "1px solid #e0e0e0",
                            borderRadius: 1,
                            px: 2,
                            py: 1.5,
                            fontSize: "14px",
                          }}
                        />
                      </Box>
                      <Box flex={1}>
                        <InputLabel text="Max Length/Value (Optional)" />
                        <Input
                          disableUnderline
                          fullWidth
                          type="number"
                          placeholder="Max"
                          value={currentRequirement.max}
                          onChange={(e) =>
                            setCurrentRequirement({
                              ...currentRequirement,
                              max: e.target.value,
                            })
                          }
                          sx={{
                            border: "1px solid #e0e0e0",
                            borderRadius: 1,
                            px: 2,
                            py: 1.5,
                            fontSize: "14px",
                          }}
                        />
                      </Box>
                    </Stack>
                  </Collapse>

                  {/* Options for checkbox/radio */}
                  <Collapse in={needsOptions(currentRequirement.input_type)}>
                    <Box>
                      <InputLabel text="Options *" />
                      <Stack direction="row" spacing={2}>
                        <Input
                          disableUnderline
                          fullWidth
                          placeholder="Enter an option"
                          value={currentRequirement.currentOption}
                          onChange={(e) =>
                            setCurrentRequirement({
                              ...currentRequirement,
                              currentOption: e.target.value,
                            })
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              addOptionToCurrentRequirement(e);
                            }
                          }}
                          sx={{
                            border: "1px solid #e0e0e0",
                            borderRadius: 1,
                            px: 2,
                            py: 1.5,
                            fontSize: "14px",
                          }}
                        />
                        <IconButton
                          onClick={addOptionToCurrentRequirement}
                          type="button"
                          sx={{
                            bgcolor: "#1976d2",
                            color: "white",
                            "&:hover": { bgcolor: "#1565c0" },
                          }}
                        >
                          <AddOutlined />
                        </IconButton>
                      </Stack>

                      {currentRequirement.options.length > 0 && (
                        <Stack direction="row" flexWrap="wrap" gap={1} mt={2}>
                          {currentRequirement.options.map((option, i) => (
                            <Chip
                              key={i}
                              label={option}
                              onDelete={() =>
                                removeOptionFromCurrentRequirement(i)
                              }
                              deleteIcon={<CloseOutlined />}
                              sx={{ bgcolor: "#e3f2fd" }}
                            />
                          ))}
                        </Stack>
                      )}
                    </Box>
                  </Collapse>

                  {/* Required Toggle */}
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography>Required Field</Typography>
                    <Switch
                      checked={currentRequirement.required}
                      onChange={(e) =>
                        setCurrentRequirement({
                          ...currentRequirement,
                          required: e.target.checked,
                        })
                      }
                      color="warning"
                    />
                  </Stack>

                  <CustomButton
                    title="Add Requirement"
                    onClick={addRequirement}
                    type="button"
                    variant="outlined"
                  />
                </Stack>

                {/* Display added requirements */}
                {requirements.length > 0 && (
                  <Stack mt={3} gap={1}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Added Requirements ({requirements.length})
                    </Typography>
                    {requirements.map((req, i) => (
                      <Chip
                        key={i}
                        label={getRequirementDisplayText(req)}
                        onDelete={() => removeRequirement(i)}
                        deleteIcon={<CloseOutlined />}
                        sx={{
                          bgcolor: "#f5f5f5",
                          height: "auto",
                          py: 1,
                          "& .MuiChip-label": {
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                          },
                        }}
                      />
                    ))}
                  </Stack>
                )}
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={5}>
            <Grid size={{ xs: 12 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <CustomButton
                  title="Back"
                  color="inherit"
                  variant="outlined"
                  startIcon={<ArrowBackOutlined />}
                  onClick={() => navigate(-1)}
                  type="button"
                  sx={{ textTransform: "none", px: 3 }}
                />

                <Stack direction="row" gap={2}>
                  <CustomButton
                    title="Cancel"
                    color="inherit"
                    variant="outlined"
                    startIcon={<CloseOutlined />}
                    onClick={handleCancel}
                    type="button"
                    sx={{ textTransform: "none", px: 4 }}
                  />
                  <CustomButton
                    title={loading ? "Updating..." : "Update Service"}
                    color="primary"
                    variant="filled"
                    disabled={loading}
                    type="submit"
                    startIcon={<SaveOutlined />}
                    sx={{ textTransform: "none", px: 4 }}
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default EditServicePage;