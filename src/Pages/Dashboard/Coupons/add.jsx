import React, { useState } from "react";
import {
  Grid,
  Box,
  Input,
  Stack,
  Switch,
  TextField,
  Typography,
  Chip,
  MenuItem,
  Select,
  FormControl
} from "@mui/material";
import { toast } from "react-toastify";
import {
  AddOutlined,
  DeleteOutlined,
  VisibilityOutlined,
  ArrowBackOutlined
} from "@mui/icons-material";
import { InputLabel, CustomButton, PagesHeader } from "../../../Component";
import { styles } from "../../../styles/dashboard";
import { useAddCategories } from "../../../Hooks/categories";
import { useNavigate } from "react-router-dom";
import { discountTypes } from "./data";

const AddCoupon = () => {
  const [code, setCode] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState([]);
  const [discount, setDiscount] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [mode, setMode] = useState(true);
  const [reusability, setReusability] = useState("");
  const [type, setType] = useState("");

  const [loading, setLoading] = useState(false);
  const addCategory = useAddCategories();
  const navigate = useNavigate();

  const formData = {
    code,
    validFrom,
    validTo,
    reusability,
    discount
  };

  const handleSubmitAdmin = async () => {
    if (
      !code.trim() ||
      !validFrom.trim() ||
      reusability.length === 0 ||
      !validTo
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await addCategory(formData);

      if (response) {
        toast.success("Category added successfully!");
        setCode("");
        setValidFrom("");
        setValidTo([]);
        setReusability(true);
        setType("");
        setDiscount("");
        setMaxDiscount("");
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
        label="Add Coupon"
        desc="Add coupon codes for discount on orders. Go to view coupons to manage coupons"
        searchEnabled={false}
        placeholder={"Search categories..."}
        actions={[
          {
            label: "View Coupons",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/coupons")
          },
          {
            label: "Add Gifts",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/gifts")
          },
          {
            label: "View Orders",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/orders")
          }
        ]}
      />

      <Box sx={styles.card}>
        <Box component="form" mt={3}>
          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              p: 3,
              bgcolor: "white",
              mt: 2
            }}
          >
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Code" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter coupon code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
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
                    <InputLabel text="Valid From" />
                    <Input
                      disableUnderline
                      fullWidth
                      type="date"
                      value={validFrom}
                      onChange={(e) => setValidFrom(e.target.value)}
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
                    <InputLabel text="Valid Untill" />
                    <Input
                      disableUnderline
                      fullWidth
                      type="date"
                      value={validTo}
                      onChange={(e) => setValidTo(e.target.value)}
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
                    <InputLabel text="Type" />
                    <FormControl fullWidth>
                      <Select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        disableUnderline
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <InputLabel text="Select Discount type" />
                        </MenuItem>

                        {discountTypes.map((type, i) => (
                          <MenuItem key={i} value={type.category}>
                            {type.category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Discount" />
                    <Input
                      disableUnderline
                      fullWidth
                      value={reusability}
                      onChange={(e) => setReusability(e.target.value)}
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
                    <InputLabel text="Max Discount" />
                    <Input
                      disableUnderline
                      fullWidth
                      value={maxDiscount}
                      onChange={(e) => setMaxDiscount(e.target.value)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px"
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 12 }}>
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

export default AddCoupon;
