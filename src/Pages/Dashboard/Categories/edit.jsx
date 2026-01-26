import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Input,
  Stack,
  Switch,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import {
  VisibilityOutlined,
  ArrowBackOutlined,
  AddOutlined,
  ImageAspectRatioOutlined,
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
import { useUpdateCategory } from "../../../Hooks/Dashboard/categories";
import { BASE_IMAGE_URL } from "../../../Config/paths";

const EditCategoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { data } = state || {};

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
    if (!data) return;

    setCategoryName(data.name);
    setCategoryDesc(data.description);
    setCategoryStatus(data.status);
    setSeoKeywords(Object.values(data.short_descriptions || {}));
  }, [data]);

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
        image: categoryImg,
        banner: categoryBanner,
      };

      const res = await updateCategory(payload, data.id);

      if (res) {
        showToast.success("Category updated successfully!");
        navigate("/dashboard/admin/categories");
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
        label="Edit Category"
        desc="Update category details, SEO metadata, and visibility"
        searchEnabled={false}
        actions={[
          {
            label: "View Categories",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/categories"),
          },
          {
            label: "Add Service",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/services"),
          },
          {
            label: "Add SubCategory",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/sub-categories"),
          },
        ]}
      />

      <Box sx={styles.card}>
        {(data?.image || data?.banner) && (
          <>
            <Box sx={{ mb: 3 }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <ImageAspectRatioOutlined sx={{ color: "#667eea" }} />
                <Typography
                  variant="overline"
                  color="text.secondary"
                  fontWeight={600}
                  sx={{ letterSpacing: 1.2 }}
                >
                  Category Images
                </Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />

              <Stack direction="row" spacing={2}>
                {data?.image && (
                  <Box
                    sx={{
                      flex: 1,
                      border: "2px solid #e0e0e0",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={`${BASE_IMAGE_URL}/${data.image}`}
                      alt="Category Image"
                      sx={{
                        width: "100%",
                        height: 150,
                        objectFit: "cover",
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        p: 1,
                        bgcolor: "#f5f5f5",
                        textAlign: "center",
                        fontWeight: 600,
                      }}
                    >
                      Category Image
                    </Typography>
                  </Box>
                )}

                {data?.banner && (
                  <Box
                    sx={{
                      flex: 1,
                      border: "2px solid #e0e0e0",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={`${BASE_IMAGE_URL}/${data.banner}`}
                      alt="Banner Image"
                      sx={{
                        width: "100%",
                        height: 150,
                        objectFit: "cover",
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        p: 1,
                        bgcolor: "#f5f5f5",
                        textAlign: "center",
                        fontWeight: 600,
                      }}
                    >
                      Banner Image
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Box>
            <Divider sx={{ my: 3 }} />
          </>
        )}
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
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                    px: 2,
                    py: 1.5,
                    fontSize: "14px",
                  }}
                />

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
                    Category Status
                  </Typography>
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
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    p: 2,
                    bgcolor: "white",
                    mt: 3,
                  }}
                >
                  <Typography fontWeight={600}>SEO Keywords</Typography>

                  <Box
                    sx={{ display: "flex", gap: 1, flexWrap: "wrap", my: 2 }}
                  >
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
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 1,
                      px: 2,
                      py: 1,
                      fontSize: "14px",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box sx={{ mt: 3 }}>
                <InputLabel text="Category Description" />
                <RichTextEditor
                  value={categoryDesc}
                  onChange={setCategoryDesc}
                  placeholder="Write your article..."
                  minHeight="300px"
                />
              </Box>
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
