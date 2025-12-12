import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Chip
} from '@mui/material';

const NotificationItem = ({ notification, onClick, isUnread }) => {
  const getAvatarStyles = () => {
    const styles = {
      success: { bgcolor: '#e8f5e9', color: '#4caf50' },
      warning: { bgcolor: '#fff8e1', color: '#ff9800' },
      error: { bgcolor: '#ffebee', color: '#f44336' },
      info: { bgcolor: '#e3f2fd', color: '#2196f3' },
      default: { bgcolor: '#f5f5f5', color: '#9e9e9e' }
    };
    return styles[notification.type] || styles.default;
  };

  return (
    <ListItem
      button
      onClick={onClick}
      sx={{
        bgcolor: isUnread ? 'action.hover' : 'transparent',
        '&:hover': {
          bgcolor: 'action.selected'
        },
        borderLeft: isUnread ? 4 : 0,
        borderColor: 'primary.main',
        transition: 'all 0.2s'
      }}
    >
      <ListItemAvatar>
        <Avatar sx={getAvatarStyles()}>
          {notification.icon}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle1" fontWeight={isUnread ? 600 : 400}>
              {notification.title}
            </Typography>
            {isUnread && (
              <Chip label="New" size="small" color="primary" sx={{ height: 20 }} />
            )}
          </Box>
        }
        secondary={
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              mt: 0.5
            }}
          >
            {notification.preview}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default NotificationItem;