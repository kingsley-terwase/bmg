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
import { formatDate } from "../../../utils/functions";
import { useNavigate } from "react-router-dom";
import { useGetPayMethod } from "../../../Hooks/Dashboard/payment_methods";
import { BASE_IMAGE_URL } from "../../../Config/paths";

const SingleMethodModal = ({ open, onClose, methodId }) => {
  const navigate = useNavigate();
  const { methodData, loading, getMethod } = useGetPayMethod();

  useEffect(() => {
    if (open && methodId) {
      getMethod(methodId);
    }
  }, [open, methodId]);

  const handleEdit = () => {
    navigate(`/dashboard/admin/payment-methods/edit`, {
      state: { data: methodData },
    });

    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Delete payment method "${methodData?.name}"?`)) {
      // delete logic here
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
          bgcolor: "rgba(255,255,255,0.9)",
          boxShadow: 2,
        }}
      >
        <CloseOutlined />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        {loading ? (
          <Box>
            <Skeleton variant="rectangular" height={350} />
            <Box sx={{ p: 4 }}>
              <Skeleton width="50%" height={36} />
              <Skeleton width="30%" sx={{ mt: 1 }} />
              <Skeleton height={90} sx={{ mt: 3 }} />
            </Box>
          </Box>
        ) : methodData ? (
          <>
            <Box
              sx={{
                position: "relative",
                height: 300,
                bgcolor: "grey.100",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {methodData?.logo ? (
                <Box
                  component="img"
                  src={`${BASE_IMAGE_URL}/${methodData.logo}`}
                  alt={methodData.name}
                  loading="lazy-load"
                  sx={{
                    maxHeight: 180,
                    maxWidth: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <ImageOutlined sx={{ fontSize: 90, color: "grey.400" }} />
              )}
            </Box>

            <Box sx={{ p: 4 }}>
              <Typography variant="h4" fontWeight={700}>
                {methodData.name}
              </Typography>

              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Chip
                  label={methodData.status ? "Active" : "Inactive"}
                  color={methodData.status ? "success" : "default"}
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Typography
                variant="overline"
                fontWeight={600}
                color="text.secondary"
              >
                Description
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  lineHeight: 1.8,
                  color: "text.secondary",
                }}
              >
                {methodData.description || "No description provided."}
              </Typography>

              <Divider sx={{ my: 4 }} />
              <Typography
                variant="overline"
                fontWeight={600}
                color="text.secondary"
              >
                Timeline
              </Typography>

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
                      {formatDate(methodData.created_at)}
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
                      {formatDate(methodData.updated_at)}
                    </Typography>
                  </Box>
                </Box>
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
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  startIcon={<EditOutlined />}
                  onClick={handleEdit}
                >
                  Edit Method
                </Button>
              </Stack>
            </Box>
          </>
        ) : (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography color="text.secondary">
              Payment method not found
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SingleMethodModal;
