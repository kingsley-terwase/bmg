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
} from "../../../Component";
import { styles } from "../../../styles/dashboard";
import { useNavigate } from "react-router-dom";
import { useCreateSubCategories } from "../../../Hooks/Dashboard/sub_categories";
import { showToast } from "../../../utils/toast";
import { useFetchCategories } from "../../../Hooks/Dashboard/categories";
import { useLoader } from "../../../Contexts/LoaderContext";

const AddSubCategoriesPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImg, setCategoryImg] = useState("");
  const [categoryStatus, setCategoryStatus] = useState(true);
  const [categoryDesc, setCategoryDesc] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const { hideLoader, showLoader } = useLoader();

  const [loading, setLoading] = useState(false);
  const createSubCat = useCreateSubCategories();
  const navigate = useNavigate();
  const { categories } = useFetchCategories();

  const handleCreateSubCategory = async (e) => {
    e.preventDefault();

    if (!categoryName.trim() || !categoryDesc.trim() || !categoryImg) {
      showToast.warning("Please fill in all required fields.");
      return;
    }
    console.log("Creating Sub Category...", categoryImg);

    setLoading(true);
    showLoader("Creating Sub Category...");

    try {
      const payload = {
        category_id: parentCategory,
        name: categoryName,
        image: categoryImg,
        status: categoryStatus,
        description: categoryDesc,
      };
      console.log("PayLoad:", payload);

      const response = await createSubCat(payload);
      if (response) {
        showToast.success("SubCategory added successfully!");
        setCategoryName("");
        setCategoryImg(null);
        setCategoryDesc("");
        navigate("/dashboard/admin/sub-categories");
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
        label="Add Sub Category"
        desc="Add Sub Categories for Categories, to manage sub categories go to view sub categories."
        searchEnabled={false}
        placeholder={"Search sub categories..."}
        actions={[
          {
            label: "View Sub Categories",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/sub-categories"),
          },
          {
            label: "Add Category",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/categories"),
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
            <Grid size={{ xs: 12, md: 5 }}>
              <UploadMedia
                mode={"single"}
                maxFiles={1}
                maxSize={5}
                acceptedFormats={["jpg", "png", "jpeg", "svg", "zip"]}
                onFilesChange={setCategoryImg}
                title="Media Upload"
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
                    <TextField
                      id="outlined-textarea"
                      multiline
                      disableUnderline
                      fullWidth
                      placeholder="Long description here"
                      value={categoryDesc}
                      onChange={(e) => setCategoryDesc(e.target.value)}
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
                    title={loading ? "Submitting..." : "Submit"}
                    color="primary"
                    variant="filled"
                    disabled={loading}
                    onClick={handleCreateSubCategory}
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

export default AddSubCategoriesPage;
