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
  Divider,
  Avatar,
  Skeleton,
} from "@mui/material";
import {
  CloseOutlined,
  DeleteOutlined,
  CalendarTodayOutlined,
  UpdateOutlined,
} from "@mui/icons-material";
import { formatDate } from "../../../../utils/functions";
import { useGetContentQuality } from "../../../../Hooks/Dashboard/content_qualities";
import { InputLabel, CustomButton } from "../../../../Component";

const ViewContentQualityModal = ({ open, onClose, qualityId }) => {
  const { qualityData, loading, getContentQuality } = useGetContentQuality();
  console.log(" ID:", qualityId);

  useEffect(() => {
    if (open && qualityId) {
      getContentQuality(qualityId);
    }
  }, [open, qualityId]);

  const handleDelete = () => {
    if (
      window.confirm(`Are you sure you want to delete "${qualityData?.name}"?`)
    ) {
      console.log("Delete:", qualityId);
      onClose();
    }
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
        ) : qualityData ? (
          <>
            <Box mb={3}>
              <Box mt={1}>
                <InputLabel text="Quality Name" size="10px" />
                <Typography variant="h5" fontWeight={700}>
                  {qualityData.name}
                </Typography>
              </Box>
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
                    {formatDate(qualityData.created_at)}
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
                    {formatDate(qualityData.updated_at)}
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
                title="Delete"
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
            No content type data found
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewContentQualityModal;
