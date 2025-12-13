import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { Check, Star, Receipt, AddOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { plans, billingHistory, usageStats } from "./data";
import { PagesHeader } from "../../../Component";

const UserSubscriptionsPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Box>
      <PagesHeader
        label="My Subscriptions"
        desc={"Manage your subscription plan and billing."}
        actions={[
          {
            label: "Book Consultation",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/user/book-consultation")
          },
          {
            label: "My Orders",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/user/orders")
          },
          {
            label: "AI Services",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/user/artificial-intelligence")
          }
        ]}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Current Plan
              </Typography>
              <Box
                sx={{
                  p: 3,
                  bgcolor: "primary.light",
                  borderRadius: 2,
                  mb: 2
                }}
              >
                <Typography variant="h4" fontWeight={700} color="#fff">
                  Pro Plan
                </Typography>
                <Typography variant="h5" fontWeight={600} mt={1} color="#fff">
                  $29
                  <Typography component="span" variant="body1">
                    /month
                  </Typography>
                </Typography>
              </Box>

              <Stack spacing={2} mb={3}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip label="Active" color="success" size="small" />
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Next Billing
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    Dec 1, 2024
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Auto-Renewal
                  </Typography>
                  <Chip
                    label="Enabled"
                    color="success"
                    size="small"
                    variant="outlined"
                  />
                </Stack>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ textTransform: "none" }}
                >
                  Upgrade Plan
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ textTransform: "none" }}
                  onClick={() => setCancelDialogOpen(true)}
                >
                  Cancel Subscription
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={3}>
                Usage Statistics
              </Typography>
              <Grid container spacing={3}>
                {usageStats.map((stat, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mb={1}
                        >
                          {stat.label}
                        </Typography>
                        <Typography variant="h5" fontWeight={600} mb={2}>
                          {stat.used}
                          {stat.unit || ""} / {stat.total}
                          {stat.unit || ""}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={stat.percentage}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block", mt: 1 }}
                        >
                          {stat.percentage}% used
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Billing History
              </Typography>
              <Stack spacing={2}>
                {billingHistory.map((bill, index) => (
                  <Card key={index} variant="outlined">
                    <CardContent>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar sx={{ bgcolor: "primary.light" }}>
                            <Receipt color="primary" />
                          </Avatar>
                          <Box>
                            <Typography variant="body1" fontWeight={600}>
                              {bill.invoice}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {bill.date}
                            </Typography>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Typography variant="h6" fontWeight={600}>
                            {bill.amount}
                          </Typography>
                          <Chip
                            label={bill.status}
                            color="success"
                            size="small"
                          />
                          <Button size="small" sx={{ textTransform: "none" }}>
                            Download
                          </Button>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography variant="h5" fontWeight={600} mb={3}>
            Available Plans
          </Typography>
          <Grid container spacing={3}>
            {plans.map((plan) => (
              <Grid item xs={12} md={4} key={plan.id}>
                <Card
                  sx={{
                    height: "100%",
                    position: "relative",
                    border: plan.popular ? 2 : 1,
                    borderColor: plan.popular ? "primary.main" : "divider",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 6
                    }
                  }}
                >
                  {plan.popular && (
                    <Chip
                      label="Most Popular"
                      color="primary"
                      size="small"
                      icon={<Star />}
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16
                      }}
                    />
                  )}
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" fontWeight={700} mb={1}>
                      {plan.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                      {plan.description}
                    </Typography>
                    <Typography variant="h3" fontWeight={700} mb={1}>
                      {plan.price}
                      <Typography component="span" variant="body1">
                        {plan.period}
                      </Typography>
                    </Typography>
                    <Button
                      fullWidth
                      variant={
                        plan.id === selectedPlan ? "outlined" : "contained"
                      }
                      sx={{
                        my: 3,
                        textTransform: "none",
                        fontWeight: 600
                      }}
                      disabled={plan.id === selectedPlan}
                    >
                      {plan.id === selectedPlan
                        ? "Current Plan"
                        : "Choose Plan"}
                    </Button>
                    <List dense>
                      {plan.features.map((feature, idx) => (
                        <ListItem key={idx} disableGutters>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Check color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary={feature}
                            primaryTypographyProps={{ variant: "body2" }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
      >
        <DialogTitle>Cancel Subscription</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel your subscription? You'll lose
            access to all Pro features at the end of your billing period.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>
            Keep Subscription
          </Button>
          <Button onClick={() => setCancelDialogOpen(false)} color="error">
            Cancel Subscription
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserSubscriptionsPage;
