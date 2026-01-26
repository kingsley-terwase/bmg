import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Input,
  Stack,
  Switch,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import {
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useLoader } from "../../../Contexts/LoaderContext";
import { useUpdateCategory } from "../../../Hooks/Dashboard/categories";
import { showToast } from "../../../utils/toast";
import { fileToBase64 } from "../../../utils/functions";

const EditCategoryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const category = state?.category;

  const updateCategory = useUpdateCategory();
  const { showLoader, hideLoader } = useLoader();
  const [categoryName, setCategoryName] = useState("");
  const [categoryImg, setCategoryImg] = useState(null);
  const [categoryBanner, setCategoryBanner] = useState(null);
  const [categoryStatus, setCategoryStatus] = useState(false);
  const [categoryDesc, setCategoryDesc] = useState("");
  const [seoKeywords, setSeoKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!category) return;

    setCategoryName(category.name);
    setCategoryDesc(category.description);
    setCategoryStatus(category.status);
    setSeoKeywords(Object.values(category.short_descriptions || {}));
  }, [category]);

  const handleAddKeyword = () => {
    if (keywordInput.trim() && seoKeywords.length < 5) {
      setSeoKeywords([...seoKeywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const handleDeleteKeyword = (index) => {
    setSeoKeywords(seoKeywords.filter((_, i) => i !== index));
  };

  const keywordsToObject = seoKeywords.reduce((acc, keyword) => {
    acc[keyword] = keyword;
    return acc;
  }, {});

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
        short_descriptions: keywordsToObject,
      };

      if (categoryImg) {
        payload.image = await fileToBase64(categoryImg);
      }

      if (categoryBanner) {
        payload.banner = await fileToBase64(categoryBanner);
      }

      const res = await updateCategory(id, payload);
      if (res) {
        showToast.success("Category updated successfully!");
        navigate("/dashboard/admin/categories");
      }
    } catch (error) {
      console.error("Update Category Error:", error);
      showToast.error("Failed to update category");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  if (!category) return null;

  return (
    <>
      <PagesHeader
        label="Edit Category"
        desc="Update category details, SEO metadata, and visibility"
        searchEnabled={false}
        actions={[
          {
            label: "View Categories",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/categories"),
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
                onFilesChange={setCategoryImg}
                title="Update Category Image"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <UploadMedia
                mode="single"
                maxFiles={1}
                onFilesChange={setCategoryBanner}
                title="Update Category Banner"
              />
            </Grid>
          </Grid>

          <Box
            sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 3, mt: 5 }}
          >
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <InputLabel text="Category Name" />
                <Input
                  disableUnderline
                  fullWidth
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />

                <InputLabel text="Category Description" sx={{ mt: 3 }} />
                <TextField
                  multiline
                  rows={5}
                  fullWidth
                  value={categoryDesc}
                  onChange={(e) => setCategoryDesc(e.target.value)}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography fontWeight={600}>SEO Keywords</Typography>

                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", my: 2 }}>
                  {seoKeywords.map((keyword, index) => (
                    <Chip
                      key={index}
                      label={keyword}
                      onDelete={() => handleDeleteKeyword(index)}
                    />
                  ))}
                </Box>

                <Input
                  disableUnderline
                  fullWidth
                  placeholder="Add keyword"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddKeyword();
                    }
                  }}
                />

                <Stack direction="row" alignItems="center" spacing={2} mt={4}>
                  <Typography fontWeight={500}>
                    {categoryStatus ? "Active" : "Inactive"}
                  </Typography>
                  <Switch
                    checked={categoryStatus}
                    onChange={(e) => setCategoryStatus(e.target.checked)}
                    color="warning"
                  />
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <Stack direction="row" justifyContent="space-between" mt={4}>
            <CustomButton
              title="Back"
              variant="outlined"
              startIcon={<ArrowBackOutlined />}
              onClick={() => navigate(-1)}
            />

            <CustomButton
              title={loading ? "Updating..." : "Update Category"}
              variant="filled"
              disabled={loading}
              onClick={handleUpdateCategory}
            />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default EditCategoryPage;
