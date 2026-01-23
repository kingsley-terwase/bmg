/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { useCreatePackage } from "../../../../Hooks/Dashboard/credit_packages";
import { showToast } from "../../../../utils/toast";

const AddCreditPackageModal = ({ open, onClose }) => {
  const createPackage = useCreatePackage();

  const [form, setForm] = useState({
    name: "",
    credits: "",
    price: "",
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
    if (!form.name || !form.credits || !form.price) {
      showToast.warning("Name, credits and price are required", "error");
      return;
    }

    try {
      setLoading(true);
      const res = await createPackage({
        ...form,
        credits: Number(form.credits),
      });
      if (res) {
        showToast.success("Package created successfully", "success");
        onClose();
      }
    } catch (error) {
      showToast.error(error?.message || "Failed to create package", "error");
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
          Add Credit Package
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Create a new credit package for users
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="Package Name"
            value={form.name}
            onChange={handleChange("name")}
            required
            fullWidth
          />

          <TextField
            label="Credits"
            type="number"
            value={form.credits}
            onChange={handleChange("credits")}
            required
            fullWidth
          />

          <TextField
            label="Price"
            value={form.price}
            onChange={handleChange("price")}
            required
            fullWidth
          />

          <TextField
            label="Description"
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
            label="Active"
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
            {loading ? "Creating..." : "Create Package"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddCreditPackageModal;
