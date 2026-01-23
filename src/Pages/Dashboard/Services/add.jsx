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
} from "@mui/material";
import {
  AddOutlined,
  DeleteOutlined,
  VisibilityOutlined,
  ArrowBackOutlined,
  AttachMoneyOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import {
  InputLabel,
  CustomButton,
  PagesHeader,
  UploadMedia,
} from "../../../Component";
import { styles } from "../../../styles/dashboard";
import { useNavigate } from "react-router-dom";
import { useCreateServices } from "../../../Hooks/Dashboard/services";
import { useFetchCategories } from "../../../Hooks/Dashboard/categories";
import { useFetchSubCategories } from "../../../Hooks/Dashboard/sub_categories";
import { showToast } from "../../../utils/toast";
import { useLoader } from "../../../Contexts/LoaderContext";
import { useFetchServiceTypes } from "../../../Hooks/Dashboard/service_types";
import { discountTypes } from "./data";

const AddServicePage = () => {
  const [serviceName, setServiceName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCatId, setSubCatId] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceStatus, setServiceStatus] = useState(true);
  const [serviceDesc, setServiceDesc] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [currentAttribute, setCurrentFeature] = useState("");

  const [loading, setLoading] = useState(false);
  const addService = useCreateServices();
  const navigate = useNavigate();
  const { hideLoader, showLoader } = useLoader();
  const { categories } = useFetchCategories();
  const { subCat } = useFetchSubCategories();
  const { serviceTypes } = useFetchServiceTypes();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serviceName.trim() || !serviceDesc.trim() || !servicePrice) {
      showToast.warning(
        "Please fill in all required fields and add atleast three service features.",
      );
      return;
    }

    setLoading(true);
    showLoader("Adding Service...");

    try {
      const payload = {
        service_name: serviceName,
        category_id: categoryId,
        subcategory_id: subCatId,
        discount_type: discountType.toLocaleLowerCase(),
        discount_value: discountValue,
        service_description: serviceDesc,
        service_attributes: attributes,
        service_price: servicePrice,
        service_status: serviceStatus,
      };
      console.log("PayLoad:", payload);

      const response = await addService(payload);
      if (response) {
        showToast.success("Category added successfully!");
        setServiceName("");
        setServiceDesc("");
        setAttributes([]);
        navigate("/dashboard/admin/services");
      }
    } catch (error) {
      console.error("Error adding service:", error);
      showToast.error("Failed to create category");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  return (
    <>
      <PagesHeader
        label="Add Service"
        desc="Add services, select category and sub categories for services. Go to view services to manage services"
        searchEnabled={false}
        placeholder={"Search services..."}
        actions={[
          {
            label: "View Services",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/services"),
          },
          {
            label: "Add Cateogries",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/categories"),
          },
        ]}
      />

      <Box sx={styles.card}>
        <Box component="form" mt={3}>
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
                    <InputLabel text="Service Price" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="0.00"
                      type="number"
                      value={servicePrice}
                      onChange={(e) => setServicePrice(e.target.value)}
                      startAdornment={
                        <InputAdornment position="start">
                          <AttachMoneyOutlined
                            sx={{ fontSize: 20, color: "#666" }}
                          />
                        </InputAdornment>
                      }
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
                      <InputLabel text="Service Discount Type" />
                      <Select
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value)}
                        disableUnderline
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <InputLabel text="Select Service Discount Type" />
                        </MenuItem>

                        {discountTypes.map((discount, index) => (
                          <MenuItem key={index} value={discount.name}>
                            {discount.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Service Discount " />
                    <Input
                      disableUnderline
                      fullWidth
                      type="number"
                      placeholder="0.00"
                      value={discountValue}
                      onChange={(e) => setDiscountValue(e.target.value)}
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
                      <InputLabel text="Service Type" />
                      <Select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        disableUnderline
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <InputLabel text="Select Service Type " />
                        </MenuItem>

                        {serviceTypes.map((type, index) => (
                          <MenuItem key={index} value={type.id}>
                            {type.service_type_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
              <Grid size={{ xs: 12 }}>
                <InputLabel text="Service Description " />
                <TextField
                  id="outlined-textarea"
                  multiline
                  rows={5}
                  disableUnderline
                  fullWidth
                  placeholder="Long description here"
                  value={serviceDesc}
                  onChange={(e) => setServiceDesc(e.target.value)}
                />
              </Grid>

              <Typography variant="h4" fontWeight={600} mt={3} mb={1}>
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
                      onKeyDown={(e) => e.key === "Enter" && handleAddFeature()}
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
                  sx={{ textTransform: "none", px: 3 }}
                />

                <Stack direction="row" gap={2}>
                  <CustomButton
                    title="Delete"
                    color="danger"
                    variant="outlined"
                    startIcon={<DeleteOutlined />}
                    onClick={() => {}}
                    sx={{ textTransform: "none", px: 4 }}
                  />
                  <CustomButton
                    title={loading ? "Adding..." : "Add Service"}
                    color="primary"
                    variant="filled"
                    disabled={loading}
                    onClick={handleSubmit}
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

export default AddServicePage;
