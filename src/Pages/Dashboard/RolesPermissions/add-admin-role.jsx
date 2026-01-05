import { useState, useCallback } from "react";
import { Box, Stack, Input, Grid, Switch, Typography, CircularProgress } from "@mui/material";
import { PagesHeader, CustomButton, InputLabel } from "../../../Component";
import { useNavigate } from "react-router-dom";
import { styles } from "../../../styles/dashboard";
import { useAddAdminRole } from "../../../Hooks/admin_types";
import { VisibilityOutlined, DeleteOutlined } from "@mui/icons-material";
import { showToast } from "../../../utils/toast";
import { useLoader } from "../../../Contexts/LoaderContext";

const INITIAL_FORM_STATE = {
  name: "",
  status: false
};

const AddAdminRole = () => {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const {hideLoader, showLoader} = useLoader();

  const { addAdminRole, loading } = useAddAdminRole();
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, name: value }));
  }, []);

  const handleToggle = useCallback((e) => {
    const { checked } = e.target;
    setForm((prev) => ({ ...prev, status: checked }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      showToast.warning("Please enter role!");
      return;
    }

    try {
      showLoader()
      const response = await addAdminRole(form);

      if (response) {
        showToast.success("Role added successfully");
        navigate("/dashboard/view/admin-roles");
      }
    } catch (error) {
      showToast.error(error || "Failed to add role");
    }finally{
      hideLoader()
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/view/admin-roles");
  };

  return (
    <>
      <PagesHeader
        label="Add Roles"
        desc="Add administrator role, assign privileges and manage role status"
        searchEnabled={false}
        actions={[
          {
            label: "View Roles",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/view/admin-roles")
          },
          {
            label: "Manage Admins",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/view/admins")
          },
          {
            label: "Manage Permissions",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/manage/admin-permissions")
          }
        ]}
      />

      <Box sx={styles.card}>
        <Grid container spacing={2} mb={5}>
          <Grid size={{ xs: 12, md: 12 }}>
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                p: 3,
                bgcolor: "white",
                mt: 3
              }}
            >
              {/* Role Input */}
              <Box mb={3}>
                <InputLabel text="Enter Role Type" />
                <Input
                  disableUnderline
                  sx={styles.input}
                  value={form.name}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="e.g Super Admin"
                />
              </Box>

              {/* Status */}
              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                Status
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="body2" fontWeight={500}>
                  {form.status ? "Active" : "Inactive"}
                </Typography>
                <Switch
                  checked={form.status}
                  onChange={handleToggle}
                  disabled={loading}
                  color="warning"
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>

        {/* Actions */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          gap={2}
        >
          <CustomButton
            title="Cancel"
            color="warning"
            variant="filled"
            startIcon={<DeleteOutlined />}
            onClick={handleCancel}
            disabled={loading}
            sx={{ textTransform: "none", px: 4 }}
          />

          <CustomButton
            title={loading ? "Adding..." : "Add Role"}
            color="primary"
            variant="filled"
            startIcon={loading ? <CircularProgress size={16} /> : <DeleteOutlined />}
            disabled={loading}
            onClick={handleSubmit}
            sx={{ textTransform: "none", px: 4 }}
          />
        </Stack>
      </Box>
    </>
  );
};

export default AddAdminRole;
