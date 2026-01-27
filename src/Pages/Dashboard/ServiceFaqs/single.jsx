/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Divider,
  Stack,
  Avatar,
  Button,
  Chip,
  Skeleton,
  Card,
  CardContent,
} from "@mui/material";
import {
  CloseOutlined,
  CalendarTodayOutlined,
  UpdateOutlined,
  DeleteOutlined,
  QuestionAnswerOutlined,
  CategoryOutlined,
} from "@mui/icons-material";
import { formatDate } from "../../../utils/functions";

import { showToast } from "../../../utils/toast";
import { ConfirmDeleteModal } from "../../../Component";
import { useGetServiceFaq, useFetchServiceFaqs, useDeleteServiceFaq } from "../../../Hooks/Dashboard/service_faqs";

const SingleServiceFaqModal = ({ open, onClose, faqId }) => {
  const { faqData, getFaqData, loading: faqLoading } = useGetServiceFaq();
  const { refetch } = useFetchServiceFaqs();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const deletCategory = useDeleteServiceFaq();

  useEffect(() => {
    if (open && faqId) {
      getFaqData(faqId);
    }
  }, [open, faqId]);

  const handleConfirm = () => {
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    if (!faqData?.id) {
      showToast.error("Invalid ID");
      return;
    }

    setLoading(true);
    try {
      const res = await deletCategory(faqData.id);
      if (res) {
        setOpenDelete(false);
        onClose();
        await refetch();
        showToast.success("Category FAQ  deleted successfully.");
      }
    } catch (error) {
      console.error(error);
      showToast.error("Failed to delete Category FAQ .");
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
          background: "linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)",
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
          bgcolor: "rgba(255,255,255,0.95)",
          boxShadow: 3,
          "&:hover": {
            bgcolor: "error.light",
            color: "white",
            transform: "scale(1.1)",
          },
          transition: "all 0.3s ease",
        }}
      >
        <CloseOutlined />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        {faqLoading ? (
          <Box sx={{ p: 4 }}>
            <Skeleton
              variant="rectangular"
              height={60}
              sx={{ mb: 2, borderRadius: 2 }}
            />
            <Skeleton variant="text" width="40%" height={30} sx={{ mb: 3 }} />
            <Skeleton
              variant="rectangular"
              height={120}
              sx={{ mb: 3, borderRadius: 2 }}
            />
            <Stack spacing={2}>
              <Skeleton
                variant="rectangular"
                height={80}
                sx={{ borderRadius: 2 }}
              />
              <Skeleton
                variant="rectangular"
                height={80}
                sx={{ borderRadius: 2 }}
              />
            </Stack>
          </Box>
        ) : !faqData ? (
          <Box sx={{ p: 6, textAlign: "center" }}>
            <QuestionAnswerOutlined
              sx={{ fontSize: 80, color: "grey.300", mb: 2 }}
            />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              FAQ data not found
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              The requested FAQ could not be loaded
            </Typography>
            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                p: 4,
                pb: 5,
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
                  opacity: 0.4,
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Stack direction="row" spacing={1} mb={2}>
                  <Chip
                    icon={<QuestionAnswerOutlined />}
                    label="FAQ"
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      color: "white",
                      fontWeight: 600,
                      backdropFilter: "blur(10px)",
                    }}
                  />
                  {faqData.category_name && (
                    <Chip
                      icon={<CategoryOutlined />}
                      label={faqData.category_name}
                      size="small"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        color: "white",
                        fontWeight: 600,
                        backdropFilter: "blur(10px)",
                      }}
                    />
                  )}
                </Stack>
                <Typography
                  variant="overline"
                  fontWeight={700}
                  color="primary.main"
                  sx={{ letterSpacing: 1.2 }}
                >
                  Question
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  color="white"
                  sx={{
                    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  {faqData.question.toUpperCase()}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ p: 4 }}>
              <Card
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  border: "1px solid",
                  borderColor: "grey.200",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="overline"
                    fontWeight={700}
                    color="primary.main"
                    sx={{ letterSpacing: 1.2 }}
                  >
                    Answer
                  </Typography>
                  <Box
                    sx={{
                      mt: 2,
                      lineHeight: 1.8,
                      color: "text.primary",
                      "& p": { mb: 1.5 },
                      "& h1, & h2, & h3": { mt: 2, mb: 1, fontWeight: 600 },
                      "& ul, & ol": { pl: 3, mb: 1.5 },
                      "& a": { color: "primary.main", textDecoration: "none" },
                    }}
                    dangerouslySetInnerHTML={{ __html: faqData.answer }}
                  />
                </CardContent>
              </Card>

              <Divider sx={{ my: 3 }} />

              {/* Timeline Section */}
              <Typography
                variant="overline"
                fontWeight={700}
                color="text.secondary"
                sx={{ letterSpacing: 1.2 }}
              >
                Timeline
              </Typography>

              <Stack spacing={2} sx={{ mt: 2 }}>
                <Card
                  sx={{
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "grey.200",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        sx={{
                          bgcolor: "primary.main",
                          width: 48,
                          height: 48,
                        }}
                      >
                        <CalendarTodayOutlined />
                      </Avatar>
                      <Box>
                        <Typography
                          variant="caption"
                          fontWeight={700}
                          color="text.secondary"
                          sx={{
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                          }}
                        >
                          Created At
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {formatDate(faqData.created_at)}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>

                <Card
                  sx={{
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "grey.200",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        sx={{
                          bgcolor: "success.main",
                          width: 48,
                          height: 48,
                        }}
                      >
                        <UpdateOutlined />
                      </Avatar>
                      <Box>
                        <Typography
                          variant="caption"
                          fontWeight={700}
                          color="text.secondary"
                          sx={{
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                          }}
                        >
                          Last Updated
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {formatDate(faqData.updated_at)}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>

              <Divider sx={{ my: 4 }} />

              {/* Action Buttons */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="flex-end"
              >
                <Button
                  variant="outlined"
                  onClick={onClose}
                  sx={{
                    textTransform: "none",
                    px: 3,
                    borderRadius: 2,
                    fontWeight: 600,
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteOutlined />}
                  onClick={handleConfirm}
                  sx={{
                    textTransform: "none",
                    px: 3,
                    borderRadius: 2,
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: "error.main",
                      color: "white",
                    },
                  }}
                >
                  Delete
                </Button>
              </Stack>
            </Box>
          </>
        )}
      </DialogContent>

      <ConfirmDeleteModal
        open={openDelete}
        title="Delete Category FAQ"
        itemName={`${faqData?.question}`}
        loading={loading}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </Dialog>
  );
};

export default SingleServiceFaqModal;
