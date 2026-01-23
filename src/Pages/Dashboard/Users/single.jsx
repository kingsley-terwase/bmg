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
  EmailOutlined,
  PhoneOutlined,
  LocationOnOutlined,
  PersonOutlined,
  VerifiedOutlined,
} from "@mui/icons-material";
import { formatDate } from "../../../utils/functions";
import { useDeleteAdmin } from "../../../Hooks/Dashboard/admins";
import { ConfirmDeleteModal } from "../../../Component";
import { showToast } from "../../../utils/toast";
import { useFetchUsers } from "../../../Hooks/Dashboard/users";
import { useUpdateUserStatus } from "../../../Hooks/Dashboard/users";

const SingleUserModal = ({ open, onClose, user }) => {
  const { refetch } = useFetchUsers();
  const updateStatus = useUpdateUserStatus();
  const deleteAdmin = useDeleteAdmin();

  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);

  console.log("retrieved user:", user);

  useEffect(() => {
    if (!user) return;

    setStatus(Boolean(user.status));
  }, [user]);

  const handleStatusUpdate = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const res = await updateStatus(user.id, status);
      if (res) {
        showToast.success("Role updated successfully.");
        await refetch();
      }

      onclose();
    } catch (error) {
      console.error(error);
      showToast.error("User status update failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    if (!user?.id) {
      showToast.error("Invalid User ID");
      return;
    }

    setLoading(true);
    try {
      const res = await deleteAdmin(user.id);
      if (res) {
        setOpenDelete(false);
        onClose();
        await refetch();
        showToast.success("User deleted successfully.");
      }
    } catch (error) {
      console.error(error);
      showToast.error("Failed to delete User.");
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
        <>
          <Box
            sx={{
              bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              p: 4,
              pb: 6,
            }}
          >
            <Stack direction="row" spacing={3} alignItems="center">
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src={user?.profile_image || user?.avatar}
                  alt={`${user?.first_name} ${user?.last_name}`}
                  sx={{
                    width: 120,
                    height: 120,
                    border: "4px solid white",
                    boxShadow: 3,
                  }}
                >
                  <PersonOutlined sx={{ fontSize: 60 }} />
                </Avatar>
                {user?.is_verified && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 5,
                      right: 5,
                      bgcolor: "success.main",
                      borderRadius: "50%",
                      p: 0.5,
                      border: "3px solid white",
                    }}
                  >
                    <VerifiedOutlined sx={{ fontSize: 20, color: "white" }} />
                  </Box>
                )}
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  color="white"
                  sx={{ mb: 1 }}
                >
                  {user?.first_name} {user?.last_name}
                </Typography>
                <Typography
                  variant="body1"
                  color="rgba(255,255,255,0.9)"
                  mb={2}
                >
                  @{user?.username || user?.email?.split("@")[0]}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={status ? "Active" : "Inactive"}
                    size="small"
                    color={status ? "success" : "default"}
                    sx={{
                      fontWeight: 600,
                      bgcolor: status ? "success.main" : "grey.500",
                      color: "white",
                    }}
                  />
                  {user?.role && (
                    <Chip
                      label={user?.role}
                      size="small"
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.2)",
                        color: "white",
                        fontWeight: 600,
                        backdropFilter: "blur(10px)",
                      }}
                    />
                  )}
                  {user?.is_verified && (
                    <Chip
                      label="Verified"
                      size="small"
                      icon={
                        <VerifiedOutlined
                          sx={{ fontSize: 16, color: "white !important" }}
                        />
                      }
                      sx={{
                        bgcolor: "rgba(76, 175, 80, 0.3)",
                        color: "white",
                        fontWeight: 600,
                        backdropFilter: "blur(10px)",
                      }}
                    />
                  )}
                  {user?.is_subscribed && (
                    <Chip
                      label="Subscribed"
                      size="small"
                      icon={
                        <VerifiedOutlined
                          sx={{ fontSize: 16, color: "white !important" }}
                        />
                      }
                      sx={{
                        bgcolor: "rgba(76, 175, 80, 0.3)",
                        color: "white",
                        fontWeight: 600,
                        backdropFilter: "blur(10px)",
                      }}
                    />
                  )}
                </Stack>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ p: 4 }}>
            {/* Contact Information */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="overline"
                color="text.secondary"
                fontWeight={600}
                sx={{ letterSpacing: 1.2 }}
              >
                Contact Information
              </Typography>
              <Divider sx={{ mt: 1, mb: 2 }} />

              <Grid container spacing={2}>
                {user?.email && (
                  <Grid item size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        bgcolor: "grey.50",
                        borderRadius: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "primary.light",
                          width: 40,
                          height: 40,
                          mr: 2,
                        }}
                      >
                        <EmailOutlined
                          sx={{ fontSize: 20, color: "primary.main" }}
                        />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          fontWeight={600}
                        >
                          Email Address
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {user?.email}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                )}

                {user?.phone && (
                  <Grid item size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        bgcolor: "grey.50",
                        borderRadius: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "success.light",
                          width: 40,
                          height: 40,
                          mr: 2,
                        }}
                      >
                        <PhoneOutlined
                          sx={{ fontSize: 20, color: "success.main" }}
                        />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          fontWeight={600}
                        >
                          Phone Number
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {user?.phone}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                )}

                {user?.address_one && (
                  <Grid item size={{ xs: 12 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        bgcolor: "grey.50",
                        borderRadius: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "warning.light",
                          width: 40,
                          height: 40,
                          mr: 2,
                        }}
                      >
                        <LocationOnOutlined
                          sx={{ fontSize: 20, color: "warning.main" }}
                        />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          fontWeight={600}
                        >
                          Address
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {user?.address}
                          {user?.city && `, ${user?.city}`}
                          {user?.country && `, ${user?.country}`}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Timeline */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="overline"
                color="text.secondary"
                fontWeight={600}
                sx={{ letterSpacing: 1.2 }}
              >
                Account Timeline
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
                      Joined Date
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {formatDate(user?.created_at)}
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
                      Last Activity
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {formatDate(user?.updated_at || user?.last_login)}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Action Buttons */}
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              flexWrap="wrap"
            >
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
                Terminate
              </Button>
              <Button
                variant="contained"
                startIcon={<EditOutlined />}
                onClick={handleStatusUpdate}
                sx={{ textTransform: "none", px: 3 }}
              >
                Update Status
              </Button>
            </Stack>
          </Box>
        </>
      </DialogContent>

      <ConfirmDeleteModal
        open={openDelete}
        title="Delete Customer"
        itemName={`${user?.first_name} ${user?.last_name}`}
        loading={loading}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </Dialog>
  );
};

export default SingleUserModal;
