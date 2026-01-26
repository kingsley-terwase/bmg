import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Stack,
  Typography,
  Chip,
  Divider,
  Card,
  CardContent,
  Alert,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from "@mui/material";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowBackOutlined,
  CheckCircleOutlined,
  CancelOutlined,
  FeaturedPlayListOutlined,
  AssignmentOutlined,
  DescriptionOutlined,
  UpdateOutlined,
  CalendarTodayOutlined,
  AddOutlined,
  FiberManualRecordOutlined,
  LocalOfferOutlined,
  ImageOutlined,
} from "@mui/icons-material";
import { CustomButton, PagesHeader, ConfirmDeleteModal } from "../../../Component";
import { styles } from "../../../styles/dashboard";
import { useNavigate, useLocation } from "react-router-dom";
import { showToast } from "../../../utils/toast";
import { formatDate } from "../../../utils/functions";
import {
  useGetService,
  useDeleteService,
  useFetchServices,
} from "../../../Hooks/Dashboard/services";
import { BASE_IMAGE_URL } from "../../../Config/paths";

const ServiceDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { serviceId } = state || {};

  const { serviceData, loading: serviceLoading, getService } = useGetService();
  const { refetch } = useFetchServices();
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const deleteService = useDeleteService();

  useEffect(() => {
    if (serviceId) {
      getService(serviceId);
    }
  }, [serviceId]);

  const handleConfirm = () => {
    setOpenDelete(true);
  };

  const handleEdit = () => {
    navigate(`/dashboard/admin/edit/service-type`, {
      state: { data: serviceData },
    });
  };

  const handleDelete = async () => {
    if (!serviceData?.id) {
      showToast.error("Invalid method ID");
      return;
    }

    setLoading(true);
    try {
      const res = await deleteService(serviceData.id);
      if (res) {
        setOpenDelete(false);
        navigate("/dashboard/admin/services");
        await refetch();
        showToast.success("Service deleted successfully.");
      }
    } catch (error) {
      console.error(error);
      showToast.error("Failed to delete Service.");
    } finally {
      setLoading(false);
    }
  };

  const getRequirementDetails = (req) => {
    const parts = [];

    if (req.requirement.input_type) {
      parts.push(`Type: ${req.requirement.input_type}`);
    }

    if (req.min !== null || req.max !== null) {
      const range = `${req.min || "∞"} - ${req.max || "∞"}`;
      parts.push(`Range: ${range}`);
    }

    if (req.requirement.options && req.requirement.options.length > 0) {
      parts.push(`Options: ${req.requirement.options.join(", ")}`);
    }

    return parts.join(" • ");
  };

  if (serviceLoading || !serviceData) {
    return (
      <Box sx={{ p: 4 }}>
        <Skeleton variant="rectangular" height={220} />
        <Skeleton height={40} sx={{ mt: 3 }} />
        <Skeleton height={80} sx={{ mt: 2 }} />
        <Stack direction={"row"} spacing={2} sx={{ mt: 4 }}>
          <Skeleton variant="rectangular" width={"50%"} height={150} />
          <Skeleton variant="rectangular" width={"50%"} height={150} />
        </Stack>
      </Box>
    );
  }

  return (
    <>
      <PagesHeader
        label="Service Details"
        desc="View complete service information including requirements, attributes, and details"
        searchEnabled={false}
        actions={[
          {
            label: "Back to Services",
            icon: <ArrowBackOutlined />,
            onClick: () => navigate("/dashboard/admin/services"),
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
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: 2,
            p: 4,
            mb: 3,
            color: "white",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box>
              <Typography variant="h3" fontWeight={700} mb={1}>
                {serviceData.service_name}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Chip
                  icon={
                    serviceData.service_status ? (
                      <CheckCircleOutlined />
                    ) : (
                      <CancelOutlined />
                    )
                  }
                  label={serviceData.service_status ? "Active" : "Inactive"}
                  sx={{
                    bgcolor: serviceData.service_status ? "#4caf50" : "#f44336",
                    color: "white",
                    fontWeight: 600,
                  }}
                />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  ID: {serviceData.id}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={3}>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Category
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {serviceData.category_name}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Sub-Category
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {serviceData.subcategory_name}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Stack direction="row" spacing={2}>
              <CustomButton
                title="Edit"
                startIcon={<EditOutlined />}
                onClick={handleEdit}
                color="primary"
                variant="filled"
              />
              <CustomButton
                title="Delete"
                startIcon={<DeleteOutlined />}
                onClick={handleConfirm}
                color="danger"
                variant="filled"
              />
            </Stack>
          </Stack>
        </Box>

        <Grid container spacing={3}>
          <Grid item size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                height: "100%",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                border: "1px solid #e0e0e0",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <FeaturedPlayListOutlined
                    sx={{ color: "#667eea", fontSize: 28 }}
                  />
                  <Typography variant="h5" fontWeight={700}>
                    Service Attributes
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 2 }} />

                {serviceData.service_attributes &&
                serviceData.service_attributes.length > 0 ? (
                  <List sx={{ p: 0 }}>
                    {serviceData.service_attributes.map((attr, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          p: 1.5,
                          mb: 1,
                          bgcolor: "#f8f9ff",
                          borderRadius: 1,
                          borderLeft: "3px solid #667eea",
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <FiberManualRecordOutlined
                            sx={{ fontSize: 12, color: "#667eea" }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={attr}
                          primaryTypographyProps={{
                            sx: { textTransform: "capitalize" },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    No attributes defined for this service
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                height: "100%",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                border: "1px solid #e0e0e0",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <AssignmentOutlined sx={{ color: "#764ba2", fontSize: 28 }} />
                  <Typography variant="h5" fontWeight={700}>
                    Service Requirements
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 2 }} />

                {serviceData.requirements &&
                serviceData.requirements.length > 0 ? (
                  <Stack spacing={2}>
                    {serviceData.requirements.map((req, index) => (
                      <Box
                        key={index}
                        sx={{
                          p: 2,
                          bgcolor: "#fff5f8",
                          borderRadius: 1,
                          border: "1px solid #f0e6ff",
                        }}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          mb={1}
                        >
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            sx={{ textTransform: "capitalize" }}
                          >
                            {req.requirement.name}
                          </Typography>
                          <Chip
                            label={req.required ? "Required" : "Optional"}
                            size="small"
                            sx={{
                              bgcolor: req.required ? "#d32f2f" : "#757575",
                              color: "white",
                              fontSize: "11px",
                              height: 20,
                            }}
                          />
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          {getRequirementDetails(req)}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                ) : (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    No requirements defined for this service
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                border: "1px solid #e0e0e0",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <DescriptionOutlined
                    sx={{ color: "#667eea", fontSize: 28 }}
                  />
                  <Typography variant="h5" fontWeight={700}>
                    Service Details
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 2 }} />

                {serviceData.service_details_1 ||
                serviceData.service_details_2 ||
                serviceData.service_details_3 ? (
                  <List sx={{ p: 0 }}>
                    {serviceData.service_details_1 && (
                      <ListItem
                        sx={{
                          p: 1.5,
                          mb: 1,
                          bgcolor: "#f0f7ff",
                          borderRadius: 1,
                          border: "1px solid #bbdefb",
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <FiberManualRecordOutlined
                            sx={{ fontSize: 12, color: "#1976d2" }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={serviceData.service_details_1} />
                      </ListItem>
                    )}

                    {serviceData.service_details_2 && (
                      <ListItem
                        sx={{
                          p: 1.5,
                          mb: 1,
                          bgcolor: "#f3f0ff",
                          borderRadius: 1,
                          border: "1px solid #d1c4e9",
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <FiberManualRecordOutlined
                            sx={{ fontSize: 12, color: "#764ba2" }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={serviceData.service_details_2} />
                      </ListItem>
                    )}

                    {serviceData.service_details_3 && (
                      <ListItem
                        sx={{
                          p: 1.5,
                          bgcolor: "#fff8f0",
                          borderRadius: 1,
                          border: "1px solid #ffe0b2",
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <FiberManualRecordOutlined
                            sx={{ fontSize: 12, color: "#f57c00" }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={serviceData.service_details_3} />
                      </ListItem>
                    )}
                  </List>
                ) : (
                  <Alert severity="info">
                    No additional details available for this service
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                border: "1px solid #e0e0e0",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <FeaturedPlayListOutlined
                    sx={{ color: "#667eea", fontSize: 28 }}
                  />
                  <Typography variant="h5" fontWeight={700}>
                    Timestamp
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={2} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "grey.50",
                      border: "1px solid",
                      borderColor: "grey.200",
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
                        {formatDate(serviceData.created_at)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "grey.50",
                      border: "1px solid",
                      borderColor: "grey.200",
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
                        {formatDate(serviceData.updated_at)}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card
              sx={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                border: "1px solid #e0e0e0",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <LocalOfferOutlined sx={{ color: "#667eea", fontSize: 28 }} />
                  <Typography variant="h5" fontWeight={700}>
                    Service Types ({serviceData.service_types?.length || 0})
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 3 }} />

                {serviceData.service_types &&
                serviceData.service_types.length > 0 ? (
                  <Grid container spacing={3}>
                    {serviceData.service_types.map((type, index) => (
                      <Grid item size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                        <Card
                          sx={{
                            height: "100%",
                            border: "2px solid #e0e0e0",
                            borderRadius: 2,
                            transition: "all 0.3s",
                            "&:hover": {
                              borderColor: "#667eea",
                              boxShadow: "0 8px 16px rgba(102, 126, 234, 0.2)",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              height: 200,
                              bgcolor: "#f5f5f5",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderBottom: "1px solid #e0e0e0",
                            }}
                          >
                            {type.service_type_image ? (
                              <img
                                src={`${BASE_IMAGE_URL}${type.service_type_image}`}
                                alt={type.service_type_name}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <ImageOutlined
                                sx={{ fontSize: 80, color: "#bdbdbd" }}
                              />
                            )}
                          </Box>

                          <CardContent sx={{ p: 2.5 }}>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              mb={2}
                            >
                              <Typography variant="h6" fontWeight={700}>
                                {type.service_type_name}
                              </Typography>
                              <Chip
                                label={type.status ? "Active" : "Inactive"}
                                size="small"
                                sx={{
                                  bgcolor: type.status ? "#4caf50" : "#f44336",
                                  color: "white",
                                  fontWeight: 600,
                                }}
                              />
                            </Stack>

                            {type.description && (
                              <Box
                                sx={{
                                  mb: 2,
                                  p: 1.5,
                                  bgcolor: "#f8f9ff",
                                  borderRadius: 1,
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: type.description,
                                }}
                              />
                            )}

                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                              mb={2}
                            >
                              <Typography
                                variant="h5"
                                fontWeight={700}
                                color="success.main"
                              >
                                {parseFloat(type.price).toFixed(2)}
                              </Typography>
                            </Stack>

                            {type.discount_type && type.discount_value && (
                              <Box
                                sx={{
                                  p: 1.5,
                                  bgcolor: "#fff3e0",
                                  borderRadius: 1,
                                  border: "1px solid #ffb74d",
                                  mb: 2,
                                }}
                              >
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  alignItems="center"
                                >
                                  <LocalOfferOutlined
                                    sx={{ fontSize: 18, color: "#f57c00" }}
                                  />
                                  <Typography
                                    variant="body2"
                                    fontWeight={600}
                                    color="#f57c00"
                                  >
                                    {type.discount_type === "percentage"
                                      ? `${type.discount_value}% OFF`
                                      : `$${type.discount_value} OFF`}
                                    {type.discount_max_amount && (
                                      <> (Max: ${type.discount_max_amount})</>
                                    )}
                                  </Typography>
                                </Stack>
                              </Box>
                            )}

                            <Divider sx={{ my: 2 }} />
                            <Stack spacing={0.5}>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Created: {formatDate(type.created_at)}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Updated: {formatDate(type.updated_at)}
                              </Typography>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Alert severity="info">
                    No service types available for this service
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 3 }} />
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
              onClick={() => navigate("/dashboard/admin/services")}
              sx={{ textTransform: "none", px: 3 }}
            />
          </Stack>
        </Box>
      </Box>

      <ConfirmDeleteModal
        open={openDelete}
        title="Delete Service"
        itemName={`${serviceData?.service_name}`}
        loading={loading}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default ServiceDetailPage;
