import { useState, useCallback } from "react";
import {
  Grid,
  Box,
  Input,
  Select,
  FormControl,
  MenuItem,
  CircularProgress,
  Stack
} from "@mui/material";
import {
  AddOutlined,
  DeleteOutlined,
  VisibilityOutlined
} from "@mui/icons-material";
import { InputLabel, CustomButton, PagesHeader } from "../../../Component";
import { skills, experience } from "./data";
import { validateEmail } from "../../../utils/functions";
import { styles } from "../../../styles/dashboard";
import { useNavigate } from "react-router-dom";
import { useAddExpert } from "../../../Hooks/experts";
import { showToast } from "../../../utils/toast";
import { useLoader } from "../../../Contexts/LoaderContext";

const INITIAL_FORM_STATE = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  skill: "",
  experience: ""
};

const AddExpertPage = () => {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const { hideLoader, showLoader } = useLoader();

  const addExpert = useAddExpert();
  const navigate = useNavigate();

  const handleChange = useCallback(
    (field) => (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    },
    []
  );

  const validateForm = () => {
    const { firstname, lastname, email, phone, skill, experience } = form;

    if (
      !firstname.trim() ||
      !lastname.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !skill ||
      !experience
    ) {
      showToast.error("Please fill in all fields.");
      return false;
    }

    if (!validateEmail(email)) {
      showToast.error("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      showLoader();
      const response = await addExpert(form);

      if (response) {
        showToast.success("Expert added successfully");
        setForm(INITIAL_FORM_STATE);
        navigate("/dashboard/view/experts");
      }
    } catch (error) {
      showToast.error(error.message || "Failed to add expert");
    } finally {
      hideLoader();
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/view/experts");
  };

  return (
    <>
      <PagesHeader
        label="Add Expert"
        desc="Add an expert, assign privileges and manage controls"
        searchEnabled={false}
        actions={[
          {
            label: "View Experts",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/view/experts")
          }
        ]}
      />

      <Box sx={styles.card}>
        <Box component="form" mt={3}>
          {/* Names */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel text="First Name" />
              <Input
                disableUnderline
                fullWidth
                sx={styles.input}
                value={form.firstname}
                onChange={handleChange("firstname")}
                disabled={loading}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel text="Last Name" />
              <Input
                disableUnderline
                fullWidth
                sx={styles.input}
                value={form.lastname}
                onChange={handleChange("lastname")}
                disabled={loading}
              />
            </Grid>
          </Grid>

          {/* Contact */}
          <Grid container spacing={2} mt={1.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel text="Email Address" />
              <Input
                disableUnderline
                fullWidth
                sx={styles.input}
                value={form.email}
                onChange={handleChange("email")}
                disabled={loading}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel text="Phone Number" />
              <Input
                disableUnderline
                fullWidth
                type="number"
                sx={styles.input}
                value={form.phone}
                onChange={handleChange("phone")}
                disabled={loading}
              />
            </Grid>
          </Grid>

          {/* Skill & Experience */}
          <Grid container spacing={2} mt={1.5}>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel text="Skill" />
                <Select
                  value={form.skill}
                  onChange={handleChange("skill")}
                  disableUnderline
                  sx={styles.input}
                  displayEmpty
                  disabled={loading}
                >
                  <MenuItem value="" disabled>
                    Select a skill
                  </MenuItem>
                  {skills.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.skill}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel text="Experience" />
                <Select
                  value={form.experience}
                  onChange={handleChange("experience")}
                  disableUnderline
                  sx={styles.input}
                  displayEmpty
                  disabled={loading}
                >
                  <MenuItem value="" disabled>
                    Select experience level
                  </MenuItem>
                  {experience.map((exp) => (
                    <MenuItem key={exp.experience} value={exp.experience}>
                      {exp.experience}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Actions */}
          <Grid container spacing={2} mt={3}>
            <Grid size={{ xs: 12, md: 6 }} />

            <Grid size={{ xs: 12, md: 6 }}>
              <Stack direction="row" justifyContent="flex-end" gap={2}>
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
                  title={loading ? "Adding..." : "Add Expert"}
                  color="primary"
                  variant="filled"
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <AddOutlined />
                  }
                  disabled={loading}
                  type="submit"
                  onClick={handleSubmit}
                  sx={{ textTransform: "none", px: 4 }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AddExpertPage;
