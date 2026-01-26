/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  Chip,
  Divider,
  Avatar,
  Skeleton,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
  CalendarTodayOutlined,
  UpdateOutlined,
  LocalOfferOutlined,
  CategoryOutlined,
  TagOutlined,
} from "@mui/icons-material";
import { formatDate } from "../../../utils/functions";
import {
  useFetchServiceTypes,
  useGetServiceType,
  useDeleteServiceType,
} from "../../../Hooks/Dashboard/service_types";
import { BASE_IMAGE_URL } from "../../../Config/paths";
import { ConfirmDeleteModal } from "../../../Component";
import { showToast } from "../../../utils/toast";
import { useNavigate } from "react-router-dom";

const ServiceTypeModal = ({ open, onClose, typeId }) => {
  const {
    typeData,
    loading: typeLoading,
    getServiceType,
  } = useGetServiceType();
  const { refetch } = useFetchServiceTypes();
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const deleteServiceType = useDeleteServiceType();
  const navigate = useNavigate();

  useEffect(() => {
    if (open && typeId) {
      getServiceType(typeId);
    }
  }, [open, typeId]);

  const handleConfirm = () => {
    setOpenDelete(true);
  };

  const handleEdit = () => {
    navigate(`/dashboard/admin/edit/service-type`, {
      state: { data: typeData },
    });
    onClose();
  };

  const handleDelete = async () => {
    if (!typeData?.id) {
      showToast.error("Invalid method ID");
      return;
    }

    setLoading(true);
    try {
      const res = await deleteServiceType(typeData.id);
      if (res) {
        setOpenDelete(false);
        onClose();
        await refetch();
        showToast.success("Payment method deleted successfully.");
      }
    } catch (error) {
      console.error(error);
      showToast.error("Failed to delete Payment method.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 16, top: 16, zIndex: 1 }}
      >
        <CloseOutlined />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        {typeLoading ? (
          <Box sx={{ p: 4 }}>
            <Skeleton variant="rectangular" height={220} />
            <Skeleton height={40} sx={{ mt: 3 }} />
            <Skeleton height={80} sx={{ mt: 2 }} />
          </Box>
        ) : typeData ? (
          <>
            <Box
              sx={{
                height: 280,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {typeData.service_type_image ? (
                <Box
                  component="img"
                  src={`${BASE_IMAGE_URL}/${typeData.service_type_image}`}
                  alt={typeData.service_type_name}
                  sx={{
                    maxHeight: 220,
                    maxWidth: "90%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <Avatar
                  sx={{
                    width: 140,
                    height: 140,
                    bgcolor: "rgba(255,255,255,0.2)",
                  }}
                >
                  <ImageOutlined sx={{ fontSize: 80, color: "white" }} />
                </Avatar>
              )}
            </Box>

            <Box sx={{ p: 4 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box>
                  <Typography variant="h4" fontWeight={700}>
                    {typeData.service_type_name.toUpperCase()}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                    <Chip
                      label={typeData.status ? "Active" : "Inactive"}
                      sx={{
                        bgcolor: typeData.status ? "#4caf50" : "#f44336",
                        color: "white",
                        fontWeight: 600,
                      }}
                      size="small"
                    />
                    {typeData.service_name && (
                      <Chip
                        icon={<CategoryOutlined sx={{ fontSize: 16 }} />}
                        label={typeData.service_name}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 500 }}
                      />
                    )}
                  </Stack>
                </Box>

                {/* Price Badge */}
                <Box
                  sx={{
                    bgcolor: "#4caf50",
                    color: "white",
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ display: "block", opacity: 0.9 }}
                  >
                    Price
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    ${parseFloat(typeData.price).toFixed(2)}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 3 }} />

              {/* Discount Information */}
              {typeData.discount_type && typeData.discount_value && (
                <>
                  <Card
                    sx={{
                      bgcolor: "#fff3e0",
                      border: "2px solid #ffb74d",
                      mb: 3,
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: "#f57c00" }}>
                          <LocalOfferOutlined />
                        </Avatar>
                        <Box flex={1}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={700}
                            color="#f57c00"
                          >
                            Active Discount
                          </Typography>
                          <Typography
                            variant="h5"
                            fontWeight={700}
                            color="#f57c00"
                          >
                            {typeData.discount_type === "percentage"
                              ? `${typeData.discount_value}% OFF`
                              : `$${typeData.discount_value} OFF`}
                          </Typography>
                          {typeData.discount_max_amount && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Maximum discount: ${typeData.discount_max_amount}
                            </Typography>
                          )}
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Description */}
              <Typography
                variant="overline"
                color="text.secondary"
                fontWeight={600}
              >
                Description
              </Typography>
              {typeData.description ? (
                <Box
                  sx={{
                    mt: 1,
                    p: 2,
                    bgcolor: "#f8f9ff",
                    borderRadius: 1,
                    border: "1px solid #e0e0e0",
                  }}
                  dangerouslySetInnerHTML={{ __html: typeData.description }}
                />
              ) : (
                <Typography sx={{ mt: 1, color: "text.secondary" }}>
                  No description provided.
                </Typography>
              )}

              <Divider sx={{ my: 3 }} />

              {/* Service Details */}
              <Typography
                variant="overline"
                color="text.secondary"
                fontWeight={600}
              >
                Service Information
              </Typography>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "#f5f5f5",
                      borderRadius: 1,
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Service ID
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      #{typeData.service_id}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "#f5f5f5",
                      borderRadius: 1,
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Type ID
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      #{typeData.id}
                    </Typography>
                  </Box>
                </Grid>

                {typeData.service_name && (
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "#f0f7ff",
                        borderRadius: 1,
                        border: "1px solid #bbdefb",
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <TagOutlined sx={{ color: "#1976d2", fontSize: 20 }} />
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                          >
                            Parent Service
                          </Typography>
                          <Typography variant="body1" fontWeight={600}>
                            {typeData.service_name}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>
                )}
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography
                variant="overline"
                color="text.secondary"
                fontWeight={600}
              >
                Timeline
              </Typography>

              <Stack spacing={2} sx={{ mt: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    bgcolor: "#f5f5f5",
                    borderRadius: 1,
                  }}
                >
                  <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                    <CalendarTodayOutlined />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" fontWeight={600}>
                      Created At
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(typeData.created_at)}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    bgcolor: "#f5f5f5",
                    borderRadius: 1,
                  }}
                >
                  <Avatar sx={{ bgcolor: "success.main", mr: 2 }}>
                    <UpdateOutlined />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" fontWeight={600}>
                      Last Updated
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(typeData.updated_at)}
                    </Typography>
                  </Box>
                </Box>
              </Stack>

              <Divider sx={{ my: 4 }} />

              {/* Action Buttons */}
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="outlined" onClick={onClose}>
                  Close
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteOutlined />}
                  onClick={handleConfirm}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  startIcon={<EditOutlined />}
                  onClick={handleEdit}
                  sx={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  Edit
                </Button>
              </Stack>
            </Box>
          </>
        ) : (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography color="text.secondary">
              Service type not found
            </Typography>
          </Box>
        )}
      </DialogContent>

      <ConfirmDeleteModal
        open={openDelete}
        title="Delete Service Type"
        itemName={`${typeData?.service_type_name}`}
        loading={loading}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </Dialog>
  );
};

export default ServiceTypeModal;
