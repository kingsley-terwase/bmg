import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Button,
  Stack,
  Grid,
  Box,
  Input,
  FormControl,
  Select,
  MenuItem,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { CloseOutlined, UpgradeOutlined } from "@mui/icons-material";
import { CustomButton, InputLabel, RichTextEditor } from "../../../Component";
import { showToast } from "../../../utils/toast";
import { useFetchCategories } from "../../../Hooks/Dashboard/categories";
import {
  useGetServiceFaq,
  useUpdateServiceFaq,
  useFetchServiceFaqs,
} from "../../../Hooks/Dashboard/service_faqs";

const EditServiceFaqModal = ({
  open,
  onClose,
  loading: packageLoading,
  faqId,
}) => {
  const updateFaq = useUpdateServiceFaq();
  const { faqData, getFaqData } = useGetServiceFaq();
  const { refetch } = useFetchServiceFaqs();
  const [loading, setLoading] = useState(false);
  const { categories } = useFetchCategories();

  const [form, setForm] = useState({
    question: "",
    answer: "",
    category_id: "",
  });

  useEffect(() => {
    if (open && faqId) {
      getFaqData(faqId);
    }
  }, [open, faqId]);

  useEffect(() => {
    if (faqData) {
      setForm({
        question: faqData.question || "",
        answer: faqData.answer || "",
        category_id: faqData.category_id || "",
      });
    }
  }, [faqData]);

  const handleChange = (field) => (e) => {
    const value = field === "is_active" ? e.target.checked : e.target.value;
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handler for RichTextEditor (receives direct string value)
  const handleAnswerChange = (data) => {
    setForm((prev) => ({
      ...prev,
      answer: data,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...(form.question && { question: form.question.trim() }),
        ...(form.answer && { answer: form.answer.trim() }),
        ...(form.category_id && { category_id: form.category_id }),
      };

      const res = await updateFaq(payload, faqId);
      if (res) {
        showToast.success("Category FAQ updated successfully");
        onClose();
        await refetch();
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      showToast.error("Failed to update category FAQ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 16, top: 16 }}
      >
        <CloseOutlined />
      </IconButton>

      <DialogContent sx={{ p: 4 }}>
        {packageLoading || !faqData ? (
          <Stack spacing={2}>
            <Skeleton height={40} width="60%" />
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={80} />
          </Stack>
        ) : (
          <>
            <Typography variant="h5" fontWeight={700} mb={1}>
              Edit Category FAQ
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
              Update FAQ details.
            </Typography>

            <Box component="form" mt={3}>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid size={{ xs: 12 }}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                      <FormControl fullWidth>
                        <InputLabel text="Select Category" />
                        <Select
                          value={form?.category_id}
                          onChange={handleChange("category_id")}
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
                      <InputLabel text="Question" />
                      <Input
                        disableUnderline
                        fullWidth
                        placeholder="Enter Category FAQ question"
                        value={form.question}
                        onChange={handleChange("question")}
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
                      <RichTextEditor
                        value={form?.answer || ""}
                        onChange={handleAnswerChange}
                        placeholder="Enter Category FAQ answer..."
                        minHeight="150px"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{ textTransform: "none" }}
              >
                Cancel
              </Button>

              <CustomButton
                title={loading ? "Updating..." : "Update FAQ"}
                color="primary"
                variant="filled"
                startIcon={
                  loading ? <CircularProgress size={20} /> : <UpgradeOutlined />
                }
                disabled={loading}
                onClick={handleSubmit}
                sx={{ textTransform: "none", px: 4 }}
              />
            </Stack>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditServiceFaqModal;
