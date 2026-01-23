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
  Switch,
  FormControlLabel,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { CloseOutlined, UpgradeOutlined } from "@mui/icons-material";
import { showToast } from "../../../../utils/toast";
import { CustomButton } from "../../../../Component";
import {
  useGetContentQuality,
  useFetchContentQualtity,
  useUpdateContentQuality,
} from "../../../../Hooks/Dashboard/content_qualities";

const EditContentQualityModal = ({
  open,
  onClose,
  loading: typeLoading,
  qualityId,
}) => {
  const updateContentQuality = useUpdateContentQuality();
  const { qualityData, getContentQuality } = useGetContentQuality();
  const { refetch } = useFetchContentQualtity();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    credits: "",
    price: "",
    description: "",
    is_active: false,
  });

  console.log("qualityData in edit modal:", qualityId);

  useEffect(() => {
    if (open && qualityId) {
      getContentQuality(qualityId);
    }
  }, [open, qualityId]);

  useEffect(() => {
    if (qualityData) {
      setForm({
        name: qualityData.name || "",
        description: qualityData.description || "",
        is_active: Boolean(qualityData.is_active),
      });
    }
  }, [qualityData]);

  const handleChange = (field) => (e) => {
    const value = field === "is_active" ? e.target.checked : e.target.value;

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...(form.name && { name: form.name.trim() }),
        ...(form.description && { description: form.description.trim() }),
        is_active: form.is_active,
      };

      const res = await updateContentQuality(payload, qualityId);
      if (res) {
        showToast.success("Credit package updated successfully");
        onClose();
        await refetch();
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      showToast.error("Failed to update credit package");
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
        {typeLoading || !qualityData ? (
          <Stack spacing={2}>
            <Skeleton height={40} width="60%" />
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={80} />
          </Stack>
        ) : (
          <>
            <Typography variant="h5" fontWeight={700} mb={1}>
              Edit Content Quality
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
              Update Content Quality details and availability.
            </Typography>

            <Stack spacing={3}>
              <TextField
                label=" Name"
                value={form.name}
                onChange={handleChange("name")}
                fullWidth
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

              <CustomButton
                title={loading ? "Updating..." : "Update Package"}
                color="primary"
                variant="filled"
                startIcon={loading ? <CircularProgress /> : <UpgradeOutlined />}
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

export default EditContentQualityModal;
