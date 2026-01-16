import React, { useState } from "react";
import {
  Grid,
  Box,
  Input,
  Stack,
  TextField,
  Switch,
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
import { InputLabel, CustomButton, PagesHeader } from "../../../Component";
import { styles } from "../../../styles/dashboard";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../utils/toast";
import { useLoader } from "../../../Contexts/LoaderContext";
import { useFetchCategories } from "../../../Hooks/Dashboard/categories";
import { useAddCategoryFaqs } from "../../../Hooks/Dashboard/category_faq";

const AddCategoryFaqs = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [loading, setLoading] = useState(false);
  const addCategoryFaqs = useAddCategoryFaqs();
  const navigate = useNavigate();
  const { hideLoader, showLoader } = useLoader();
  const { categories } = useFetchCategories();
  const formData = {
    question,
    answer,
    categoryId,
    status,
  };

  const handleSubmit = async () => {
    if (!question.trim() || !answer.trim() || !categoryId) {
      showToast.warning("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    showLoader("Adding Category FAQ...");
    try {
      const response = await addCategoryFaqs(formData);

      if (response) {
        showToast.success("FAQ added successfully!");
        setAnswer("");
        setQuestion("");
        setAnswer("");
        setCategoryId("");
        navigate("/dashboard/category-faqs");
      }
    } catch (error) {
      showToast.error(error);
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  return (
    <>
      <PagesHeader
        label="Add Category Faq"
        desc="Add category faq. Go to view category faqs to manage available faqs"
        searchEnabled={false}
        placeholder={"Search blogs..."}
        actions={[
          {
            label: "View category Faqs",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/category-faqs"),
          },
          {
            label: "View Service Types",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/service-types"),
          },
          {
            label: "Add Service Faqs",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/add/service-faqs"),
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
                    <InputLabel text="Question" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter Category FAQ question"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px",
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 12 }}>
                    <InputLabel text="Answer" />
                    <TextField
                      id="content"
                      multiline
                      rows={7}
                      disableUnderline
                      fullWidth
                      placeholder="Enter the answer to the question..."
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth>
                      <InputLabel text="Select Category" />
                      <Select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        disableUnderline
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <InputLabel text="Select Category" />
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
                        Category FAQ Status
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
            </Grid>
          </Box>

          <Grid container spacing={2} mt={5}>
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
                    onClick={handleSubmit}
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

export default AddCategoryFaqs;
