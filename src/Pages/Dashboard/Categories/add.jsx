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
import { useCreateCategories } from "../../../Hooks/Dashboard/categories";
import { showToast } from "../../../utils/toast";

const AddCategoriePage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImg, setCategoryImg] = useState("");
  const [categoryStatus, setCategoryStatus] = useState(false);
  const [categoryDesc, setCategoryDesc] = useState("");
  const [seoKeywords, setSeoKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [categoryBanner, setCategoryBanner] = useState("");

  const [loading, setLoading] = useState(false);
  const addCategory = useCreateCategories();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  const handleAddKeyword = () => {
    if (keywordInput.trim() && seoKeywords.length < 5) {
      setSeoKeywords([...seoKeywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const handleDeleteKeyword = (indexToDelete) => {
    setSeoKeywords(seoKeywords.filter((_, index) => index !== indexToDelete));
  };

  const keywordsToObject = seoKeywords.reduce((acc, keyword) => {
    acc[keyword] = keyword;
    return acc;
  }, {});

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!categoryName.trim() || !categoryDesc.trim() || !categoryImg) {
      showToast.warning("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    showLoader("Creating Category...");

    try {
      const payload = {
        name: categoryName,
        image: categoryImg,
        banner: categoryBanner,
        status: categoryStatus,
        description: categoryDesc,
        short_descriptions: keywordsToObject,
      };
      console.log("PayLoad:", payload);

      const response = await addCategory(payload);
      if (response) {
        showToast.success("Category added successfully!");
        setCategoryName("");
        setCategoryImg(null);
        setCategoryDesc("");
        setSeoKeywords([]);
        navigate("/dashboard/admin/categories");
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
        label="Add Category"
        desc="Add Categories for services, portfolios and blogs. Go to view categories to manage categories"
        searchEnabled={false}
        placeholder={"Search categories..."}
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
                onFilesChange={setCategoryImg}
                acceptedFormats={["jpg", "png", "jpeg", "svg", "zip"]}
                title="Category Image Upload"
                description="Add your documents here, and you can upload max of 1 file only"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <UploadMedia
                mode="single"
                maxFiles={1}
                maxSize={2}
                acceptedFormats={["jpg", "png", "jpeg", "svg", "zip"]}
                onFilesChange={setCategoryBanner}
                title="Category Banner Upload"
                description="Add your documents here, and you can upload max of 1 files only"
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              p: 3,
              bgcolor: "white",
              mt: 5,
            }}
          >
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Category Name" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter category name"
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
                    <InputLabel text="Category Description " />
                    <RichTextEditor
                      value={categoryDesc}
                      onChange={setCategoryDesc}
                      placeholder="Enter description for category..."
                      minHeight="150px"
                    />
                  </Grid>
                </Grid>
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
                  <Typography variant="subtitle1" fontWeight={600} mb={2}>
                    SEO keywords
                  </Typography>
                  <Box
                    sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}
                  >
                    {seoKeywords.map((keyword, index) => (
                      <Chip
                        key={index}
                        label={keyword}
                        onDelete={() => handleDeleteKeyword(index)}
                        size="small"
                        sx={{ bgcolor: "#f5f5f5" }}
                      />
                    ))}
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
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
                </Box>

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
                    onClick={handleCreateCategory}
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

export default AddCategoriePage;
