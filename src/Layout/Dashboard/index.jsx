import React, { useState } from "react";
import { Box } from "@mui/material";
import { lightModeColors } from "../../Config/color";
import { useAuth } from "../../Contexts/AuthContext";
import SideNav from "./Components/SideNav";
import MobileSideNav from "./Components/MobileSidenav";
import NavBar from "./Components/Navbar";

const SIDE_NAV_WIDTH = 200;
const LAYOUT_PADDING = 20;
const NAV_HEIGHT = 80;

function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const { user } = useAuth();
  const role = user?.role;

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleSideNavTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleSideNavToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Top Navigation Bar */}
      <NavBar
        sideNavWidth={SIDE_NAV_WIDTH}
        layoutPadding={LAYOUT_PADDING}
        navHeight={NAV_HEIGHT}
        onMenuClick={handleSideNavToggle}
      />

      {/* Side Navigation */}
      <Box
        component="nav"
        sx={{
          width: { sm: SIDE_NAV_WIDTH },
          flexShrink: { sm: 0 }
        }}
        aria-label="side-navigation"
      >
        {/* Mobile Drawer */}
        <MobileSideNav
          open={mobileOpen}
          width={SIDE_NAV_WIDTH}
          role={role}
          onClose={handleDrawerClose}
          onTransitionEnd={handleSideNavTransitionEnd}
        />

        {/* Desktop Drawer */}
        <SideNav width={SIDE_NAV_WIDTH} role={role} />
      </Box>

      {/* Main Content Area */}
      <Box
        flex={1}
        component="main"
        sx={{
          boxSizing: "border-box",
          pl: `${LAYOUT_PADDING + 0}px`,
          pr: `${LAYOUT_PADDING}px`,
          pt: `${NAV_HEIGHT + LAYOUT_PADDING}px`,
          pb: `${LAYOUT_PADDING}px`,
          backgroundColor: lightModeColors.background.default,
          maxWidth: "100%",
          minHeight: "100vh"
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default DashboardLayout;
