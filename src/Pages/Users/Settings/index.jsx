/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Stack,
  Typography,
} from "@mui/material";
import {
  PhotoCamera,
  Save,
  AddOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { PagesHeader } from "../../../Component";
import { DashboardTab, CustomTab } from "../../../Component";
import { settingsTabs } from "./data";
import SecurityTab from "./security-tab";
import PrivacyTab from "./privacy";
import PrefrenceTab from "./prefrences";
import { useUserContext } from "../../../Contexts";

const UserSettingsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const userInfo = user?.user;

  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address_one: "",
    address_two: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
    profile_picture: null,
  });

  useEffect(() => {
    if (!userInfo) return;

    setProfileData({
      first_name: userInfo.first_name || "",
      last_name: userInfo.last_name || "",
      email: userInfo.email || "",
      phone: userInfo.phone || "",
      address_one: userInfo.address_one || "",
      address_two: userInfo.address_two || "",
      city: userInfo.city || "",
      state: userInfo.state || "",
      country: userInfo.country || "",
      zip_code: userInfo.zip_code || "",
      profile_picture: null,
    });
  }, [userInfo]);

  const handleChange = (field) => (e) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileData((prev) => ({
      ...prev,
      profile_picture: file,
    }));
  };

  const handleSave = () => {
    const payload = new FormData();

    Object.entries(profileData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        payload.append(key, value);
      }
    });

    console.log("Submitting profile update:", [...payload.entries()]);
  };

  return (
    <Box>
      <PagesHeader
        label="Settings"
        desc="Manage your account settings and preferences"
        actions={[
          {
            label: "Book Consultation",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/user/consultations"),
          },
          {
            label: "My Orders",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/user/orders"),
          },
          {
            label: "AI Services",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/user/artificial-intelligence"),
          },
        ]}
      />

      <CustomTab
        tabs={settingsTabs}
        activeTab={activeTab}
        updateActiveTab={setActiveTab}
      />

      <DashboardTab tabKey={0} activeTab={activeTab}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Stack direction="row" spacing={3} mb={4} alignItems={"baseline"}>
              <Avatar
                sx={{ width: 100, height: 100, bgcolor: "primary.main" }}
                src={userInfo?.profile_picture}
              >
                <Typography sx={{ textTransform: "uppercase" }}>
                  {profileData.first_name?.[0] || "U"}
                </Typography>
              </Avatar>

              <Box>
                <Button
                  component="label"
                  startIcon={<PhotoCamera />}
                  variant="outlined"
                >
                  Upload Photo
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleFileChange}
                  />
                </Button>
              </Box>
            </Stack>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="First Name"
                  fullWidth
                  value={profileData.first_name}
                  onChange={handleChange("first_name")}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Last Name"
                  fullWidth
                  value={profileData.last_name}
                  onChange={handleChange("last_name")}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Email"
                  fullWidth
                  value={profileData.email}
                  disabled
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Phone"
                  fullWidth
                  value={profileData.phone}
                  onChange={handleChange("phone")}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Address Line 1"
                  fullWidth
                  value={profileData.address_one}
                  onChange={handleChange("address_one")}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Address Line 2"
                  fullWidth
                  value={profileData.address_two}
                  onChange={handleChange("address_two")}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="City"
                  fullWidth
                  value={profileData.city}
                  onChange={handleChange("city")}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="State"
                  fullWidth
                  value={profileData.state}
                  onChange={handleChange("state")}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="ZIP Code"
                  fullWidth
                  value={profileData.zip_code}
                  onChange={handleChange("zip_code")}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Country"
                  fullWidth
                  value={profileData.country}
                  disabled
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
          </CardContent>
        </Card>
      </DashboardTab>

      <DashboardTab tabKey={1} activeTab={activeTab}>
        <SecurityTab />
      </DashboardTab>

      <DashboardTab tabKey={2} activeTab={activeTab}>
        <PrefrenceTab />
      </DashboardTab>

      <DashboardTab tabKey={3} activeTab={activeTab}>
        <PrivacyTab />
      </DashboardTab>
    </Box>
  );
};

export default UserSettingsPage;
