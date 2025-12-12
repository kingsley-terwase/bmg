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
import {
  InputLabel,
  CustomButton,
  PagesHeader,
  InsightPieCard,
  TopRankingExpertsCard
} from "../../../Component";
import { skills, experience } from "./data";
import { validateEmail } from "../../../utils/functions";
import { styles } from "../../../styles/dashboard";
import { useNavigate } from "react-router-dom";
import { useAddExpert } from "../../../Hooks/experts";

const AddExpertPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [country_id, setCountryId] = useState("");
  const [sub_role, setSubRole] = useState("");

  const [loading, setLoading] = useState(false);

  const addExpert = useAddExpert();

  const navigate = useNavigate();

  const formData = {
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
      const response = await addExpert(formData);

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
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PagesHeader
        label="Add Expert"
        desc={"Add an expert, assign privileges and manage controls"}
        searchEnabled={false}
        actions={[
          {
            label: "View Experts",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/view/admins")
          }
        ]}
      />

      <Box>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          mt={3}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <InsightPieCard
              title="Orders Insight"
              chartData={[
                { name: "Active Experts", value: 5000, color: "#4CAF50" },
                { name: "Suspended Experts", value: 2500, color: "#FF9800" },
                { name: "Terminated Experts", value: 1000, color: "#F44336" }
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TopRankingExpertsCard />
          </Grid>
        </Grid>
      </Box>

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
                <InputLabel text="Skill" />
                <Select
                  value={country_id}
                  onChange={(e) => setCountryId(e.target.value)}
                  disableUnderline
                  sx={styles.input}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <InputLabel text="Select a skill" />
                  </MenuItem>

                  {skills.map((skill) => (
                    <MenuItem key={skill.id} value={skill.id}>
                      {skill.skill}
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
                    <InputLabel text="Select Gender" />
                  </MenuItem>

                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel text="Experience" />
                <Select
                  value={sub_role}
                  onChange={(e) => setSubRole(e.target.value)}
                  disableUnderline
                  sx={styles.input}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <InputLabel text="Select expert experience level" />
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

export default AddExpertPage;
