import React, { useState } from "react";
import {
  Grid,
  Box,
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
} from "../../../Component";
import { styles } from "../../../styles/dashboard";
import { useNavigate } from "react-router-dom";
import { useAddPortfolio } from "../../../Hooks/Dashboard/portfolios";
import { showToast } from "../../../utils/toast";
import { useLoader } from "../../../Contexts/LoaderContext";
import { useFetchServices } from "../../../Hooks/Dashboard/services";
import { useFetchCategories } from "../../../Hooks/Dashboard/categories";

const AddPortfolios = () => {
  const [categoryId, setCategoryId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState(true);
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const addPortfolio = useAddPortfolio();
  const navigate = useNavigate();
  const { hideLoader, showLoader } = useLoader();
  const { services } = useFetchServices();
  const { categories } = useFetchCategories();

  const formData = {
    service_id: serviceId,
    cat_id: categoryId,
    image,
    status,
    description,
  };

  const handleFilesChange = (files) => {
    setImage(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!serviceId || !categoryId || !image || !description) {
      showToast.warning("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    showLoader("Adding Portfolio");
    try {
      const response = await addPortfolio(formData);

      if (response) {
        showToast.success("Portfolio added successfully!");
        setServiceId("");
        setCategoryId("");
        setImage(null);
        setStatus(true);
        setDescription("");
        navigate("/dashboard/admin/portfolios");
      }
    } catch (error) {
      showToast.error(error);
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  return (
    <>
      <PagesHeader
        label="Add Porfolio"
        desc="Add portfolios for serviceIds, categories and blogs. Go to view portfolios to manage portfolios"
        searchEnabled={false}
        placeholder={"Search categories..."}
        actions={[
          {
            label: "View Portfolios",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/portfolios"),
          },
          {
            label: "Add serviceId",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/serviceIds"),
          },
        ]}
      />

      <Box sx={styles.card}>
        <Box component="form" mt={3}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 5 }}>
              <UploadMedia
                mode="single"
                maxFiles={1}
                maxSize={6}
                acceptedFormats={["jpg", "png", "jpeg", "svg", "zip"]}
                onFilesChange={handleFilesChange}
                title="Media Upload"
                description="Add your documents here, and you can upload up to 5 files max"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
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
                    <InputLabel text="Category" />
                    <FormControl fullWidth>
                      <Select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        disableUnderline
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <InputLabel text="Select Category" />
                        </MenuItem>

                        {categories.map((cat, i) => (
                          <MenuItem key={i} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Select Service" />

                    <FormControl fullWidth>
                      <Select
                        value={serviceId}
                        onChange={(e) => setServiceId(e.target.value)}
                        disableUnderline
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <InputLabel text="Select service" />
                        </MenuItem>

                        {services.map((service, i) => (
                          <MenuItem key={i} value={service.id}>
                            {service.service_name}
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
                        Portfolio Status
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="body2" fontWeight={500}>
                          {status ? "Active" : "Inactive"}
                        </Typography>
                        <Switch
                          checked={status}
                          onChange={(e) => setStatus(e.target.checked)}
                          disabled={loading}
                          color="warning"
                        />
                      </Stack>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 12 }}>
                    <InputLabel text="Description" />
                    <TextField
                      id="content"
                      multiline
                      rows={5}
                      disableUnderline
                      fullWidth
                      placeholder="Enter portfolio description here..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
                    onClick={() => { }}
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

export default AddPortfolios;
