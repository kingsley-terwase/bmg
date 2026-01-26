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
} from "@mui/material";
import {
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarTodayOutlined,
  UpdateOutlined,
  ImageOutlined,
  CategoryOutlined,
  FingerprintOutlined,
} from "@mui/icons-material";
import { formatDate, stripHtml } from "../../../utils/functions";
import {
  useGetSubCategory,
  useFetchSubCategories,
  useDeleteSubCategory,
} from "../../../Hooks/Dashboard/sub_categories";
import { useNavigate } from "react-router-dom";
import { BASE_IMAGE_URL } from "../../../Config/paths";
import { ConfirmDeleteModal } from "../../../Component";
import { showToast } from "../../../utils/toast";

const SingleSubCategoryModal = ({ open, onClose, subCatId }) => {
  const navigate = useNavigate();
  const {
    subCategoryData,
    loading: dataLoading,
    getCategory,
  } = useGetSubCategory();
  const { refetch } = useFetchSubCategories();
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const deleteSubCat = useDeleteSubCategory();

  useEffect(() => {
    if (open && subCatId) {
      getCategory(subCatId);
    }
  }, [open, subCatId]);

  const handleEdit = () => {
    navigate(`/dashboard/admin/edit/sub-categories`, {
      state: { data: subCategoryData },
    });
    onClose();
  };

  const handleConfirm = () => {
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    if (!subCategoryData?.id) {
      showToast.error("Invalid method ID");
      return;
    }

    setLoading(true);
    try {
      const res = await deleteSubCat(subCategoryData.id);
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
        {dataLoading ? (
          <Box>
            <Skeleton variant="rectangular" height={400} />
            <Box sx={{ p: 4 }}>
              <Skeleton variant="text" width="60%" height={40} />
              <Skeleton variant="text" width="40%" height={30} sx={{ mt: 2 }} />
              <Skeleton variant="rectangular" height={100} sx={{ mt: 3 }} />
              <Skeleton variant="rectangular" height={60} sx={{ mt: 3 }} />
            </Box>
          </Box>
        ) : subCategoryData ? (
          <>
            {/* Header with Image */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 400,
                overflow: "hidden",
                bgcolor: "grey.100",
              }}
            >
              {subCategoryData?.image ? (
                <Box
                  component="img"
                  src={`${BASE_IMAGE_URL}/${subCategoryData.image}`}
                  alt={subCategoryData.name}
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
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  <ImageOutlined
                    sx={{ fontSize: 80, color: "white", opacity: 0.5 }}
                  />
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
                  {subCategoryData?.name}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label={subCategoryData?.status ? "Active" : "Inactive"}
                    size="small"
                    sx={{
                      bgcolor: subCategoryData?.status ? "#4caf50" : "#f44336",
                      color: "white",
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    label={`ID: ${subCategoryData?.id}`}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      fontWeight: 600,
                      backdropFilter: "blur(10px)",
                    }}
                  />
                </Stack>
              </Box>
            </Box>

            <Box sx={{ p: 4 }}>
              {subCategoryData?.category_name && (
                <>
                  <Box sx={{ mb: 3 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mb={2}
                    >
                      <CategoryOutlined sx={{ color: "#667eea" }} />
                      <Typography
                        variant="overline"
                        color="text.secondary"
                        fontWeight={600}
                        sx={{ letterSpacing: 1.2 }}
                      >
                        Parent Category
                      </Typography>
                    </Stack>
                    <Divider sx={{ mb: 2 }} />

                    <Box
                      sx={{
                        p: 2.5,
                        bgcolor: "#f0f7ff",
                        borderRadius: 2,
                        border: "2px solid #bbdefb",
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{ bgcolor: "#1976d2" }}>
                          <CategoryOutlined />
                        </Avatar>
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                          >
                            Category
                          </Typography>
                          <Typography variant="h6" fontWeight={700}>
                            {subCategoryData.category_name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Category ID: {subCategoryData.category_id}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 3 }} />
                </>
              )}

              {/* SubCategory Details */}
              <Box sx={{ mb: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <FingerprintOutlined sx={{ color: "#764ba2" }} />
                  <Typography
                    variant="overline"
                    color="text.secondary"
                    fontWeight={600}
                    sx={{ letterSpacing: 1.2 }}
                  >
                    SubCategory Details
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
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
                        SubCategory ID
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        #{subCategoryData.id}
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
                        Status
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {subCategoryData.status ? "Active" : "Inactive"}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
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
                        Name
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {subCategoryData.name}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  fontWeight={600}
                  sx={{ letterSpacing: 1.2 }}
                >
                  Description
                </Typography>
                <Divider sx={{ mt: 1, mb: 2 }} />

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    lineHeight: 1.8,
                    textAlign: "justify",
                    p: 2.5,
                    bgcolor: "#f8f9ff",
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                  }}
                >
                  {stripHtml(subCategoryData?.description) ||
                    "No description available."}
                </Typography>
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
                        {formatDate(subCategoryData?.created_at)}
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
                        {formatDate(subCategoryData?.updated_at)}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Action Buttons */}
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
                  onClick={handleConfirm}
                  sx={{ textTransform: "none", px: 3 }}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  startIcon={<EditOutlined />}
                  onClick={handleEdit}
                  sx={{
                    textTransform: "none",
                    px: 3,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  Edit SubCategory
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

      <ConfirmDeleteModal
        open={openDelete}
        title="Delete Sub Category"
        itemName={`${subCategoryData?.name}`}
        loading={loading}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </Dialog>
  );
};

export default SingleSubCategoryModal;
