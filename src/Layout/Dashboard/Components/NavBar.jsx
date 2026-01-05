import React, { useState } from "react";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon
} from "@mui/material";
import { Menu as MenuIcon, Notifications, Logout } from "@mui/icons-material";
import NotificationsMenu from "./NotificationsMenu";
import UserAvatar from "./UserAvatar";
import MenuBox from "./MenuBox";
import { WavingHandOutlined } from "@mui/icons-material";
import { dbColors } from "../../../Config/color";
import { useNavigate } from "react-router-dom";

function NavBar({ sideNavWidth, layoutPadding, navHeight, onMenuClick }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);

  const navigate = useNavigate();

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsClick = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    handleMenuClose();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        pl: {
          xs: `${layoutPadding}px`,
          md: `${sideNavWidth + layoutPadding}px`
        },
        pr: `${layoutPadding}px`,
        height: `${navHeight}px`,
        backgroundColor: "#FFF",
        boxShadow: "0 2px 6px rgba(200, 200, 200, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 99
      }}
    >
      <Stack direction="row" alignItems="center">
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{ display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box>
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography
              fontSize={{ xs: 16, md: 24 }}
              fontWeight={700}
              color="#000"
            >
              Good Morning, Jimie
            </Typography>
            <WavingHandOutlined
              sx={{
                fontSize: { xs: 20, md: 30 },
                mt: -0.5,
                color: dbColors.main.default
              }}
            />
          </Stack>
          <Typography display={{ xs: "none", md: "block" }} fontSize={12}>
            Wednesday, November 19, 2025{" "}
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" alignItems="center" gap={{ xs: 1, md: 4 }}>
        <Stack direction="row" alignItems="center" gap={{ xs: 2, md: 7 }}>
          <Box onClick={handleNotificationsClick}>
            <MenuBox icon={<Notifications />} count={3} />
          </Box>

          <NotificationsMenu
            anchorEl={notificationsAnchorEl}
            open={Boolean(notificationsAnchorEl)}
            onClose={handleNotificationsClose}
          />

          <UserAvatar onClick={handleSettingsClick} />

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
}

export default NavBar;
