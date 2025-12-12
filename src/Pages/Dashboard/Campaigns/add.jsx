import React, { useState } from "react";
import {
  Grid,
  Box,
  Input,
  Stack,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import { toast } from "react-toastify";
import {
  AddOutlined,
  DeleteOutlined,
  VisibilityOutlined,
  ArrowBackOutlined
} from "@mui/icons-material";
import {
  InputLabel,
  CustomButton,
  PagesHeader,
  UploadMedia
} from "../../../Component";
import { styles } from "../../../styles/dashboard";
import { useAddCategories } from "../../../Hooks/categories";
import { useNavigate } from "react-router-dom";

const AddCampaigns = () => {
  const [link, setLink] = useState("");
  const [media, setMedia] = useState("");
  const [mode, setMode] = useState(true);

  const [loading, setLoading] = useState(false);
  const addCategory = useAddCategories();
  const navigate = useNavigate();

  const formData = {
    link,
    media,
    mode
  };

  const handleFilesChange = (files) => {
    setMedia(files);
  };

  const handleSubmitAdmin = async () => {
    if (!link.trim() || !media.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await addCategory(formData);

      if (response) {
        toast.success("Category added successfully!");
        setLink("");
        setMedia("");
        setMode(true);
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
        label="Add Campaign"
        desc="Add campaign posts for the web. Go to view campaigns to manage campaigns"
        searchEnabled={false}
        placeholder={"Search campaigns..."}
        actions={[
          {
            label: "View Campaigns",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/campaigns")
          },
          {
            label: "View Categories",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/categories")
          },
          {
            label: "Add Service",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/services")
          }
        ]}
      />

      <Box sx={styles.card}>
        <Box
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            p: 3,
            bgcolor: "white"
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
                    <InputLabel text="Link" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter link"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px"
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
                        mt: 3
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight={600} mb={2}>
                        Mode
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="body2" fontWeight={500}>
                          {mode ? "ON" : "OFF"}
                        </Typography>
                        <Switch
                          checked={mode}
                          onChange={(e) => setMode(e.target.checked)}
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
                      maxFiles={5}
                      maxSize={10}
                      acceptedFormats={["jpg", "png", "jpeg", "svg", "zip"]}
                      onFilesChange={handleFilesChange}
                      title="Media Upload"
                      description="Add your documents here, and you can upload up to 5 files max"
                    />
                  </Grid>
                </Grid>
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
                    onClick={handleSubmitAdmin}
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

export default AddCampaigns;
