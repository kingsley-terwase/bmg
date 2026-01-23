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
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { showToast } from "../../../../utils/toast";
import { useCreateContentQuality } from "../../../../Hooks/Dashboard/content_qualities";

const AddContentQualities = ({ open, onClose }) => {
  const createContentQuality = useCreateContentQuality();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast.warning("Name is required");
      return;
    }

    try {
      setLoading(true);

      const res = await createContentQuality({ name: name.trim() });
      if (res) {
        showToast.success("Content quality created successfully");
        setName("");
        onClose();
      }
    } catch (error) {
      showToast.error(error?.message || "Failed to create content quality");
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
          Add Content Quality
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Create a new content quality for generating AI content services.
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="Content Quality Name"
            placeholder="e.g Premium, Standard, Basic"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            disabled={loading}
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

export default AddContentQualities;
