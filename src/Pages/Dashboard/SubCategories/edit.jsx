import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Input,
  Stack,
  Switch,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import {
  VisibilityOutlined,
  ArrowBackOutlined,
  AddOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import {
  InputLabel,
  CustomButton,
  PagesHeader,
  UploadMedia,
  RichTextEditor,
} from "../../../Component";
import { styles } from "../../../styles/dashboard";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoader } from "../../../Contexts/LoaderContext";
import { showToast } from "../../../utils/toast";
import { fileToBase64 } from "../../../utils/functions";
import { useUpdateSuCategory } from "../../../Hooks/Dashboard/sub_categories";
import { useFetchCategories } from "../../../Hooks/Dashboard/categories";
import { BASE_IMAGE_URL } from "../../../Config/paths";

const EditSubCategoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { data } = state || {};

  const updateSubCategory = useUpdateSuCategory();
  const { showLoader, hideLoader } = useLoader();
  const { categories } = useFetchCategories();
  const [categoryName, setCategoryName] = useState("");
  const [categoryImg, setCategoryImg] = useState(null);
  const [parentCategory, setParentCategory] = useState("");
  const [categoryStatus, setCategoryStatus] = useState(false);
  const [categoryDesc, setCategoryDesc] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("Edit Sub Category Data:", categories);

  useEffect(() => {
    if (!data) return;

    setCategoryName(data.name);
    setCategoryDesc(data.description);
    setCategoryStatus(data.status);
  }, [data]);

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!categoryName.trim() || !categoryDesc.trim()) {
      showToast.warning("Category name and description are required.");
      return;
    }

    setLoading(true);
    showLoader("Updating Category...");

    try {
      const payload = {
        name: categoryName,
        description: categoryDesc,
        status: categoryStatus,
        category_id: parentCategory,
      };

      if (categoryImg) {
        payload.image = fileToBase64(categoryImg);
      }

      const res = await updateSubCategory(data.id, payload);
      if (res) {
        showToast.success("Category updated successfully!");
        navigate("/dashboard/admin/sub-categories");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      showToast.error("Failed to update category");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  if (!data) return null;

  return (
    <>
      <PagesHeader
        label="Edit Sub Category"
        desc="Update sub-category details, SEO metadata, and visibility"
        searchEnabled={false}
        actions={[
            {
            label: "View SubCategory",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/sub-categories"),
          },
          {
            label: "View Categories",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/categories"),
          },
        
          {
            label: "Add SubCategory",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/sub-categories"),
          },
        ]}
      />
      <Box sx={styles.card}>
        <Box component="form" mt={3}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                component="img"
                src={`${BASE_IMAGE_URL}/${data.image}`}
                alt={data.name}
                sx={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: 2,
                }}
              />
              <UploadMedia
                mode={"single"}
                maxFiles={1}
                maxSize={5}
                acceptedFormats={["jpg", "png", "jpeg", "svg", "zip"]}
                onFilesChange={setCategoryImg}
                title="Update Subcategory Image"
                description="Add your documents here, and you can upload max of 1 files"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  p: 2,
                  bgcolor: "white",
                }}
              >
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Sub Category Name" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter sub-category name"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
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
                      <InputLabel text="Parent Category" />
                      <Select
                        value={parentCategory}
                        onChange={(e) => setParentCategory(e.target.value)}
                        disableUnderline
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <InputLabel text="Select Parent Category" />
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
                    <InputLabel text="Category Description " />
                    <RichTextEditor
                      value={categoryDesc}
                      onChange={(e) => setCategoryDesc(e.target.value)}
                      placeholder="Enter description for sub category..."
                      minHeight="150px"
                    />
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
                        Sub Category Status
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
                    title={loading ? "Submitting..." : "Update Sub Category"}
                    color="primary"
                    variant="filled"
                    disabled={loading}
                    onClick={handleUpdateCategory}
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

export default EditSubCategoryPage;
