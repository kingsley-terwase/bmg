import { useState } from "react";
import { Box, Stack, Input, Grid } from "@mui/material";
import { toast } from "react-toastify";
import { PagesHeader, CustomButton, InputLabel } from "../../../Component";
import { useNavigate } from "react-router-dom";
import { styles } from "../../../styles/dashboard";
import { useAddAdminRole } from "../../../Hooks/admin_roles";
import { VisibilityOutlined, DeleteOutlined } from "@mui/icons-material";

const AddAdminRole = ({ updateTabType }) => {
  const [role, setRole] = useState("");

  const { addAdminRole, loading } = useAddAdminRole();
  const navigate = useNavigate();
  const formData = {
    role: role
  };

  const setSubmit = (e) => {
    e.preventDefault();
    if (!role) {
      toast.warning("Please enter role!");
      return;
    }
  };

  const handleSubmit = async () => {
    const response = await addAdminRole(formData);
    response && updateTabType("index");
    setRole("");
  };

  return (
    <>
      <PagesHeader
        label="Add Roles"
        desc={"Add admininstrator role, assign privileges and manage roles status"}
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
          }
        ]}
      />
      <Box sx={styles.card}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 12 }}>
            <InputLabel text="Enter Role Type" />
            <Input
              disableUnderline
              sx={styles.input}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </Grid>
        </Grid>
        <Stack direction="row" alignItems="center" justifyContent="end" gap={2}>
          <CustomButton
            title="Cancel"
            color="warning"
            variant="filled"
            startIcon={<DeleteOutlined />}
            onClick={() => updateTabType("index")}
            sx={{ textTransform: "none", paddingInline: 20 }}
          />
          <CustomButton
            title="Add Role"
            color="primary"
            variant="filled"
            startIcon={<DeleteOutlined />}
            onClick={handleSubmit}
            sx={{ textTransform: "none", paddingInline: 20 }}
          />
        </Stack>
      </Box>
    </>
  );
};

export default AddAdminRole;
