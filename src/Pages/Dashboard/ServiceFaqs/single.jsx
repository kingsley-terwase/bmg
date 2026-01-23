/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
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
import { useGetServiceFaq } from "../../../Hooks/Dashboard/service_faqs";
import { InputLabel } from "../../../Component";

const SingleServiceFaqModal = ({ open, onClose, serviceId }) => {
  const navigate = useNavigate();
  const { faqData, getMethod } = useGetServiceFaq();

  useEffect(() => {
    if (open && serviceId) {
      getMethod(serviceId);
    }
  }, [open, serviceId]);

  if (!faqData) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogContent sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary">
            FAQ data not found
          </Typography>
          <Box mt={3}>
            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  const handleEdit = () => {
    navigate("/dashboard/admin/faqs/edit", { state: { data: faqData } });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Delete FAQ: "${faqData.question}"?`)) {
      // delete logic here
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, maxHeight: "90vh" },
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

      <DialogContent sx={{ p: 4 }}>
        <InputLabel text="Question" size="10px" />
        <Typography variant="h5" fontWeight={700} mb={2}>
          {faqData.question}
        </Typography>

        <InputLabel text="Answer" size="10px" />

        <Typography sx={{ lineHeight: 1.8, color: "text.secondary" }} mb={3}>
          {faqData.answer}
        </Typography>

        {faqData.category_name && (
          <>
            <Typography variant="subtitle2" color="text.secondary" mb={0.5}>
              Category
            </Typography>
            <Typography variant="body1" mb={3}>
              {faqData.category_name}
            </Typography>
          </>
        )}

        <Divider sx={{ my: 3 }} />

        <Typography variant="overline" fontWeight={600} color="text.secondary">
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
                {formatDate(faqData.created_at)}
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
                {formatDate(faqData.updated_at)}
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
            Edit FAQ
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default SingleServiceFaqModal;
