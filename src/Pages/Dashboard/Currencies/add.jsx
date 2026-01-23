import React, { useState } from "react";
import { Grid, Box, Input, Stack, Switch, Typography } from "@mui/material";
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
import { useAddCurrency } from "../../../Hooks/Dashboard/currencies";
import { showToast } from "../../../utils/toast";
import { useLoader } from "../../../Contexts/LoaderContext";

const AddCurrency = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState(true);
  const [flag, setFlag] = useState(null);

  const [loading, setLoading] = useState(false);
  const addCurrency = useAddCurrency();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  const formData = {
    code,
    name,
    image: flag,
    status,
  };

  const handleFilesChange = (files) => {
    setFlag(files);
  };

  const handleSubmit = async () => {
    if (!code.trim() || !name.trim()) {
      showToast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    showLoader("Adding Currency...");
    try {
      const response = await addCurrency(formData);

      if (response) {
        showToast.success("Currency added successfully!");
        setCode("");
        setName("");
        setStatus(true);
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
        label="Add Currency"
        desc="Add currencies, services and gigs and returned in selected currencies, users can also select these currencies when placing an order. Go to view currencies to manage."
        actions={[
          {
            label: "View Currencies",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/currencies"),
          },
          {
            label: "View Services",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/services"),
          },
          {
            label: "Add Resource",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/resources"),
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
                    <InputLabel text="Currency Name" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter currency name"
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
                    <InputLabel text="Currency Code" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter currency code"
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
                  <Grid size={{ xs: 12 }}>
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
                        Status
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
                <UploadMedia
                  mode="single"
                  maxFiles={1}
                  maxSize={2}
                  acceptedFormats={["jpg", "png", "jpeg", "svg", "zip"]}
                  onFilesChange={handleFilesChange}
                  title="Upload Currency Flag"
                  description="Add your documents here, and you can upload up to 5 files max"
                />
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={2} mt={3}>
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

export default AddCurrency;
