/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Button,
  Stack,
  TextField,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { showToast } from "../../../../utils/toast";
import { useFetchContentQualtity } from "../../../../Hooks/Dashboard/content_qualities";
import { useFetchContentTypes } from "../../../../Hooks/Dashboard/content_type";
import { InputLabel } from "../../../../Component";
import { useCreateContentPrice } from "../../../../Hooks/Dashboard/content_price";

const AddContentPrice = ({ open, onClose }) => {
  const createContentPrice = useCreateContentPrice();

  const [form, setForm] = useState({
    content_type_id: "",
    content_quality_id: "",
    cost: "",
    length_seconds: "",
  });

  const [loading, setLoading] = useState(false);
  const { types } = useFetchContentTypes();
  const { qualities } = useFetchContentQualtity();

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { content_type_id, content_quality_id, cost, length_seconds } = form;

    if (!content_type_id || !content_quality_id || !cost || !length_seconds) {
      showToast.warning("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await createContentPrice({
        content_type_id: Number(content_type_id),
        content_quality_id: Number(content_quality_id),
        cost: Number(cost),
        length_seconds: Number(length_seconds),
      });

      if (res) {
        showToast.success("Content price created successfully");
        onClose();
      }
    } catch (error) {
      showToast.error(error?.message || "Failed to create content price");
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
          Add Content Price
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Define pricing based on content type and quality.
        </Typography>

        <Stack spacing={3}>
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel text="Content Type" />
              <Select
                value={form.content_type_id}
                onChange={handleChange("content_type_id")}
                disableUnderline
                displayEmpty
              >
                <MenuItem value="" disabled>
                  <InputLabel text="Select content type" />
                </MenuItem>

                {types.map((type, index) => (
                  <MenuItem key={index} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel text="Content Quality Type " />
              <Select
                value={form.content_quality_id}
                onChange={handleChange("content_quality_id")}
                disableUnderline
                displayEmpty
              >
                <MenuItem value="" disabled>
                  <InputLabel text="Select content quality type " />
                </MenuItem>

                {qualities.map((quality, index) => (
                  <MenuItem key={index} value={quality.id}>
                    {quality.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <TextField
            label="Cost"
            type="number"
            value={form.cost}
            onChange={handleChange("cost")}
            required
            fullWidth
          />

          <TextField
            label="Length (seconds)"
            type="number"
            value={form.length_seconds}
            onChange={handleChange("length_seconds")}
            required
            fullWidth
          />
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{ textTransform: "none" }}
            disabled={loading}
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

export default AddContentPrice;
