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
  Skeleton,
  Chip,
} from "@mui/material";
import {
  CloseOutlined,
  CalendarTodayOutlined,
  UpdateOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { formatDate } from "../../../utils/functions";
import { useNavigate } from "react-router-dom";
import { InputLabel, ConfirmDeleteModal } from "../../../Component";
import {
  useGetPortfolio,
  useFetchPortfolios,
  useDeletePortfolio,
} from "../../../Hooks/Dashboard/portfolios";
import { BASE_IMAGE_URL } from "../../../Config/paths";
import { showToast } from "../../../utils/toast";

const SinglePortfolioModal = ({ open, onClose, portfolioId }) => {
  const navigate = useNavigate();
  const { data, getPortfolio, loading: portfolioLoading } = useGetPortfolio();
  const [openDelete, setOpenDelete] = useState(false);
  const { refetch } = useFetchPortfolios();
  const [loading, setLoading] = useState(false);
  const deletPortfolio = useDeletePortfolio();

  useEffect(() => {
    if (open && portfolioId) {
      getPortfolio(portfolioId);
    }
  }, [open, portfolioId]);

  if (!data) {
    return null;
  }

  const handleEdit = () => {
    navigate("/dashboard/admin/portfolio/edit", { state: { data: data } });
    onClose();
  };

  const handleConfirm = () => {
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    if (!portfolioId) {
      showToast.error("Invalid ID");
      return;
    }

    setLoading(true);
    try {
      const res = await deletPortfolio(portfolioId);
      if (res) {
        setOpenDelete(false);
        onClose();
        await refetch();
        showToast.success("Portfolio deleted successfully.");
      }
    } catch (error) {
      console.error(error);
      showToast.error("Failed to delete Portfolio.");
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
        sx={{ position: "absolute", right: 16, top: 16 }}
      >
        <CloseOutlined />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        {portfolioLoading ? (
          <Box>
            <Skeleton variant="rectangular" height={280} />
            <Box sx={{ p: 4 }}>
              <Skeleton width="40%" height={30} />
              <Skeleton height={80} sx={{ mt: 3 }} />
            </Box>
          </Box>
        ) : data ? (
          <>
            {/* Image */}
            {data.image && (
              <Box
                sx={{
                  height: 280,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "grey.100",
                }}
              >
                <Box
                  component="img"
                  src={`${BASE_IMAGE_URL}/${data.image}`}
                  alt={data.category_name}
                  sx={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}

            <Box sx={{ p: 4 }}>
              {data.category_name && (
                <Box>
                  <InputLabel text="Category Name" size="10px" />
                  <Typography variant="h4" fontWeight={700}>
                    {data.category_name}
                  </Typography>
                </Box>
              )}

              {/* Service + Status */}
              <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                {data.service_name && (
                  <Box>
                    <InputLabel text="Service Name" size="10px" />
                    <Chip
                      label={data.service_name}
                      size="small"
                      color="primary"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                )}

                {typeof data.status === "boolean" && (
                  <Box>
                    <InputLabel text="Status" size="10px" />
                    <Chip
                      label={data.status ? "Active" : "Inactive"}
                      size="small"
                      color={data.status ? "success" : "default"}
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                )}
              </Stack>

              {/* Description */}
              {data.description && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography
                    variant="overline"
                    fontWeight={600}
                    color="text.secondary"
                  >
                    Description
                  </Typography>
                  <Typography sx={{ mt: 1, lineHeight: 1.8 }}>
                    {data.description}
                  </Typography>
                </>
              )}

              {/* Timeline */}
              {(data.created_at || data.updated_at) && (
                <>
                  <Divider sx={{ my: 4 }} />
                  <Stack spacing={2}>
                    {data.created_at && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 2,
                          bgcolor: "grey.50",
                          borderRadius: 2,
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
                            {formatDate(data.created_at)}
                          </Typography>
                        </Box>
                      </Box>
                    )}

                    {data.updated_at && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 2,
                          bgcolor: "grey.50",
                          borderRadius: 2,
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
                            {formatDate(data.updated_at)}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Stack>

                  <Divider sx={{ my: 4 }} />

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
                    >
                      Edit Portfolio
                    </Button>
                  </Stack>
                </>
              )}
            </Box>
          </>
        ) : (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography color="text.secondary">Portfolio not found</Typography>
          </Box>
        )}
      </DialogContent>

      <ConfirmDeleteModal
        open={openDelete}
        title="Delete Portfolio"
        itemName={`Portfolio with category "${data?.category_name}" and service name "${data?.service_name}"`}
        loading={loading}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </Dialog>
  );
};

export default SinglePortfolioModal;
