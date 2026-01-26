import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";
import { DeleteOutline, WarningAmberOutlined } from "@mui/icons-material";
import { CustomButton } from "../../Component";

const ConfirmDeleteModal = ({
  open,
  title = "Delete Confirmation",
  description = "This action cannot be undone. Are you sure you want to proceed?",
  itemName,
  loading = false,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "error.light",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WarningAmberOutlined color="error" />
          </Box>

          <Typography fontWeight={600}>{title}</Typography>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" mt={1}>
          {description}
        </Typography>

        {itemName && (
          <Typography
            mt={2}
            fontWeight={600}
            color="error.main"
            sx={{ wordBreak: "break-word" }}
          >
            {itemName}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <CustomButton
          title="Cancel"
          variant="outlined"
          color="primary"
          disabled={loading}
          onClick={onClose}
          sx={{ textTransform: "none", minWidth: 110 }}
        />

        <CustomButton
          title={loading ? "Deleting..." : "Delete"}
          color="danger"
          variant="filled"
          startIcon={
            loading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <DeleteOutline />
            )
          }
          disabled={loading}
          onClick={onConfirm}
          sx={{ textTransform: "none", minWidth: 120 }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
