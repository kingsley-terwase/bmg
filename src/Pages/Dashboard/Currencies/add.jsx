import React, { useState } from "react";
import { Grid, Box, Input, Stack, Switch, Typography } from "@mui/material";
import {
  AddOutlined,
  DeleteOutlined,
  VisibilityOutlined,
  ArrowBackOutlined,
} from "@mui/icons-material";
import { InputLabel, CustomButton, PagesHeader } from "../../../Component";
import { styles } from "../../../styles/dashboard";
import { useNavigate } from "react-router-dom";
import { useAddCurrency } from "../../../Hooks/Dashboard/currencies";
import { showToast } from "../../../utils/toast";

const AddCurrency = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [categoryStatus, setCategoryStatus] = useState(true);

  const [loading, setLoading] = useState(false);
  const addCurrency = useAddCurrency();
  const navigate = useNavigate();

  const formData = {
    title,
    category,
  };

  const handleSubmit = async () => {
    if (!title.trim() || !category.trim()) {
      showToast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await addCurrency(formData);

      if (response) {
        showToast.success("Category added successfully!");
        setTitle("");
        setCategory("");
        setCategoryStatus(true);
      }
    } catch (error) {
      showToast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PagesHeader
        label="Add Colors"
        desc="Add colors for the web, users select these colors when placing an order. Go to view colors to manage."
        searchEnabled={false}
        placeholder={"Search colors..."}
        actions={[
          {
            label: "View Colors",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/colors"),
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
                    <InputLabel text="Color Name" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter color name"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px",
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 12 }}>
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
                          {categoryStatus ? "Active" : "Inactive"}
                        </Typography>
                        <Switch
                          checked={categoryStatus}
                          onChange={(e) => setCategoryStatus(e.target.checked)}
                          disabled={loading}
                          color="warning"
                        />
                      </Stack>
                    </Box>
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
