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
  MenuItem,
  Select
} from "@mui/material";
import { toast } from "react-toastify";
import {
  AddOutlined,
  DeleteOutlined,
  VisibilityOutlined,
  ArrowBackOutlined
} from "@mui/icons-material";
import { InputLabel, CustomButton, PagesHeader } from "../../../Component";
import { styles } from "../../../styles/dashboard";
import { useAddCategories } from "../../../Hooks/categories";
import { useNavigate } from "react-router-dom";
import { category as categories } from "./data";

const AddCategoryRequirement = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [required, setRequired] = useState([]);
  const [categoryStatus, setCategoryStatus] = useState(true);
  const [categoryDesc, setCategoryDesc] = useState("");
  const [options, setOptions] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [categoryContent, setCategoryContent] = useState("");

  const [loading, setLoading] = useState(false);
  const addCategory = useAddCategories();
  const navigate = useNavigate();

  const handleAddKeyword = () => {
    if (keywordInput.trim() && options.length < 5) {
      setOptions([...options, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const handleDeleteKeyword = (indexToDelete) => {
    setOptions(options.filter((_, index) => index !== indexToDelete));
  };

  const formData = {
    title,
    category,
    options,
    categoryStatus,
    categoryDesc,
    required,
    categoryContent
  };

  const handleSubmitAdmin = async () => {
    if (!title.trim() || !category.trim() || !categoryDesc) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await addCategory(formData);

      if (response) {
        toast.success("Category added successfully!");
        setTitle("");
        setCategory("");
        setOptions([]);
        setCategoryStatus(true);
        setCategoryDesc("");
        setRequired([]);
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
        label="Add Category Requirement"
        desc="Add Categories for services, portfolios and blogs. Go to view categories to manage categories"
        searchEnabled={false}
        placeholder={"Search categories..."}
        actions={[
          {
            label: "View Categories",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/categories")
          },
          {
            label: "View Requirements",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/categories-requirements")
          },
          {
            label: "Add Service",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/services")
          }
        ]}
      />

      <Box sx={styles.card}>
        <Box
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            p: 3,
            bgcolor: "white"
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
                      placeholder="Enter requirement title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
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
                    <InputLabel text="Required Status" />
                    <FormControl fullWidth>
                      <Select
                        value={required}
                        onChange={(e) => setRequired(e.target.value)}
                        disableUnderline
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <InputLabel text="Select Required Status" />
                        </MenuItem>

                        <MenuItem value="Required">Required</MenuItem>
                        <MenuItem value="Optional">Optional</MenuItem>
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
                        mt: 3
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight={600} mb={2}>
                        Category Requirement Status
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
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Comment " />
                    <TextField
                      id="comment"
                      multiline
                      rows={7}
                      disableUnderline
                      fullWidth
                      placeholder="Enter comment here..."
                      value={categoryDesc}
                      onChange={(e) => setCategoryDesc(e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 12 }}>
                    <Box
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 2,
                        p: 2,
                        bgcolor: "white",
                        mt: 3
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight={600} mb={2}>
                        SEO keywords
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                          mb: 2
                        }}
                      >
                        {options.map((keyword, index) => (
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
                            py: 3,
                            fontSize: "14px"
                          }}
                        />
                      </Box>
                    </Box>
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

export default AddCategoryRequirement;
