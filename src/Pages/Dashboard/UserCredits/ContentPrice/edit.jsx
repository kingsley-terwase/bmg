/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
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
import {
  useGetContentPrice,
  useUpdateContentPrice,
} from "../../../../Hooks/Dashboard/content_price";

const EditContentPriceModal = ({ open, onClose, loading, priceId }) => {
  const updatePackage = useUpdateContentPrice();
  const { priceData, getPrice } = useGetContentPrice();

  useEffect(() => {
    if (open && priceId) {
      getPrice(priceId);
    }
  }, [open, priceId]);

  const [form, setForm] = useState({
    content_type_id: "",
    content_quality_id: "",
    cost: "",
    length_seconds: "",
  });

  useEffect(() => {
    if (priceData) {
      setForm({
        content_type_id: priceData.content_type_id,
        content_quality_id: priceData.content_quality_id,
        cost: priceData.cost,
        length_seconds: priceData.length_seconds,
      });
    }
  }, [priceData]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.cost || !form.length_seconds) {
      showToast.warning("Cost and duration are required");
      return;
    }

    const Payload = {
      cost: Number(form.cost),
      length_seconds: Number(form.length_seconds),
    };

    try {
      const res = await updatePackage(Payload, priceId);
      if (res) {
        showToast.success("Content price updated successfully");
        onClose();
      }
    } catch (error) {
      console.error("Error updating content price:", error);
      showToast.error("Failed to update content price");
    }
  };

  if (!priceData) return null;

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
      {loading ? (
        <Stack spacing={2}>
          <Skeleton height={40} width="60%" />
          <Skeleton height={20} width="40%" />
          <Skeleton height={80} />
          <Skeleton height={60} />
        </Stack>
      ) : priceData ? (
        <>
          <DialogContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight={700} mb={1}>
              Edit Content Price
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
              Update pricing for this content configuration.
            </Typography>

            <Stack spacing={3}>
              <TextField
                label="Content Type ID"
                value={form.content_type_id}
                disabled
                fullWidth
              />

              <TextField
                label="Content Quality ID"
                value={form.content_quality_id}
                disabled
                fullWidth
              />

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
                disabled={loading}
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
                {loading ? "Updating..." : "Update"}
              </Button>
            </Stack>
          </DialogContent>
        </>
      ) : (
        <Typography align="center" color="text.secondary">
          No credit package data found with selected ID
        </Typography>
      )}
    </Dialog>
  );
};

export default EditContentPriceModal;
