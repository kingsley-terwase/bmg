import { useAddAdmin } from "../../../hooks/admin";
import { useState } from "react";
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
import { styles } from "./styles";
import { AddOutlined, DeleteOutlined } from "@mui/icons-material";
import { InputLabel, CustomButton, HeaderBreadCrumb } from "../../../Component";
import { countries, adminTypes } from "./data";
import { validateEmail } from "../../../utils/functions";

const AddAdminPage = ({ updateTabType }) => {
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
        updateTabType("index");
      }
    } catch (error) {
      toast.error("Admin registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderBreadCrumb
        label="Add Administrator"
        desc="Add an administrator, assign privileges and manage controls"
      />

      <Box component="form" mt={3}>
        {/* FIRST + LAST NAME */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <InputLabel text="First Name" />
            <Input
              disableUnderline
              fullWidth
              sx={styles.input}
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
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

        {/* EMAIL + PHONE */}
        <Grid container spacing={2} mt={1.5}>
          <Grid item xs={12} md={6}>
            <InputLabel text="Email Address" />
            <Input
              disableUnderline
              fullWidth
              sx={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel text="Mobile No. (with country code)" />
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

        {/* COUNTRY - GENDER - ADMIN ROLE */}
        <Grid container spacing={2} mt={1.5}>
          <Grid item xs={12} md={4}>
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

          <Grid item xs={12} md={4}>
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

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel text="Admin Role Type" />
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

        {/* ACTION BUTTONS */}
        <Grid container spacing={2} mt={3}>
          <Grid item xs={12} md={6}></Grid>

          <Grid item xs={12} md={6}>
            <Stack direction="row" justifyContent="flex-end" gap={2}>
              <CustomButton
                title="Cancel"
                color="warning"
                variant="filled"
                startIcon={<DeleteOutlined />}
                onClick={() => updateTabType("index")}
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
    </>
  );
};

export default AddAdminPage;
