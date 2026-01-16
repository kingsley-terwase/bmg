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
import { useUserContext } from "../../../Contexts";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const userInfo = user?.user;

  const [profileData, setProfileData] = useState({
    name: "",
    logo: null, // base64
    email: "",
    phone: "",
    address_one: "",
    address_two: "",
    postal_code: "",
    country: "",
    country_code: "",
    welc_msg: "",
    about_us: "",
    facebook_link: "",
    instagram_link: "",
    twitter_link: "",
    youtube_link: "",
  });

  useEffect(() => {
    if (!userInfo) return;

    setProfileData({
      name: userInfo.name || "",
      email: userInfo.email || "",
      phone: userInfo.phone || "",
      address_one: userInfo.address_one || "",
      address_two: userInfo.address_two || "",
      postal_code: userInfo.postal_code || "",
      country: userInfo.country || "",
      country_code: userInfo.country_code || "",
      welc_msg: userInfo.welc_msg || "",
      about_us: userInfo.about_us || "",
      facebook_link: userInfo.facebook_link || "",
      instagram_link: userInfo.instagram_link || "",
      twitter_link: userInfo.twitter_link || "",
      youtube_link: userInfo.youtube_link || "",
      logo: null,
    });
  }, [userInfo]);

  const handleChange = (field) => (e) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData((prev) => ({
        ...prev,
        logo: reader.result,
      }));
    };
    reader.readAsDataURL(file);
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
            {/* Header */}
            <Stack direction="row" spacing={3} mb={4} alignItems="center">
              <Avatar
                src={profileData.logo}
                sx={{ width: 96, height: 96, bgcolor: "primary.main" }}
              >
                {profileData.name?.[0] || "B"}
              </Avatar>

              <Button
                component="label"
                startIcon={<PhotoCamera />}
                variant="outlined"
              >
                Upload Logo
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </Button>
            </Stack>

            <Grid container spacing={3}>
              {/* Platform Name */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Platform Name"
                  fullWidth
                  value={profileData.name}
                  onChange={handleChange("name")}
                />
              </Grid>

              {/* Email */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Contact Email"
                  fullWidth
                  value={profileData.email}
                  onChange={handleChange("email")}
                />
              </Grid>

              {/* Phone */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  value={profileData.phone}
                  onChange={handleChange("phone")}
                />
              </Grid>

              {/* Country */}
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  label="Country"
                  fullWidth
                  value={profileData.country}
                  onChange={handleChange("country")}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  label="Country Code"
                  fullWidth
                  value={profileData.country_code}
                  onChange={handleChange("country_code")}
                />
              </Grid>

              {/* Address */}
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
                  label="Postal Code"
                  fullWidth
                  value={profileData.postal_code}
                  onChange={handleChange("postal_code")}
                />
              </Grid>

              {/* Welcome Message */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Welcome Message"
                  fullWidth
                  multiline
                  rows={2}
                  value={profileData.welc_msg}
                  onChange={handleChange("welc_msg")}
                />
              </Grid>

              {/* About Us */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="About Us"
                  fullWidth
                  multiline
                  rows={4}
                  value={profileData.about_us}
                  onChange={handleChange("about_us")}
                />
              </Grid>

              {/* Social Links */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Facebook Link"
                  fullWidth
                  value={profileData.facebook_link}
                  onChange={handleChange("facebook_link")}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Instagram Link"
                  fullWidth
                  value={profileData.instagram_link}
                  onChange={handleChange("instagram_link")}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Twitter / X Link"
                  fullWidth
                  value={profileData.twitter_link}
                  onChange={handleChange("twitter_link")}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="YouTube Link"
                  fullWidth
                  value={profileData.youtube_link}
                  onChange={handleChange("youtube_link")}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              startIcon={<Save />}
              sx={{ mt: 4 }}
              onClick={handleSave}
            >
              Save Organization Profile
            </Button>
          </CardContent>
        </Card>
      </DashboardTab>
    </Box>
  );
};

export default SettingsPage;
