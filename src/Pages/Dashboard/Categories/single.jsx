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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarTodayOutlined,
  UpdateOutlined,
  ImageOutlined,
  ExpandMoreOutlined,
  FiberManualRecordOutlined,
  HelpOutlineOutlined,
  KeyOutlined,
  ImageAspectRatioOutlined,
} from "@mui/icons-material";
import { formatDate, stripHtml } from "../../../utils/functions";
import { useNavigate } from "react-router-dom";
import {
  useFetchCategories,
  useGetCategory,
  useDeleteCategory,
} from "../../../Hooks/Dashboard/categories";
import { BASE_IMAGE_URL } from "../../../Config/paths";
import { ConfirmDeleteModal } from "../../../Component";
import { showToast } from "../../../utils/toast";

const SingleCategoryModal = ({ open, onClose, catId }) => {
  const navigate = useNavigate();
  const {
    categoryData,
    loading: categoryLoading,
    getCategory,
  } = useGetCategory();
  const { refetch } = useFetchCategories();
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const deletCategory = useDeleteCategory();

  useEffect(() => {
    if (open && catId) {
      getCategory(catId);
    }
  }, [open, catId]);

  const handleEdit = () => {
    navigate(`/dashboard/admin/edit/categories`, {
      state: { data: categoryData },
    });
    onClose();
  };

  const handleConfirm = () => {
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    if (!categoryData?.id) {
      showToast.error("Invalid ID");
      return;
    }

    setLoading(true);
    try {
      const res = await deletCategory(categoryData.id);
      if (res) {
        setOpenDelete(false);
        onClose();
        await refetch();
        showToast.success("Category deleted successfully.");
      }
    } catch (error) {
      console.error(error);
      showToast.error("Failed to delete Category.");
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
        {categoryLoading ? (
          <Box>
            <Skeleton variant="rectangular" height={400} />
            <Box sx={{ p: 4 }}>
              <Skeleton variant="text" width="60%" height={40} />
              <Skeleton variant="text" width="40%" height={30} sx={{ mt: 2 }} />
              <Skeleton variant="rectangular" height={100} sx={{ mt: 3 }} />
              <Skeleton variant="rectangular" height={60} sx={{ mt: 3 }} />
            </Box>
          </Box>
        ) : categoryData ? (
          <>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 250,
                overflow: "hidden",
                bgcolor: "grey.100",
              }}
            >
              {categoryData?.banner ? (
                <Box
                  component="img"
                  src={`${BASE_IMAGE_URL}/${categoryData.banner}`}
                  alt={categoryData.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              ) : categoryData?.image ? (
                <Box
                  component="img"
                  src={`${BASE_IMAGE_URL}/${categoryData.image}`}
                  alt={categoryData.name}
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
                  {categoryData?.name}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label={categoryData?.status ? "Active" : "Inactive"}
                    size="small"
                    sx={{
                      bgcolor: categoryData?.status ? "#4caf50" : "#f44336",
                      color: "white",
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    label={`ID: ${categoryData?.id}`}
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
              {(categoryData?.image || categoryData?.banner) && (
                <>
                  <Box sx={{ mb: 3 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mb={2}
                    >
                      <ImageAspectRatioOutlined sx={{ color: "#667eea" }} />
                      <Typography
                        variant="overline"
                        color="text.secondary"
                        fontWeight={600}
                        sx={{ letterSpacing: 1.2 }}
                      >
                        Category Images
                      </Typography>
                    </Stack>
                    <Divider sx={{ mb: 2 }} />

                    <Stack direction="row" spacing={2}>
                      {categoryData?.image && (
                        <Box
                          sx={{
                            flex: 1,
                            border: "2px solid #e0e0e0",
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            component="img"
                            src={`${BASE_IMAGE_URL}/${categoryData.image}`}
                            alt="Category Image"
                            sx={{
                              width: "100%",
                              height: 150,
                              objectFit: "cover",
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              display: "block",
                              p: 1,
                              bgcolor: "#f5f5f5",
                              textAlign: "center",
                              fontWeight: 600,
                            }}
                          >
                            Category Image
                          </Typography>
                        </Box>
                      )}

                      {categoryData?.banner && (
                        <Box
                          sx={{
                            flex: 1,
                            border: "2px solid #e0e0e0",
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            component="img"
                            src={`${BASE_IMAGE_URL}/${categoryData.banner}`}
                            alt="Banner Image"
                            sx={{
                              width: "100%",
                              height: 150,
                              objectFit: "cover",
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              display: "block",
                              p: 1,
                              bgcolor: "#f5f5f5",
                              textAlign: "center",
                              fontWeight: 600,
                            }}
                          >
                            Banner Image
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  </Box>
                  <Divider sx={{ my: 3 }} />
                </>
              )}

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
                    p: 2,
                    bgcolor: "#f8f9ff",
                    borderRadius: 1,
                    border: "1px solid #e0e0e0",
                  }}
                >
                  {stripHtml(categoryData?.description) ||
                    "No description available."}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {categoryData?.short_descriptions &&
                Object.keys(categoryData.short_descriptions).length > 0 && (
                  <>
                    <Box sx={{ mb: 3 }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        mb={2}
                      >
                        <KeyOutlined sx={{ color: "#667eea" }} />
                        <Typography
                          variant="overline"
                          color="text.secondary"
                          fontWeight={600}
                          sx={{ letterSpacing: 1.2 }}
                        >
                          Keywords
                        </Typography>
                      </Stack>
                      <Divider sx={{ mb: 2 }} />

                      <List sx={{ p: 0 }}>
                        {Object.entries(categoryData.short_descriptions).map(
                          ([index, value]) => (
                            <ListItem
                              key={index}
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
                              <ListItemText
                                primary={value}
                                primaryTypographyProps={{
                                  fontWeight: 500,
                                }}
                              />
                            </ListItem>
                          ),
                        )}
                      </List>
                    </Box>
                    <Divider sx={{ my: 3 }} />
                  </>
                )}

              {categoryData?.faqs && categoryData.faqs.length > 0 && (
                <>
                  <Box sx={{ mb: 3 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mb={2}
                    >
                      <HelpOutlineOutlined sx={{ color: "#764ba2" }} />
                      <Typography
                        variant="overline"
                        color="text.secondary"
                        fontWeight={600}
                        sx={{ letterSpacing: 1.2 }}
                      >
                        Frequently Asked Questions ({categoryData.faqs.length})
                      </Typography>
                    </Stack>
                    <Divider sx={{ mb: 2 }} />

                    <Stack spacing={1}>
                      {categoryData.faqs.map((faq, index) => (
                        <Accordion
                          key={index}
                          sx={{
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px !important",
                            "&:before": { display: "none" },
                            boxShadow: "none",
                            mb: 1,
                          }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreOutlined />}
                            sx={{
                              bgcolor: "#f8f9ff",
                              borderRadius: 1,
                              "&:hover": {
                                bgcolor: "#f0f4ff",
                              },
                            }}
                          >
                            <Typography fontWeight={600}>
                              {faq.question}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails
                            sx={{
                              p: 3,
                              bgcolor: "white",
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ lineHeight: 1.8 }}
                            >
                              {faq.answer}
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Stack direction="row" spacing={2}>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Created: {formatDate(faq.created_at)}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Updated: {formatDate(faq.updated_at)}
                              </Typography>
                            </Stack>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </Stack>
                  </Box>
                  <Divider sx={{ my: 3 }} />
                </>
              )}

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
                        {formatDate(categoryData?.created_at)}
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
                        {formatDate(categoryData?.updated_at)}
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
                  Edit Category
                </Button>
              </Stack>
            </Box>
          </>
        ) : (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              No category data found
            </Typography>
          </Box>
        )}
      </DialogContent>

      <ConfirmDeleteModal
        open={openDelete}
        title="Delete Category"
        itemName={`${categoryData?.name}`}
        loading={loading}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </Dialog>
  );
};

export default SingleCategoryModal;
