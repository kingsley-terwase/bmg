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
  useGetContentType,
  useFetchContentTypes,
  useUpdateContentType,
} from "../../../../Hooks/Dashboard/content_type";

const EditContentTypeModal = ({
  open,
  onClose,
  loading: typeLoading,
  typeId,
}) => {
  const updateContentType = useUpdateContentType();
  const { typeData, getContentType } = useGetContentType();
  const { refetch } = useFetchContentTypes();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    credits: "",
    price: "",
    description: "",
    is_active: false,
  });

  console.log("typeData in edit modal:", typeId);

  useEffect(() => {
    if (open && typeId) {
      getContentType(typeId);
    }
  }, [open, typeId]);

  useEffect(() => {
    if (typeData) {
      setForm({
        name: typeData.name || "",
        description: typeData.description || "",
        is_active: Boolean(typeData.is_active),
      });
    }
  }, [typeData]);

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

      const res = await updateContentType(payload, typeId);
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
        {typeLoading || !typeData ? (
          <Stack spacing={2}>
            <Skeleton height={40} width="60%" />
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={80} />
          </Stack>
        ) : (
          <>
            <Typography variant="h5" fontWeight={700} mb={1}>
              Edit Content Type
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
              Update Content Type details and availability.
            </Typography>

            <Stack spacing={3}>
              <TextField
                label=" Name"
                value={form.name}
                onChange={handleChange("name")}
                fullWidth
              />

              <TextField
                label="Description"
                value={form.description}
                onChange={handleChange("description")}
                multiline
                minRows={3}
                fullWidth
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={form.is_active}
                    onChange={handleChange("is_active")}
                    color="success"
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

export default EditContentTypeModal;
