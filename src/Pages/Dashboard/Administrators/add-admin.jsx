import React, { useState } from "react";
import {
  Grid,
  Box,
  Input,
  Select,
  FormControl,
  MenuItem,
  Stack
} from "@mui/material";
import { toast } from "react-toastify";
import {
  AddOutlined,
  DeleteOutlined,
  VisibilityOutlined
} from "@mui/icons-material";
import { InputLabel, CustomButton, PagesHeader } from "../../../Component";
import { countries, adminTypes } from "./data";
import { validateEmail } from "../../../utils/functions";
import { styles } from "../../../styles/dashboard";
import { useAddAdmin } from "../../../Hooks/admins";
import { useNavigate } from "react-router-dom";

const AddAdminPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [country_id, setCountryId] = useState("");
  const [sub_role, setSubRole] = useState("");

  const [loading, setLoading] = useState(false);

  const submitAdmin = useAddAdmin();

  // If your API hooks work, replace dummyCountries/dummyAdminTypes here:
  const countryData = countries;
  const admin_types = adminTypes;

  const navigate = useNavigate();

  const adminFormData = {
    firstname,
    lastname,
    email,
    phone,
    gender,
    country_id: String(country_id),
    sub_role: String(sub_role)
  };

  const handleSubmitAdmin = async () => {
    if (
      !firstname.trim() ||
      !lastname.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !gender ||
      !country_id ||
      !sub_role ||
      !validateEmail(email)
    ) {
      toast.error("Please fill in all fields correctly.");
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
        setGender("");
        setCountryId("");
        setSubRole("");
      }
    } catch (error) {
      toast.error("Admin registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PagesHeader
        title="Add Administrator"
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
                value={firstname}
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
                value={lastname}
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
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel text="Country" />
                <Select
                  value={country_id}
                  onChange={(e) => setCountryId(e.target.value)}
                  disableUnderline
                  sx={styles.input}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <em>Select a country</em>
                  </MenuItem>

                  {countryData.map((country) => (
                    <MenuItem key={country.id} value={country.id}>
                      {country.country_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel text="Gender" />
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  disableUnderline
                  sx={styles.input}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <em>Select gender</em>
                  </MenuItem>

                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel text="Admin Role" />
                <Select
                  value={sub_role}
                  onChange={(e) => setSubRole(e.target.value)}
                  disableUnderline
                  sx={styles.input}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <em>Select admin role</em>
                  </MenuItem>

                  {admin_types.map((type) => (
                    <MenuItem key={type.admin_type} value={type.admin_type}>
                      {type.admin_type}
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
