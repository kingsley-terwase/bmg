/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
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
} from "@mui/material";
import {
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarTodayOutlined,
  UpdateOutlined,
  ImageOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../utils/functions";
import { useGetPackage } from "../../../../Hooks/Users/credit_packages";

const EditCreditPackageModal = ({ open, onClose, packageId }) => {
  const navigate = useNavigate();
  const { packageData, loading, getPackage } = useGetPackage();
  console.log(" ID:", packageId);

  useEffect(() => {
    if (open && packageId) {
      getPackage(packageId);
    }
  }, [open, packageId]);

  const handleEdit = () => {
    console.log("Edit :", packageId);
    navigate(`/dashboard/admin/edit/sub-categories/${packageId}`);
    onClose();
  };

  const handleDelete = () => {
    if (
      window.confirm(`Are you sure you want to delete "${packageData?.name}"?`)
    ) {
      console.log("Delete:", packageId);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: "90vh",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 16,
          top: 16,
          zIndex: 1,
          bgcolor: "rgba(255, 255, 255, 0.9)",
          boxShadow: 2,
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 1)",
          },
        }}
      >
        <CloseOutlined />
      </IconButton>

      <DialogContent sx={{ p: 0, overflow: "auto" }}>
        {loading ? (
          <Box>
            <Skeleton variant="rectangular" height={400} />
            <Box sx={{ p: 4 }}>
              <Skeleton variant="text" width="60%" height={40} />
              <Skeleton variant="text" width="40%" height={30} sx={{ mt: 2 }} />
              <Skeleton variant="rectangular" height={100} sx={{ mt: 3 }} />
              <Skeleton variant="rectangular" height={60} sx={{ mt: 3 }} />
            </Box>
          </Box>
        ) : packageData ? (
          <>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 400,
                overflow: "hidden",
                bgcolor: "grey.100",
              }}
            >
              {packageData?.image ? (
                <Box
                  component="img"
                  src={packageData.image}
                  alt={packageData.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "grey.200",
                  }}
                >
                  <ImageOutlined sx={{ fontSize: 80, color: "grey.400" }} />
                </Box>
              )}

              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "50%",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                }}
              />

              {packageData?.is_featured && (
                <Chip
                  label="Featured"
                  color="warning"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    fontWeight: 700,
                    boxShadow: 2,
                  }}
                />
              )}

              <Box
                sx={{
                  position: "absolute",
                  bottom: 30,
                  left: 30,
                  right: 30,
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight={700}
                  color="white"
                  sx={{
                    textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
                    mb: 1,
                  }}
                >
                  {packageData?.name}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label={packageData?.status ? "Active" : "Inactive"}
                    size="small"
                    color={packageData?.status ? "success" : "default"}
                    sx={{ fontWeight: 600 }}
                  />
                  {packageData?.total_services && (
                    <Chip
                      label={`${packageData?.total_services} Services`}
                      size="small"
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.2)",
                        color: "white",
                        fontWeight: 600,
                        backdropFilter: "blur(10px)",
                      }}
                    />
                  )}
                </Stack>
              </Box>
            </Box>

            <Box sx={{ p: 4 }}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  fontWeight={600}
                  sx={{ letterSpacing: 1.2 }}
                >
                  Category Information
                </Typography>
                <Divider sx={{ mt: 1, mb: 2 }} />

                {packageData?.category_name && (
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Parent Category
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                      {packageData?.category_name}
                    </Typography>
                  </Box>
                )}

                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                  >
                    Description
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      mt: 1,
                      lineHeight: 1.8,
                      textAlign: "justify",
                    }}
                  >
                    {packageData?.description || "No description available."}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  fontWeight={600}
                  sx={{ letterSpacing: 1.2 }}
                >
                  Timeline
                </Typography>
                <Divider sx={{ mt: 1, mb: 2 }} />

                <Stack spacing={2}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      bgcolor: "grey.50",
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "grey.200",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        width: 40,
                        height: 40,
                        mr: 2,
                      }}
                    >
                      <CalendarTodayOutlined sx={{ fontSize: 20 }} />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight={600}
                      >
                        Created At
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {formatDate(packageData?.created_at)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      bgcolor: "grey.50",
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "grey.200",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "success.main",
                        width: 40,
                        height: 40,
                        mr: 2,
                      }}
                    >
                      <UpdateOutlined sx={{ fontSize: 20 }} />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight={600}
                      >
                        Last Updated
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {formatDate(packageData?.updated_at)}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={onClose}
                  sx={{ textTransform: "none", px: 3 }}
                >
                  Close
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteOutlined />}
                  onClick={handleDelete}
                  sx={{ textTransform: "none", px: 3 }}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  startIcon={<EditOutlined />}
                  onClick={handleEdit}
                  sx={{ textTransform: "none", px: 3 }}
                >
                  Edit Category
                </Button>
              </Stack>
            </Box>
          </>
        ) : (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              No sub category data found
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditCreditPackageModal;
