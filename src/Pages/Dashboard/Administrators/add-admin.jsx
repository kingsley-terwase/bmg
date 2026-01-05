import React, { useState } from "react";
import {
  Grid,
  Box,
  Input,
  Select,
  FormControl,
  MenuItem,
  Stack,
  CircularProgress
} from "@mui/material";
import {
  AddOutlined,
  DeleteOutlined,
  VisibilityOutlined
} from "@mui/icons-material";
import { InputLabel, CustomButton, PagesHeader } from "../../../Component";
import { validateEmail } from "../../../utils/functions";
import { styles } from "../../../styles/dashboard";
import { useAddAdmin } from "../../../Hooks/admins";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../utils/toast";
import { useGetAdminTypes } from "../../../Hooks/admin_types";

const AddAdminPage = () => {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sub_role, setSubRole] = useState([]);

  const [loading, setLoading] = useState(false);

  const submitAdmin = useAddAdmin();
  const { adminTypes, loading: typesLoading } = useGetAdminTypes();
  const navigate = useNavigate();

  console.log("administrator TYPES:", adminTypes);

  const adminFormData = {
    first_name,
    last_name,
    email,
    phone,
    sub_role
  };

  const handleSubmitAdmin = async () => {
    if (
      !first_name.trim() ||
      !last_name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      sub_role.length === 0 ||
      !validateEmail(email)
    ) {
      showToast.warning("Please fill in all fields correctly.");
      return;
    }

    setLoading(true);
    try {
      const response = await submitAdmin(adminFormData);

      if (response) {
        setFirstname("");
        setLastname("");
        setEmail("");
        setPhone("");
        setSubRole([]);
      }
    } catch (error) {
      showToast.error(error || "Admin registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PagesHeader
        label="Add Administrator"
        desc={"Add an administrator, assign privileges and manage controls"}
        searchEnabled={false}
        actions={[
          {
            label: "View Admins",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/view/admins")
          },
          {
            label: "Manage Roles",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/view/admin-roles")
          }
        ]}
      />

      <Box sx={styles.card}>
        <Box component="form" mt={3}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel text="First Name" mb />
              <Input
                disableUnderline
                fullWidth
                sx={styles.input}
                value={first_name}
                placeholder=""
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel text="Last Name" />
              <Input
                disableUnderline
                fullWidth
                sx={styles.input}
                value={last_name}
                onChange={(e) => setLastname(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={1.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel text="Email Address" />
              <Input
                disableUnderline
                fullWidth
                sx={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel text="Phone Number" />
              <Input
                disableUnderline
                fullWidth
                sx={styles.input}
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={1.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel text="Admin Role" />
                <Select
                  multiple
                  value={sub_role}
                  onChange={(e) => setSubRole(e.target.value)}
                  disableUnderline
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Select admin role(s)</em>;
                    }
                    return selected.join(", ");
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Select admin role</em>
                  </MenuItem>

                  {adminTypes.map((type) => (
                    <MenuItem key={type.id} value={type.name}>
                      {typesLoading ? (
                        <CircularProgress
                          color="secondary"
                          sx={{ display: "block", marginX: "auto" }}
                        />
                      ) : (
                        type.name
                      )}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={3}>
            <Grid size={{ xs: 12, md: 6 }}></Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Stack direction="row" justifyContent="flex-end" gap={2}>
                <CustomButton
                  title="Cancel"
                  color="warning"
                  variant="filled"
                  startIcon={<DeleteOutlined />}
                  onClick={() => {}}
                  sx={{ textTransform: "none", paddingInline: 20 }}
                />

                <CustomButton
                  title={loading ? "Adding..." : "Add Administrator"}
                  color="primary"
                  variant="filled"
                  startIcon={<AddOutlined />}
                  disabled={loading}
                  onClick={handleSubmitAdmin}
                  sx={{ textTransform: "none", paddingInline: 20 }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AddAdminPage;
