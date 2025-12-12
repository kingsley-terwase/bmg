import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  List,
  Tabs,
  Tab,
  Badge,
  Divider,
  Stack
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VideocamIcon from "@mui/icons-material/Videocam";
import { NotificationItem, CustomModal, PagesHeader } from "../../../Component";
import { useNavigate } from "react-router-dom";
import { VisibilityOutlined } from "@mui/icons-material";

const NotificationsPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      icon: <PersonAddIcon />,
      title: "Update: New Features Added to Your Account!",
      preview:
        "Exciting news! We've rolled out new features to enhance your experience. Check them out in your dashboard today!",
      content:
        "Exciting news! We've rolled out new features to enhance your experience. Check them out in your dashboard today! These new features include advanced analytics, improved collaboration tools, and enhanced security measures. We're committed to providing you with the best possible experience and we think you'll love these updates. Take a moment to explore and let us know what you think!",
      timestamp: "2 hours ago",
      type: "success",
      isRead: false
    },
    {
      id: 2,
      icon: <AttachMoneyIcon />,
      title: "Friendly Tip: Optimize Your Workspace",
      preview:
        "Just a heads-up that your rent payment is due soon. Please make sure to complete the payment before the deadline.",
      content:
        "Just a heads-up that your rent payment is due soon. Please make sure to complete the payment before the deadline to avoid any late fees. You can easily make your payment through our online portal using your preferred payment method. If you have any questions or concerns, our support team is here to help.",
      timestamp: "5 hours ago",
      type: "warning",
      isRead: false
    },
    {
      id: 3,
      icon: <DescriptionIcon />,
      title: "System Notification: Security Check Scheduled",
      preview:
        "For your safety, a system security check is planned for Thursday at 2 AM. No action needed we have got everything!",
      content:
        "For your safety, a system security check is planned for Thursday at 2 AM. No action needed—we have got everything covered! This routine maintenance will ensure your data remains secure and your account stays protected. The check will take approximately 30 minutes and you may experience brief service interruptions during this time.",
      timestamp: "1 day ago",
      type: "error",
      isRead: false
    },
    {
      id: 4,
      icon: <AccessTimeIcon />,
      title: "Quick Reminder: Weekly Goal Check-In",
      preview:
        "Take a moment to review your goals for this week. You're doing great—keep up the momentum!",
      content:
        "Take a moment to review your goals for this week. You're doing great—keep up the momentum! Reflecting on your progress helps you stay on track and motivated. Remember, small steps lead to big achievements. If you need any assistance or resources to help you reach your goals, we're here to support you.",
      timestamp: "2 days ago",
      type: "info",
      isRead: true
    },
    {
      id: 5,
      icon: <VideocamIcon />,
      title: "Heads Up: Free Webinar Tomorrow",
      preview:
        "Join us for a live webinar on Artificial Intelligence! Don't miss out on expert insights and Q&A.",
      content:
        "Join us for a live webinar on Artificial Intelligence! Don't miss out on expert insights and Q&A sessions with industry leaders. We'll be covering the latest trends, best practices, and real-world applications of AI in various industries. This is a great opportunity to learn, ask questions, and network with professionals in the field. Register now to secure your spot!",
      timestamp: "3 days ago",
      type: "warning",
      isRead: true
    }
  ]);

  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedNotification(null), 200);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const getFilteredNotifications = () => {
    if (tabValue === 0) return notifications.filter((n) => !n.isRead);
    if (tabValue === 1) return notifications;
    if (tabValue === 3) return notifications.filter((n) => n.isRead);
    return notifications;
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const filteredNotifications = getFilteredNotifications();

  return (
    <div>
      <PagesHeader
        label="Notifications"
        desc="View all notifications, see their status, update status."
        enableSearch
        placeholder={"Search orders..."}
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "View Campaigns",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/campaigns")
          }
        ]}
      />
      
      <Box sx={{ bgcolor: "grey.50", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="lg">
          <Paper elevation={0} sx={{ borderRadius: 2, overflow: "hidden" }}>
            {/* Header */}
            <Box sx={{ p: 3, borderBottom: 1, borderColor: "divider" }}>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Notifications
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  sx={{ flexGrow: 1 }}
                >
                  <Tab
                    label={
                      <Badge badgeContent={unreadCount} color="error">
                        Unread
                      </Badge>
                    }
                  />
                  <Tab label="All" />
                  <Tab label="Mark all as read" onClick={handleMarkAllAsRead} />
                  <Tab label="Archived" />
                </Tabs>
              </Stack>
            </Box>

            {/* Notifications List */}
            <List sx={{ p: 0 }}>
              {filteredNotifications.length === 0 ? (
                <Box sx={{ p: 6, textAlign: "center" }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No notifications
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tabValue === 0
                      ? "You're all caught up!"
                      : "No notifications to display"}
                  </Typography>
                </Box>
              ) : (
                filteredNotifications.map((notification, index) => (
                  <React.Fragment key={notification.id}>
                    <NotificationItem
                      notification={notification}
                      onClick={() => handleNotificationClick(notification)}
                      isUnread={!notification.isRead}
                    />
                    {index < filteredNotifications.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              )}
            </List>
          </Paper>

          {/* Reusable Modal */}
          {selectedNotification && (
            <CustomModal
              open={modalOpen}
              onClose={handleModalClose}
              icon={selectedNotification.icon}
              title={selectedNotification.title}
              content={selectedNotification.content}
              timestamp={selectedNotification.timestamp}
              type={selectedNotification.type}
            />
          )}
        </Container>
      </Box>
    </div>
  );
};

export default NotificationsPage;
