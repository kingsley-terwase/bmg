import React, { useState } from "react";
import {
  Grid,
  Box,
  Input,
  Stack,
  TextField,
  Switch,
  Typography,
} from "@mui/material";
import {
  AddOutlined,
  DeleteOutlined,
  VisibilityOutlined,
  ArrowBackOutlined,
} from "@mui/icons-material";
import {
  InputLabel,
  CustomButton,
  PagesHeader,
  UploadMedia,
} from "../../../Component";
import { styles } from "../../../styles/dashboard";
import { useNavigate } from "react-router-dom";
import { useAddPayMethods } from "../../../Hooks/Dashboard/payment_methods";
import { showToast } from "../../../utils/toast";
import { useLoader } from "../../../Contexts/LoaderContext";

const AddPaymentMethods = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);
  const addPayMethod = useAddPayMethods();
  const navigate = useNavigate();
  const { hideLoader, showLoader } = useLoader();

  const formData = {
    name,
    description,
    logo,
    code,
  };

  const handleSubmit = async () => {
    if (!name.trim() || !description.trim() || !code) {
      showToast.warning("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    showLoader("Adding Payment Method...");
    try {
      const response = await addPayMethod(formData);

      if (response) {
        showToast.success("Method added successfully!");
        setDescription("");
        setName("");
        setLogo(null);
        setCode("");
        navigate("/dashboard/manage/payment-methods");
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
        label="Add Pament Method"
        desc="Add payment method. Go to view payment methods to manage available methods"
        searchEnabled={false}
        placeholder={"Search blogs..."}
        actions={[
          {
            label: "View Payment Methods",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/manage/payment-methods"),
          },
          {
            label: "View Service Types",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/service-types"),
          },
          {
            label: "Add Service",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/services"),
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
                    <InputLabel text="Name" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter Payment method name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px",
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Code" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter payment method code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
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
                    <InputLabel text="Description" />
                    <TextField
                      id="content"
                      multiline
                      rows={7}
                      disableUnderline
                      fullWidth
                      placeholder="Describe payment method..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Box
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 2,
                        p: 3,
                        bgcolor: "white",
                        mt: 2,
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight={600} mb={2}>
                        Payment method Status
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
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <UploadMedia
                      mode="single"
                      maxFiles={1}
                      maxSize={2}
                      onFilesChange={setLogo}
                      acceptedFormats={["jpg", "png", "jpeg", "svg", "zip"]}
                      title="Category Image Upload"
                      description="Add your documents here, and you can upload max of 1 file only"
                    />
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

export default AddPaymentMethods;
