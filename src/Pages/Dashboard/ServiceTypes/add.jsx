import React, { useState } from "react";
import {
  Grid,
  Box,
  Input,
  Stack,
  Switch,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import {
  AddOutlined,
  DeleteOutlined,
  VisibilityOutlined,
  ArrowBackOutlined,
} from "@mui/icons-material";
import {
  InputLabel,
  CustomButton,
  PagesHeader,
  UploadMedia,
  RichTextEditor,
} from "../../../Component";
import { styles } from "../../../styles/dashboard";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../../Contexts/LoaderContext";
import { showToast } from "../../../utils/toast";
import { fileToBase64 } from "../../../utils/functions";
import { useCreateServiceTypes } from "../../../Hooks/Dashboard/service_types";
import { useFetchServices } from "../../../Hooks/Dashboard/services";
import { discountTypes } from "./data";

const AddServiceTypePage = () => {
  const [typeName, setTypeName] = useState("");
  const [typeImg, setTypeImg] = useState("");
  const [typeStatus, setTypeStatus] = useState(false);
  const [typeDesc, setTypeDesc] = useState("");
  const [typeCategory, setTypeCategory] = useState("");
  const [typePrice, setTypePrice] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [maxDiscountValue, setMaxDiscountValue] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const { services } = useFetchServices();
  const addServiceType = useCreateServiceTypes();

  console.log("Services:", services);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!typeName.trim() || !typeDesc.trim() || !typeImg) {
      showToast.warning("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    showLoader("Adding Service Type...");

    try {
      const imageToBase64 = fileToBase64(typeImg);

      const payload = {
        service_type_name: typeName,
        service_type_image: imageToBase64,
        status: typeStatus,
        description: typeDesc,
        service_id: typeCategory,
        price: typePrice,
      };
      console.log("PayLoad:", payload);

      const response = await addServiceType(payload);
      if (response) {
        showToast.success("Servie Type added successfully!");
        setTypeName("");
        setTypeImg(null);
        setTypeDesc("");
        navigate("/dashboard/admin/service-types");
      }
    } catch (error) {
      showToast.error(error || "Failed to create category");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  return (
    <>
      <PagesHeader
        label="Add Service Type"
        desc="Add Service Types for creating services. Go to view service types to manage type"
        searchEnabled={false}
        placeholder={"Search service types..."}
        actions={[
          {
            label: "View Service Types",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/service-types"),
          },
          {
            label: "Add Service",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/services"),
          },
        ]}
      />

      <Box sx={styles.card}>
        <Box component="form" mt={3}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <UploadMedia
                mode="single"
                maxFiles={1}
                maxSize={2}
                onFilesChange={setTypeImg}
                acceptedFormats={["jpg", "png", "jpeg", "svg", "zip"]}
                title="Service Type Category Image Upload"
                description="Add your documents here, and you can upload max of 1 file only"
              />

              <Grid size={{ xs: 12 }}>
                <Box
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    p: 3,
                    bgcolor: "white",
                    mt: 2,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600} mb={2}>
                    Service Type Status
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="body2" fontWeight={500}>
                      {typeStatus ? "Active" : "Inactive"}
                    </Typography>
                    <Switch
                      checked={typeStatus}
                      onChange={(e) => setTypeStatus(e.target.checked)}
                      disabled={loading}
                      color="warning"
                    />
                  </Stack>
                </Box>
              </Grid>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
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
                    <InputLabel text="Service Type Name" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter service type name"
                      value={typeName}
                      onChange={(e) => setTypeName(e.target.value)}
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
                      <InputLabel text="Service for Service Type" />
                      <Select
                        value={typeCategory}
                        onChange={(e) => setTypeCategory(e.target.value)}
                        disableUnderline
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <InputLabel text="Select service for service type" />
                        </MenuItem>

                        {services.map((service, index) => (
                          <MenuItem key={index} value={service.id}>
                            {service.service_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Service Type Price" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter service type price"
                      value={typePrice}
                      type="number"
                      onChange={(e) => setTypePrice(e.target.value)}
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
                    <InputLabel text="Discount Amount" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter discount amount"
                      value={discountValue}
                      type="number"
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
                      <InputLabel text="Discount Type" />
                      <Select
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value)}
                        disableUnderline
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <InputLabel text="Select discount type" />
                        </MenuItem>

                        {discountTypes.map((type, index) => (
                          <MenuItem key={index} value={type.value}>
                            {type.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Maximum Discount" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter maximum discount"
                      value={maxDiscountValue}
                      type="number"
                      onChange={(e) => setMaxDiscountValue(e.target.value)}
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
                    <InputLabel text="Service Type Description" />
                    <RichTextEditor
                      value={typeDesc}
                      onChange={setTypeDesc}
                      placeholder="Enter service type description..."
                      minHeight="250px"
                      maxHeight="500px"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={3}>
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
                    title={loading ? "Submitting..." : "Submit"}
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

export default AddServiceTypePage;
