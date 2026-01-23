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
  MenuItem,
  Select,
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
import { useCreateBlogs } from "../../../Hooks/Dashboard/blogs";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../utils/toast";
import { useLoader } from "../../../Contexts/LoaderContext";
import { useFetchBlogCategory } from "../../../Hooks/Dashboard/blog_categories";

const AddBlogs = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState(true);
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const postBlog = useCreateBlogs();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const { blogCategories } = useFetchBlogCategory();

  const formData = {
    title,
    slug,
    category,
    image,
    status,
    content,
  };

  const handleFilesChange = (files) => {
    setImage(files);
  };

  const handleSubmitAdmin = async (e) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !content) {
      showToast.warning("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    showLoader("Adding Blog...");
    try {
      const response = await postBlog(formData);

      if (response) {
        showToast.success("Blog added successfully!");
        setTitle("");
        setSlug("");
        setCategory("");
        setImage(null);
        setStatus(true);
        setContent("");
        navigate("/da");
      }
    } catch (error) {
      console.error(error);
      showToast.error(error);
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  return (
    <>
      <PagesHeader
        label="Add Blog"
        desc="Add blog posts for the web. Go to view blogs to manage blogs"
        searchEnabled={false}
        placeholder={"Search blogs..."}
        actions={[
          {
            label: "View Blogs",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/blogs"),
          },
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
        <Box
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            p: 3,
            bgcolor: "white",
          }}
        >
          <Box component="form" mt={3}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Title" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
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
                    <InputLabel text="Blog Slug" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
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

                        {blogCategories.map((cat, i) => (
                          <MenuItem key={i} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, md: 12 }}>
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
                        Blog Status
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
                </Grid>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <UploadMedia
                      mode="single"
                      maxFiles={1}
                      maxSize={2}
                      acceptedFormats={["jpg", "png", "jpeg", "svg", "zip"]}
                      onFilesChange={handleFilesChange}
                      title="Media Upload"
                      description="Add your documents here, and you can upload up to 5 files max"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                <InputLabel text="Blog Content " />
                <TextField
                  id="content"
                  multiline
                  rows={7}
                  disableUnderline
                  fullWidth
                  placeholder="Enter content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
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

export default AddBlogs;
