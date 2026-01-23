import React, { useState } from "react";
import {
  Grid,
  Box,
  Input,
  Stack,
  TextField,
  Switch,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import {
  AddOutlined,
  DeleteOutlined,
  VisibilityOutlined,
  ArrowBackOutlined,
} from "@mui/icons-material";
import { InputLabel, CustomButton, PagesHeader } from "../../../Component";
import { styles } from "../../../styles/dashboard";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../utils/toast";
import { useLoader } from "../../../Contexts/LoaderContext";
import { useAddServiceFaq } from "../../../Hooks/Dashboard/service_faqs";
import { useFetchServices } from "../../../Hooks/Dashboard/services";

const AddServiceFaqs = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [serviceId, setServiceId] = useState("");

  const [loading, setLoading] = useState(false);
  const addServiceFaqs = useAddServiceFaq();
  const navigate = useNavigate();
  const { hideLoader, showLoader } = useLoader();
  const { services } = useFetchServices();
  const formData = {
    question,
    answer,
    service_id: serviceId,
  };

  const handleSubmit = async () => {
    if (!question.trim() || !answer.trim() || !serviceId) {
      showToast.warning("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    showLoader("Adding Service FAQ...");
    try {
      const response = await addServiceFaqs(formData);

      if (response) {
        showToast.success("FAQ added successfully!");
        setAnswer("");
        setQuestion("");
        setAnswer("");
        setServiceId("");
        navigate("/dashboard/admin/services-faqs");
      }
    } catch (error) {
      showToast.error(error);
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  return (
    <>
      <PagesHeader
        label="Add Service Faq"
        desc="Add service faq. Go to view service faqs to manage available faqs"
        searchEnabled={false}
        placeholder={"Search faqs..."}
        actions={[
          {
            label: "View Service Faqs",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/services-faqs"),
          },
          {
            label: "View category Faqs",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/category-faqs"),
          },
          {
            label: "View Service Types",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/service-types"),
          },
        ]}
      />

      <Box sx={styles.card}>
        <Box
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            p: 3,
            bgcolor: "white",
          }}
        >
          <Box component="form" mt={3}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Question" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter service FAQ question"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px",
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 12 }}>
                    <InputLabel text="Answer" />
                    <TextField
                      id="content"
                      multiline
                      rows={7}
                      disableUnderline
                      fullWidth
                      placeholder="Enter the answer to the question..."
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth>
                      <InputLabel text="Select Service" />
                      <Select
                        value={serviceId}
                        onChange={(e) => setServiceId(e.target.value)}
                        disableUnderline
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <InputLabel text="Select service" />
                        </MenuItem>

                        {services.map((service, index) => (
                          <MenuItem key={index} value={service.id}>
                            {service.service_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={2} mt={5}>
            <Grid size={{ xs: 12 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <CustomButton
                  title="Back"
                  color="inherit"
                  variant="outlined"
                  startIcon={<ArrowBackOutlined />}
                  onClick={() => navigate(-1)}
                  sx={{ textTransform: "none", px: 3 }}
                />

                <Stack direction="row" gap={2}>
                  <CustomButton
                    title="Delete"
                    color="danger"
                    variant="outlined"
                    startIcon={<DeleteOutlined />}
                    onClick={() => {}}
                    sx={{ textTransform: "none", px: 4 }}
                  />
                  <CustomButton
                    title={loading ? "Submitting..." : "Submit"}
                    color="primary"
                    variant="filled"
                    disabled={loading}
                    onClick={handleSubmit}
                    sx={{ textTransform: "none", px: 4 }}
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AddServiceFaqs;
