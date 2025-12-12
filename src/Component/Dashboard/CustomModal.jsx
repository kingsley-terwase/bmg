import React from 'react';
import {
  Box,
  Modal,
  Typography,
  IconButton,
  Button,
  Avatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CustomModal = ({ open, onClose, icon, title, content, timestamp, type }) => {
  const getBackgroundColor = () => {
    const colors = {
      success: '#e8f5e9',
      warning: '#fff8e1',
      error: '#ffebee',
      info: '#e3f2fd',
      default: '#f5f5f5'
    };
    return colors[type] || colors.default;
  };

  const getIconColor = () => {
    const colors = {
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336',
      info: '#2196f3',
      default: '#9e9e9e'
    };
    return colors[type] || colors.default;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="notification-modal-title"
      aria-describedby="notification-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 600 },
          maxHeight: '90vh',
          overflow: 'auto',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        {/* Modal Header */}
        <Box
          sx={{
            p: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{
                bgcolor: getBackgroundColor(),
                color: getIconColor(),
                width: 56,
                height: 56
              }}
            >
              {icon}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {title}
              </Typography>
              {timestamp && (
                <Typography variant="caption" color="text.secondary">
                  {timestamp}
                </Typography>
              )}
            </Box>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Modal Content */}
        <Box sx={{ p: 3 }}>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            {content}
          </Typography>
        </Box>

        {/* Modal Footer */}
        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2
          }}
        >
          <Button variant="outlined" onClick={onClose}>
            Dismiss
          </Button>
          <Button variant="contained" onClick={onClose}>
            Mark as Read
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;