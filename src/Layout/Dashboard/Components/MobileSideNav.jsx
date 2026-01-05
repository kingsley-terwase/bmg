import React from "react";
import { Box, Drawer } from "@mui/material";
import { Link } from "react-router-dom";
import { sideNavPaperStyles } from "../data";
import NavigationMenu from "./NavigationMenu";
import { styles } from "../../../styles/dashboard";

function MobileSideNav({ open, width, onClose, onTransitionEnd }) {
  return (
    <Drawer
      variant="temporary"
      open={open}
      onTransitionEnd={onTransitionEnd}
      onClose={onClose}
      ModalProps={{
        keepMounted: true
      }}
      sx={[
        sideNavPaperStyles(width),
        {
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: width
          }
        }
      ]}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <div style={{ display: "flex", margin: "auto" }}>
          <Link to="/">
            <img src="/logo.png" style={styles.mobileLogo} alt="Bmg Logo" />
          </Link>
        </div>
        <NavigationMenu />
      </Box>
    </Drawer>
  );
}

export default MobileSideNav;
