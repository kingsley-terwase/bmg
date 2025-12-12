import React, { useState } from "react";
import {
  Grid,
  Box,
  Input,
  Stack,
  Switch,
  TextField,
  Typography,
  Chip
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

const AddServicePage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categoryImg, setCategoryImg] = useState([]);
  const [categoryStatus, setCategoryStatus] = useState(true);
  const [categoryDesc, setCategoryDesc] = useState("");
  const [seoKeywords, setSeoKeywords] = useState([]);
  const [categoryContent, setCategoryContent] = useState("");

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
    categoryStatus,
    categoryDesc,
    seoKeywords,
    categoryContent
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
        setCategoryStatus(true);
        setCategoryDesc("");
        setSeoKeywords([]);
        setCategoryContent("");
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
        label="Add Service"
        desc="Add services, select category and sub categories for services. Go to view services to manage services"
        searchEnabled={false}
        placeholder={"Search services..."}
        actions={[
          {
            label: "View Services",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/services")
          },
          {
            label: "Add Cateogries",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/categories")
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
                    <InputLabel text="Service Name" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Mayol Lupa"
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
                    <InputLabel text="Service Slug" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Mayol Lupa"
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
                    <InputLabel text="Service Thumbnail" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Mayol Lupa"
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
                    <InputLabel text="Service Price" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Mayol Lupa"
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
                    <InputLabel text="Service Discount" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Mayol Lupa"
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
                    <InputLabel text="Service Category" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Mayol Lupa"
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
                    <InputLabel text="Service Sub Category" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Mayol Lupa"
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
            <Grid size={{ xs: 12 }}>
              <InputLabel text="Service Description " />
              <TextField
                id="outlined-textarea"
                multiline
                rows={5}
                disableUnderline
                fullWidth
                placeholder="Long description here"
                value={categoryDesc}
                onChange={(e) => setCategoryDesc(e.target.value)}
              />
            </Grid>
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
              mt: 2
            }}
          >
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Feature 1" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder=""
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
                    <InputLabel text="Feature 2" />
                    <Input
                      disableUnderline
                      fullWidth
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
                    <InputLabel text="Feature 3" />
                    <Input
                      disableUnderline
                      fullWidth
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
                    <InputLabel text="Feature 4" />
                    <Input
                      disableUnderline
                      fullWidth
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
                    <InputLabel text="Feature 5" />
                    <Input
                      disableUnderline
                      fullWidth
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
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Feature 6" />
                    <Input
                      disableUnderline
                      fullWidth
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
                    <InputLabel text="Feature 7" />
                    <Input
                      disableUnderline
                      fullWidth
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
                    <InputLabel text="Feature 8" />
                    <Input
                      disableUnderline
                      fullWidth
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
                    <InputLabel text="Feature 9" />
                    <Input
                      disableUnderline
                      fullWidth
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
                    <InputLabel text="Feature 10" />
                    <Input
                      disableUnderline
                      fullWidth
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
              </Grid>
            </Grid>
          </Box>

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

export default AddServicePage;
