import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Button,
  Menu
} from "@mui/material";

// Mock notifications data - replace with props if needed
const mockNotifications = [
  {
    userIcon: "U",
    title: "New Message",
    message: "You have received a new message."
  },
  {
    userIcon: "U",
    title: "Payment Received",
    message: "You have received a payment."
  },
  {
    userIcon: "U",
    title: "Order Shipped",
    message: "Your order has been shipped."
  }
];

function NotificationsMenu({
  anchorEl,
  open,
  onClose,
  activities = mockNotifications
}) {
  const notifications = Array.isArray(activities) ? activities : [];

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 320,
          maxHeight: 400,
          overflow: "visible"
        }
      }}
    >
      <Box sx={{ width: 320, maxHeight: 400, overflow: "auto" }}>
        {/* Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid #e0e0e0",
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            zIndex: 1
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Notifications
          </Typography>
          <Typography variant="caption" color="text.secondary">
            You have {notifications.length} unread notifications
          </Typography>
        </Box>

        {/* Notification List */}
        <List sx={{ p: 0 }}>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <React.Fragment key={index}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    "&:hover": { backgroundColor: "#f5f5f5" },
                    cursor: "pointer",
                    transition: "background-color 0.2s ease"
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        backgroundColor: "#1976d2",
                        width: 40,
                        height: 40
                      }}
                    >
                      {notification.userIcon || "N"}
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={600}>
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                          sx={{ display: "block", mt: 0.5 }}
                        >
                          {notification.message}
                        </Typography>

                        {notification.time && (
                          <Typography
                            component="span"
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block", mt: 0.5 }}
                          >
                            {notification.time}
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItem>

                {index < notifications.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))
          ) : (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                No notifications yet
              </Typography>
            </Box>
          )}
        </List>

        {/* Footer */}
        {notifications.length > 0 && (
          <Box
            sx={{
              p: 2,
              borderTop: "1px solid #e0e0e0",
              textAlign: "center"
            }}
          >
            <Button
              fullWidth
              variant="text"
              onClick={onClose}
              sx={{
                textTransform: "none",
                fontWeight: 600
              }}
            >
              View All Notifications
            </Button>
          </Box>
        )}
      </Box>
    </Menu>
  );
}

export default NotificationsMenu;
