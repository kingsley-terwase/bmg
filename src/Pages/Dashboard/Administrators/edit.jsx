import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Input,
  Select,
  FormControl,
  MenuItem,
  Stack,
  CircularProgress,
  Switch,
  Typography,
} from "@mui/material";
import {
  SaveOutlined,
  DeleteOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { InputLabel, CustomButton, PagesHeader } from "../../../Component";
import { validateEmail } from "../../../utils/functions";
import { styles } from "../../../styles/dashboard";
import { useNavigate, useLocation } from "react-router-dom";
import { showToast } from "../../../utils/toast";
import { useGetAdminTypes } from "../../../Hooks/Dashboard/admin_types";
import { useLoader } from "../../../Contexts/LoaderContext";
import {
  useFetchAdmins,
  useUpdateAdmin,
} from "../../../Hooks/Dashboard/admins";

const EditAdminPage = () => {
  const location = useLocation();
  const { state } = location;
  const { data } = state || {};

  const navigate = useNavigate();

  const { showLoader, hideLoader } = useLoader();
  const { adminTypes, loading: typesLoading } = useGetAdminTypes();
  const { refetch } = useFetchAdmins();
  const updateAdmin = useUpdateAdmin();

  const [loading, setLoading] = useState(false);

  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sub_role, setSubRole] = useState([]);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    if (!data) {
      showToast.error("Admin data not found.");
      navigate("/dashboard/view/admins");
      return;
    }

    setFirstname(data.first_name || "");
    setLastname(data.last_name || "");
    setEmail(data.email || "");
    setPhone(data.phone || "");
    setSubRole(data.sub_role || []);
  }, [data, navigate]);

  const adminFormData = {
    sub_role,
    status,
  };

  console.log(sub_role);

  const handleUpdateAdmin = async (e) => {
    e.preventDefault();

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
    showLoader("Updating Administrator...");

    try {
      const response = await updateAdmin(adminFormData, data.id);

      if (response) {
        showToast.success("Administrator updated successfully.");
        await refetch();

        navigate("/dashboard/view/admins");
      }
    } catch (error) {
      showToast.error(error || "Admin update failed.");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  return (
    <>
      <PagesHeader
        label="Edit Administrator"
        desc="Update administrator details and assigned roles"
        searchEnabled={false}
        actions={[
          {
            label: "View Admins",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/view/admins"),
          },
        ]}
      />

      <Box sx={styles.card}>
        <Box component="form" mt={3}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel text="First Name" />
              <Input
                disableUnderline
                fullWidth
                sx={styles.input}
                value={first_name}
                onChange={(e) => setFirstname(e.target.value)}
                disabled
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
                disabled
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
                disabled
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel text="Phone Number" />
              <Input
                disableUnderline
                fullWidth
                sx={styles.input}
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={1.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth disabled={typesLoading}>
                <InputLabel text="Admin Role" />
                <Select
                  multiple
                  value={sub_role}
                  onChange={(e) => setSubRole(e.target.value)}
                  displayEmpty
                  renderValue={(selected) =>
                    selected.length ? (
                      adminTypes
                        .filter((t) => selected.includes(t.id))
                        .map((t) => t.name)
                        .join(", ")
                    ) : (
                      <em>Select admin role(s)</em>
                    )
                  }
                >
                  {typesLoading ? (
                    <MenuItem disabled>
                      <CircularProgress size={18} sx={{ mr: 1 }} />
                      Loading roles...
                    </MenuItem>
                  ) : (
                    adminTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  p: 3,
                  bgcolor: "white",
                  mt: 3,
                }}
              >
                <Typography variant="subtitle1" fontWeight={600} mb={2}>
                  Admin Status
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
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={3}>
            <Grid size={{ xs: 12, md: 6 }} />

            <Grid size={{ xs: 12, md: 6 }}>
              <Stack direction="row" justifyContent="flex-end" gap={2}>
                <CustomButton
                  title="Cancel"
                  color="warning"
                  variant="filled"
                  startIcon={<DeleteOutlined />}
                  onClick={() => navigate(-1)}
                  sx={{ textTransform: "none", paddingInline: 20 }}
                />

                <CustomButton
                  title={loading ? "Updating..." : "Update Administrator"}
                  color="primary"
                  variant="filled"
                  startIcon={<SaveOutlined />}
                  disabled={loading}
                  onClick={handleUpdateAdmin}
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

export default EditAdminPage;
