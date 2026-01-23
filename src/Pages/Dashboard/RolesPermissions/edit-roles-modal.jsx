/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Stack,
  Switch,
  Box,
  CircularProgress,
  Input,
} from "@mui/material";
import { CustomButton } from "../../../Component";
import { showToast } from "../../../utils/toast";
import { styles } from "../../../styles/dashboard";
import { InputLabel } from "../../../Component";
import { useGetAdminTypes } from "../../../Hooks/Dashboard/admin_types";

const AdminRoleEditModal = ({ open, onClose, role, onUpdate, loading }) => {
  const [status, setStatus] = useState(false);
  const [name, setName] = useState("");
  const { refetch } = useGetAdminTypes();

  useEffect(() => {
    if (!role) return;

    setName(role.name || "");
    setStatus(Boolean(role.status));
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: name.trim(),
      status,
    };
    try {
      const result = await onUpdate({ payload });
      if (result) {
        showToast.success("Admin type updated successfully");
        onClose();
        refetch();
      }
    } catch (error) {
      console.error(error);
      showToast.error("Failed to update admin type");
    }
  };

  if (!open || !role) return null;
  const isDisabled = loading || !name.trim();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit Admin Role</DialogTitle>

      <DialogContent>
        <Stack spacing={3} mt={1}>
          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              p: 3,
              bgcolor: "white",
              mt: 3,
            }}
          >
            <Box mb={3}>
              <InputLabel text="Enter Role Type" />
              <Input
                disableUnderline
                sx={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                placeholder="e.g Super Admin"
              />
            </Box>
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                p: 3,
                bgcolor: "white",
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                Status
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
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <CustomButton
          title="Cancel"
          variant="outlined"
          onClick={onClose}
          disabled={loading}
          sx={{ textTransform: "none" }}
        />

        <CustomButton
          title={loading ? "Updating..." : "Update"}
          variant="filled"
          color="primary"
          onClick={handleSubmit}
          disabled={isDisabled}
          startIcon={loading ? <CircularProgress size={18} /> : null}
          sx={{ textTransform: "none" }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AdminRoleEditModal;
