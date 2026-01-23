import React, { useState } from "react";
import {
  Grid,
  Box,
  Input,
  Stack,
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
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../utils/toast";
import { useLoader } from "../../../Contexts/LoaderContext";
import { useFetchCategories } from "../../../Hooks/Dashboard/categories";
import { useAddEbook } from "../../../Hooks/Dashboard/ebooks";
import { fileToBase64 } from "../../../utils/functions";

const AddEbooks = () => {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const { categories } = useFetchCategories();
  const createEbook = useAddEbook();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCoverChange = (files) => {
    setImage(files);
  };

  const handleFileChange = (files) => {
    setFile(files?.[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !description || !category || !image || !file) {
      showToast.error("Please fill in all required fields.");
      return;
    }
    const pdfBase64 = await fileToBase64(file);

    const formData = {
      title,
      author,
      description,
      category: Number(category),
      image,
      file: pdfBase64,
    };

    setLoading(true);
    showLoader("Adding Ebook...");

    try {
      const result = await createEbook(formData);
      if (result) {
        showToast.success("Ebook added successfully!");
        navigate("/dashboard/admin/ebooks");
      }
    } catch (error) {
      console.error(error);
      showToast.error("Failed to add ebook.");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  return (
    <>
      <PagesHeader
        label="Add Ebook"
        desc="Add ebook resources for the web. Manage all ebooks from the ebook list."
        actions={[
          {
            label: "View Ebooks",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/ebooks"),
          },
          {
            label: "View Categories",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/categories"),
          },
          {
            label: "Add Campaign",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/campaign"),
          },
        ]}
      />

      <Box sx={styles.card}>
        <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 3 }}>
          <Box component="form" mt={3} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item size={{ xs: 12, md: 6 }}>
                <Stack spacing={2}>
                  <Box>
                    <InputLabel text="Title" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Ebook title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      sx={styles.input}
                    />
                  </Box>

                  <Box>
                    <InputLabel text="Author" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Author full name"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      sx={styles.input}
                    />
                  </Box>

                  <Box>
                    <InputLabel text="Category" />
                    <FormControl fullWidth>
                      <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        displayEmpty
                        disableUnderline
                      >
                        <MenuItem value="" disabled>
                          Select Category
                        </MenuItem>
                        {categories.map((cat) => (
                          <MenuItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <InputLabel text="Description" />
                    <TextField
                      multiline
                      rows={6}
                      fullWidth
                      placeholder="Describe what readers will learn from this ebook..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Box>
                </Stack>
              </Grid>

              <Grid item size={{ xs: 12, md: 6 }}>
                <Stack spacing={2}>
                  <UploadMedia
                    mode="single"
                    maxFiles={1}
                    maxSize={2}
                    acceptedFormats={["jpg", "jpeg"]}
                    onFilesChange={handleCoverChange}
                    title="Cover Image"
                    description="Upload ebook cover image (JPEG)"
                  />

                  <UploadMedia
                    mode="single"
                    maxFiles={1}
                    maxSize={10}
                    acceptedFormats={["pdf", "epub"]}
                    onFilesChange={handleFileChange}
                    title="Ebook File"
                    description="Upload ebook file (PDF or EPUB)"
                  />
                </Stack>
              </Grid>
            </Grid>

            <Grid container mt={5}>
              <Grid item size={{ xs: 12 }}>
                <Stack direction="row" justifyContent="space-between">
                  <CustomButton
                    title="Back"
                    variant="outlined"
                    startIcon={<ArrowBackOutlined />}
                    onClick={() => navigate(-1)}
                  />

                  <Stack direction="row" spacing={2}>
                    <CustomButton
                      title="Delete"
                      color="danger"
                      variant="outlined"
                      startIcon={<DeleteOutlined />}
                      disabled
                    />
                    <CustomButton
                      title={loading ? "Submitting..." : "Submit"}
                      color="primary"
                      variant="filled"
                      type="submit"
                      disabled={loading}
                    />
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddEbooks;
