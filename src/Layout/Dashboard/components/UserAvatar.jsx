import React from "react";
import { Box } from "@mui/material";

function UserAvatar({ onClick, initial = "U" }) {
  return (
    <Box
      sx={{
        height: "42px",
        width: "42px",
        backgroundColor: "#f5f5f5",
        borderRadius: 999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#000",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: "#C0C0C0",
          transform: "scale(1.05)"
        }
      }}
      onClick={onClick}
    >
      {initial}
    </Box>
  );
}

export default UserAvatar;
