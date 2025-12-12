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
  MenuItem
} from "@mui/material";
import { toast } from "react-toastify";
import {
  AddOutlined,
  DeleteOutlined,
  VisibilityOutlined,
  ArrowBackOutlined
} from "@mui/icons-material";
import {
  InputLabel,
  CustomButton,
  PagesHeader,
  UploadMedia
} from "../../../Component";
import { styles } from "../../../styles/dashboard";
import { useAddCategories } from "../../../Hooks/categories";
import { useNavigate } from "react-router-dom";
import { categories, services } from "./data";

const AddPortfolios = () => {
  const [category, setCategory] = useState("");
  const [service, setService] = useState("");
  const [categoryImg, setCategoryImg] = useState([]);
  const [categoryStatus, setCategoryStatus] = useState(true);
  const [categoryDesc, setCategoryDesc] = useState("");

  const [loading, setLoading] = useState(false);
  const addCategory = useAddCategories();
  const navigate = useNavigate();

  const handleFilesChange = (files) => {
    setCategoryImg(files);
  };

  const formData = {
    service,
    category,
    categoryImg,
    categoryStatus,
    categoryDesc
  };

  const handleSubmitAdmin = async () => {
    if (
      !service.trim() ||
      !category.trim() ||
      categoryImg.length === 0 ||
      !categoryDesc
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await addCategory(formData);

      if (response) {
        toast.success("Category added successfully!");
        setService("");
        setCategory("");
        setCategoryImg([]);
        setCategoryStatus(true);
        setCategoryDesc("");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PagesHeader
        label="Add Porfolio"
        desc="Add portfolios for services, categories and blogs. Go to view portfolios to manage portfolios"
        searchEnabled={false}
        placeholder={"Search categories..."}
        actions={[
          {
            label: "View Portfolios",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/portfolios")
          },
          {
            label: "Add Service",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/services")
          }
        ]}
      />

      <Box sx={styles.card}>
        <Box component="form" mt={3}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 5 }}>
              <UploadMedia
                maxFiles={5}
                maxSize={10}
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
                  bgcolor: "white"
                }}
              >
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Category" />
                    <FormControl fullWidth>
                      <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        disableUnderline
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <InputLabel text="Select Category" />
                        </MenuItem>

                        {categories.map((cat, i) => (
                          <MenuItem key={i} value={cat.category}>
                            {cat.category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Service" />

                    <FormControl fullWidth>
                      <Select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        disableUnderline
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <InputLabel text="Select Service" />
                        </MenuItem>

                        {services.map((cat, i) => (
                          <MenuItem key={i} value={cat.category}>
                            {cat.category}
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
                        mt: 3
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight={600} mb={2}>
                        Category Status
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="body2" fontWeight={500}>
                          {categoryStatus ? "Active" : "Inactive"}
                        </Typography>
                        <Switch
                          checked={categoryStatus}
                          onChange={(e) => setCategoryStatus(e.target.checked)}
                          disabled={loading}
                          color="warning"
                        />
                      </Stack>
                    </Box>
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
                    onClick={handleSubmitAdmin}
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
