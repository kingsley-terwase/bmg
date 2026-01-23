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
import { useGetContentType } from "../../../../Hooks/Dashboard/content_type";

const ViewContentTypeModal = ({ open, onClose, typeId }) => {
  const { typeData, loading, getContentType } = useGetContentType();

  useEffect(() => {
    if (open && typeId) {
      getContentType(typeId);
    }
  }, [open, typeId]);

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
        ) : typeData ? (
          <>
             <Box mb={3}>
              <Typography variant="h5" fontWeight={700}>
                {typeData.name}
              </Typography>

              <Box mt={1}>
                <InputLabel text="Status" size="10px" />
                <Chip
                  label={typeData.is_active ? "Active" : "Inactive"}
                  color={typeData.is_active ? "success" : "default"}
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </Box>
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
                {typeData.description || "No description provided."}
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
                    {formatDate(typeData.created_at)}
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
                    {formatDate(typeData.updated_at)}
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

export default ViewContentTypeModal;
