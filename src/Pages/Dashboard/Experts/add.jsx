import { useState } from "react";
import {
  Grid,
  Box,
  Input,
  Select,
  FormControl,
  MenuItem,
  CircularProgress,
  Stack,
} from "@mui/material";
import {
  AddOutlined,
  DeleteOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { InputLabel, CustomButton, PagesHeader } from "../../../Component";
import { level } from "./data";
import { validateEmail } from "../../../utils/functions";
import { styles } from "../../../styles/dashboard";
import { useNavigate } from "react-router-dom";
import { useAddExpert } from "../../../Hooks/Dashboard/experts";
import { showToast } from "../../../utils/toast";
import { useLoader } from "../../../Contexts/LoaderContext";
import { useFetchServices } from "../../../Hooks/Dashboard/services";

const AddExpertPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skill, setSkill] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);

  const addExpert = useAddExpert();
  const navigate = useNavigate();
  const { hideLoader, showLoader } = useLoader();
  const { services } = useFetchServices();

  const validateForm = () => {
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

    setLoading(true);
    showLoader("Adding Expert...");

    try {
      const payload = {
        first_name: firstname,
        last_name: lastname,
        email: email,
        skill,
        phone,
        experience,
      };
      console.log("PayLoad:", payload);

      const response = await addExpert(payload);
      if (response) {
        showToast.success("Expert added successfully!");
        setFirstname("");
        setEmail("");
        setLastname("");
        setPhone("");
        navigate("/dashboard/view/experts");
      }
    } catch (error) {
      showToast.error(error || "Failed to add expert");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/admin/experts");
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
            onClick: () => navigate("/dashboard/admin/experts"),
          },
          {
            label: "Add Customer",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/customer"),
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
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel text="Phone Number" />
              <Input
                disableUnderline
                fullWidth
                type="tel"
                sx={styles.input}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={1.5}>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel text="Skill" />
                <Select
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  disableUnderline
                  sx={styles.input}
                  displayEmpty
                  disabled={loading}
                >
                  <MenuItem value="" disabled>
                    Select a skill
                  </MenuItem>

                  {services?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.service_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel text="Experience" />
                <Select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  disableUnderline
                  sx={styles.input}
                  displayEmpty
                  disabled={loading}
                >
                  <MenuItem value="" disabled>
                    Select experience level
                  </MenuItem>
                  {level.map((level) => (
                    <MenuItem key={level.experience} value={level.experience}>
                      {level.experience}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
