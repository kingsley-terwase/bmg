/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Stack,
  TextField,
  Switch,
  FormControlLabel,
  Button,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { showToast } from "../../../../utils/toast";
import { useCreateContentType } from "../../../../Hooks/Dashboard/content_type";

const AddContentTypeModal = ({ open, onClose }) => {
  const createContentType = useCreateContentType();

  const [form, setForm] = useState({
    name: "",
    description: "",
    is_active: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    const value = field === "is_active" ? e.target.checked : e.target.value;

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      showToast.warning("Name is required");
      return;
    }

    try {
      setLoading(true);

      const res = await createContentType({
        name: form.name.trim(),
        description: form.description?.trim(),
        is_active: form.is_active,
      });

      if (res) {
        showToast.success("Content type created successfully");
        onClose();
      }
    } catch (error) {
      showToast.error(error?.message || "Failed to create content type");
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
        <Typography variant="h5" fontWeight={700} mb={1}>
          Add Content Type
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Create a new content type to categorize platform resources
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="Name"
            placeholder="e.g Articles, Videos, Podcasts"
            value={form.name}
            onChange={handleChange("name")}
            required
            fullWidth
          />

          <TextField
            label="Description"
            placeholder="Optional description"
            value={form.description}
            onChange={handleChange("description")}
            multiline
            rows={3}
            fullWidth
          />

          <FormControlLabel
            control={
              <Switch
                checked={form.is_active}
                onChange={handleChange("is_active")}
              />
            }
            label={form.is_active ? "Active" : "Inactive"}
          />
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ textTransform: "none" }}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddContentTypeModal;
