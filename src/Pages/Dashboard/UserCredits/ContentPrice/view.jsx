/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Stack,
  Chip,
  Divider,
  Avatar,
  Skeleton,
  Button,
} from "@mui/material";
import {
  CloseOutlined,
  CalendarTodayOutlined,
  UpdateOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { formatDate } from "../../../../utils/functions";
import { InputLabel, CustomButton } from "../../../../Component";
import { useGetContentPrice } from "../../../../Hooks/Dashboard/content_price";

const ViewContentPriceModal = ({ open, onClose, priceId }) => {
  const { priceData, loading, getPrice } = useGetContentPrice();

  useEffect(() => {
    if (open && priceId) {
      getPrice(priceId);
    }
  }, [open, priceId]);

  const handleDelete = () => {
    // Implement delete functionality here
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 16, top: 16 }}
      >
        <CloseOutlined />
      </IconButton>

      <DialogContent sx={{ p: 4 }}>
        {loading ? (
          <Stack spacing={2}>
            <Skeleton height={40} width="60%" />
            <Skeleton height={20} width="40%" />
            <Skeleton height={80} />
            <Skeleton height={60} />
          </Stack>
        ) : priceData ? (
          <>
            <Box mb={3}>
              <Typography variant="h5" fontWeight={700}>
                {priceData.name}
              </Typography>

              <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                <Box>
                  <InputLabel text="Length in seconds" size="10px" />
                  <Chip
                    label={`${priceData.length_seconds ? `${priceData.length_seconds} seconds` : "N/A"}`}
                    size="small"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
                <Box>
                  <Box sx={{ height: 24 }} />
                  <Chip
                    label={`Cost: ${priceData?.cost ? `$${priceData.cost}` : "0"}`}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
              </Stack>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box mb={3}>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
              >
                Description
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, lineHeight: 1.8 }}
              >
                {priceData.description || "No description provided."}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={2}>
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
                  <Typography variant="caption" color="text.secondary">
                    Created At
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formatDate(priceData.created_at)}
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
                }}
              >
                <Avatar sx={{ bgcolor: "success.main", mr: 2 }}>
                  <UpdateOutlined />
                </Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Last Updated
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formatDate(priceData.updated_at)}
                  </Typography>
                </Box>
              </Box>
            </Stack>

            <Divider sx={{ my: 4 }} />

            <Stack direction="row" justifyContent="flex-end" spacing={3}>
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{ textTransform: "none", px: 3 }}
              >
                Close
              </Button>
              <CustomButton
                title="Back"
                color="danger"
                variant="outlined"
                startIcon={<DeleteOutlined />}
                onClick={handleDelete}
                sx={{ textTransform: "none", px: 3 }}
              />
            </Stack>
          </>
        ) : (
          <Typography align="center" color="text.secondary">
            No content price data found with selected ID
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewContentPriceModal;
