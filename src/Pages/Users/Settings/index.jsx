import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Avatar,
  IconButton,
  Tabs,
  Tab,
  Stack,
  Divider,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import {
  PhotoCamera,
  Visibility,
  VisibilityOff,
  Save,
  Delete,
  AddOutlined,
  VisibilityOutlined
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { PagesHeader } from "../../../Component";

const UserSettingsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "user@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Creative professional passionate about design and innovation",
    country: "United States",
    timezone: "America/New_York"
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyDigest: true,
    productUpdates: true
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
    sessionTimeout: "30"
  });

  const handleTabChange = (_, newValue) => setActiveTab(newValue);

  const handleSave = () => {
    console.log("Settings saved");
  };
  const navigate = useNavigate();

  return (
    <Box>
      <PagesHeader
        label="Settings"
        desc={"Manage your account settings and preferences"}
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

      <Card>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}
        >
          <Tab label="Profile" />
          <Tab label="Security" />
          <Tab label="Notifications" />
          <Tab label="Preferences" />
          <Tab label="Privacy" />
        </Tabs>

        <CardContent sx={{ p: 4 }}>
          {activeTab === 0 && (
            <Box>
              <Stack direction="row" spacing={3} mb={4}>
                <Avatar
                  sx={{ width: 120, height: 120, bgcolor: "primary.main" }}
                >
                  JD
                </Avatar>
                <Button startIcon={<PhotoCamera />} variant="outlined">
                  Upload Photo
                </Button>
              </Stack>

              <Grid container spacing={3}>
                {["firstName", "lastName", "email", "phone"].map((field) => (
                  <Grid item xs={12} md={6} key={field}>
                    <TextField
                      fullWidth
                      label={field.replace(/^\w/, (c) => c.toUpperCase())}
                      value={profileData[field]}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          [field]: e.target.value
                        })
                      }
                    />
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Bio"
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                startIcon={<Save />}
                sx={{ mt: 4 }}
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </Box>
          )}

          {/* SECURITY TAB */}
          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" mb={2}>
                Password & Security
              </Typography>

              <TextField
                fullWidth
                label="Current Password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
              />

              <Divider sx={{ my: 3 }} />

              <FormControlLabel
                control={
                  <Switch
                    checked={security.twoFactor}
                    onChange={(e) =>
                      setSecurity({ ...security, twoFactor: e.target.checked })
                    }
                  />
                }
                label="Enable Two-Factor Authentication"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={security.loginAlerts}
                    onChange={(e) =>
                      setSecurity({
                        ...security,
                        loginAlerts: e.target.checked
                      })
                    }
                  />
                }
                label="Login Alerts"
              />
            </Box>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" mb={3}>
                Notification Settings
              </Typography>

              {Object.keys(notifications).map((key) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Switch
                      checked={notifications[key]}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          [key]: e.target.checked
                        })
                      }
                    />
                  }
                  label={key.replace(/([A-Z])/g, " $1")}
                />
              ))}
            </Box>
          )}

          {/* PREFERENCES TAB */}
          {activeTab === 3 && (
            <Box>
              <Typography variant="h6" mb={3}>
                Preferences
              </Typography>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Theme</InputLabel>
                <Select label="Theme" defaultValue="system">
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                  <MenuItem value="system">System</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select label="Language" defaultValue="en">
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}

          {/* PRIVACY TAB */}
          {activeTab === 4 && (
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
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserSettingsPage;
