/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
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
  VisibilityOutlined,
  ArrowBackOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

import {
  InputLabel,
  CustomButton,
  PagesHeader,
  UploadMedia,
} from "../../../Component";
import { styles } from "../../../styles/dashboard";
import { showToast } from "../../../utils/toast";
import { useLoader } from "../../../Contexts/LoaderContext";
import {
  useUpdatePayMethod,
  useFetchPayMethods,
} from "../../../Hooks/Dashboard/payment_methods";
import { urlToBase64 } from "../../../utils/functions";

const EditPaymentMethod = () => {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const updatePayMethod = useUpdatePayMethod();
  const { refetch } = useFetchPayMethods();

  const location = useLocation();
  const { state } = location;
  const { data } = state || {};

  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    code: "",
    logo: null,
    status: false,
  });

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name || "",
        description: data.description || "",
        code: data.code || "",
        logo: data.logo || null,
        status: data.status || false,
      });
    }
  }, [data]);

  const handleChange = (field) => (e) => {
    const value = field === "status" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  console.log("logog", form.logo);

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.code.trim() || !form.description.trim()) {
      showToast.warning("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    showLoader("Updating payment method...");

    try {
      let logoToSubmit = form.logo;
      if (
        logoToSubmit &&
        typeof logoToSubmit === "string" &&
        !logoToSubmit.startsWith("data:")
      ) {
        console.log("Converting URL to base64...");
        logoToSubmit = await urlToBase64(logoToSubmit);
      }
      console.log("logog submitting", logoToSubmit);

      const payload = {
        ...form,
        logo: logoToSubmit,
      };

      console.log("Payload to submit:", payload);

      const result = await updatePayMethod(payload, data.id);

      if (result?.code === 0) {
        showToast.success("Payment method updated successfully");
        await refetch();
        navigate("/dashboard/manage/payment-methods");
      }
    } catch (error) {
      showToast.error(error?.message || "Failed to update payment method");
    } finally {
      hideLoader();
      setSubmitting(false);
    }
  };

  // Guard clause if no data
  if (!data) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>No payment method data found</Typography>
        <CustomButton
          title="Go Back"
          onClick={() => navigate("/dashboard/manage/payment-methods")}
        />
      </Box>
    );
  }

  return (
    <>
      <PagesHeader
        label="Edit Payment Method"
        desc="Update, disable or remove an existing payment method"
        searchEnabled={false}
        actions={[
          {
            label: "View Payment Methods",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/manage/payment-methods"),
          },
        ]}
      />

      <Box sx={styles.card}>
        <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 3 }}>
          <>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <InputLabel text="Name" />
                <Input
                  disableUnderline
                  fullWidth
                  value={form.name}
                  onChange={handleChange("name")}
                  placeholder="Payment method name"
                  sx={inputStyle}
                />

                <InputLabel text="Code" />
                <Input
                  disableUnderline
                  fullWidth
                  value={form.code}
                  onChange={handleChange("code")}
                  placeholder="Payment method code"
                  sx={inputStyle}
                />

                <InputLabel text="Description" />
                <TextField
                  multiline
                  rows={6}
                  fullWidth
                  value={form.description}
                  onChange={handleChange("description")}
                  placeholder="Describe payment method..."
                />

                <Box sx={statusBox}>
                  <Typography fontWeight={600}>
                    Payment Method Status
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography>
                      {form.status ? "Active" : "Inactive"}
                    </Typography>
                    <Switch
                      checked={form.status}
                      onChange={handleChange("status")}
                      color="warning"
                    />
                  </Stack>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <UploadMedia
                  mode="single"
                  maxFiles={1}
                  maxSize={2}
                  onFilesChange={(file) =>
                    setForm((prev) => ({ ...prev, logo: file }))
                  }
                  acceptedFormats={["jpg", "png", "jpeg", "svg"]}
                  title="Payment Method Logo"
                  description="Upload a single logo image"
                  initialImage={data.logo}
                />
              </Grid>
            </Grid>

            <Stack direction="row" justifyContent="space-between" mt={5}>
              <CustomButton
                title="Back"
                variant="outlined"
                startIcon={<ArrowBackOutlined />}
                onClick={() => navigate(-1)}
              />

              <Stack direction="row" spacing={2}>
                <CustomButton
                  title="Save Changes"
                  loading={submitting}
                  startIcon={<SaveOutlined />}
                  onClick={handleSubmit}
                />
              </Stack>
            </Stack>
          </>
        </Box>
      </Box>
    </>
  );
};

export default EditPaymentMethod;

/* =======================
   Styles
======================= */
const inputStyle = {
  border: "1px solid #e0e0e0",
  borderRadius: 1,
  px: 2,
  py: 1.5,
  fontSize: "14px",
  mb: 2,
};

const statusBox = {
  border: "1px solid #e0e0e0",
  borderRadius: 2,
  p: 3,
  mt: 3,
};
