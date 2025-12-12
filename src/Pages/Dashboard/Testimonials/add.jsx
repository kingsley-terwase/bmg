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
import { services } from "./data";

const AddTestimonialsPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categoryImg, setCategoryImg] = useState([]);
  const [categoryDesc, setCategoryDesc] = useState("");
  const [status, setStatus] = useState("");
  const [service, setService] = useState("");

  const [loading, setLoading] = useState(false);
  const addCategory = useAddCategories();
  const navigate = useNavigate();

  const handleFilesChange = (files) => {
    setCategoryImg(files);
  };

  const formData = {
    categoryName,
    categorySlug,
    categoryImg,
    status,
    categoryDesc
  };

  const handleSubmitAdmin = async () => {
    if (
      !categoryName.trim() ||
      !categorySlug.trim() ||
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
        setCategoryName("");
        setCategorySlug("");
        setCategoryImg([]);
        setStatus(true);
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
        label="Add Testimonial"
        desc="Add testimonials. To manage testimonials go to view testimonials."
        searchEnabled={false}
        placeholder={"Search testimonials..."}
        actions={[
          {
            label: "View Testimonials",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/testimonials")
          },
          {
            label: "View Orders",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/orders")
          },
          {
            label: "Add Service",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/services")
          },
          {
            label: "View Campaigns",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/campaigns")
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
                  Status
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
              <Grid size={{ xs: 12 }} mt={3}>
                <InputLabel text="Content" />
                <TextField
                  id="content"
                  multiline
                  rows={5}
                  disableUnderline
                  fullWidth
                  placeholder="Enter content here"
                  value={categoryDesc}
                  onChange={(e) => setCategoryDesc(e.target.value)}
                />
              </Grid>
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
                    <InputLabel text="Full Name" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter fullname"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px"
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Business Name" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter business name"
                      value={categorySlug}
                      onChange={(e) => setCategorySlug(e.target.value)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px"
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Email Address" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter email address"
                      value={categorySlug}
                      onChange={(e) => setCategorySlug(e.target.value)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px"
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Phone Number" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter phone number"
                      value={categorySlug}
                      onChange={(e) => setCategorySlug(e.target.value)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px"
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth>
                      <InputLabel text="Service ordered" />
                      <Select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        disableUnderline
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <InputLabel text="Select service ordered" />
                        </MenuItem>

                        {services.map((service, i) => (
                          <MenuItem key={i} value={services.name}>
                            {service.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Adrress" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter address"
                      value={categorySlug}
                      onChange={(e) => setCategorySlug(e.target.value)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px"
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Business Logo" />
                    <Input
                      disableUnderline
                      fullWidth
                      type="file"
                      placeholder="Enter address"
                      value={categorySlug}
                      onChange={(e) => setCategorySlug(e.target.value)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px"
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Profile Picture" />
                    <Input
                      disableUnderline
                      fullWidth
                      type="file"
                      placeholder="Enter address"
                      value={categorySlug}
                      onChange={(e) => setCategorySlug(e.target.value)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px"
                      }}
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

export default AddTestimonialsPage;
