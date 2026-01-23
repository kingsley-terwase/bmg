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
import {
  useUpdatePackage,
  useGetPackage,
  useFetchPackages,
} from "../../../../Hooks/Dashboard/credit_packages";
import { CustomButton } from "../../../../Component";

const EditCreditPackageModal = ({
  open,
  onClose,
  loading: packageLoading,
  typeId,
}) => {
  const updatePackage = useUpdatePackage();
  const { packageData, getPackage } = useGetPackage();
  const { refetch } = useFetchPackages;
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    credits: "",
    price: "",
    description: "",
    is_active: false,
  });

  useEffect(() => {
    if (open && typeId) {
      getPackage(typeId);
    }
  }, [open, typeId]);

  useEffect(() => {
    if (packageData) {
      setForm({
        name: packageData.name || "",
        credits: packageData.credits ?? "",
        price: packageData.price ?? "",
        description: packageData.description || "",
        is_active: Boolean(packageData.is_active),
      });
    }
  }, [packageData]);

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
        ...(form.credits !== "" && { credits: Number(form.credits) }),
        ...(form.price !== "" && { price: form.price }),
        ...(form.description && { description: form.description.trim() }),
        is_active: form.is_active,
      };

      const res = await updatePackage(payload, typeId);
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
        {packageLoading || !packageData ? (
          <Stack spacing={2}>
            <Skeleton height={40} width="60%" />
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={80} />
          </Stack>
        ) : (
          <>
            <Typography variant="h5" fontWeight={700} mb={1}>
              Edit Credit Package
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
              Update package details and availability.
            </Typography>

            <Stack spacing={3}>
              <TextField
                label="Package Name"
                value={form.name}
                onChange={handleChange("name")}
                fullWidth
              />

              <TextField
                label="Credits"
                type="number"
                value={form.credits}
                onChange={handleChange("credits")}
                fullWidth
              />

              <TextField
                label="Price"
                value={form.price}
                onChange={handleChange("price")}
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

export default EditCreditPackageModal;
