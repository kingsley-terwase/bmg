import React from "react";
import {
  Box,
  Typography,
  Button,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const PrivacyTab = () => {
  return (
    <Card>
      <CardContent sx={{ p: 4 }}>
        <Box>
          <Box>
            <Typography variant="h6" mb={2} color="error">
              Danger Zone
            </Typography>

            <Alert severity="warning" sx={{ mb: 3 }}>
              Deleting your account is permanent and cannot be undone.
            </Alert>

            <Button variant="contained" color="error" startIcon={<Delete />}>
              Delete Account
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PrivacyTab;
