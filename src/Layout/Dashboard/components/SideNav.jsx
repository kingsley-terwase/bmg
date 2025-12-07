import React from "react";
import { Box, Drawer } from "@mui/material";
import { Link } from "react-router-dom";
import NavigationMenu from "./NavigationMenu";
import { sideNavPaperStyles } from "../data";
import { styles } from "../../../styles/dashboard";

function SideNav({ width, role }) {
  return (
    <Drawer
      variant="permanent"
      sx={[
        sideNavPaperStyles(width, role),
        { display: { xs: "none", sm: "block" } }
      ]}
      open
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{display: "flex", margin: "auto"}}>
          <Link to="/">
            <img src="/logo-v2.png" style={styles.logo} alt="Bmg Logo" />
          </Link>
        </div>
        <NavigationMenu role={role} />
      </Box>
    </Drawer>
  );
}

export default SideNav;
