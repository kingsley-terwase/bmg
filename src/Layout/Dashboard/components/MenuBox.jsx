import { Box, Badge } from "@mui/material";

function MenuBox({ icon, count = 0 }) {
  return (
    <Badge
      badgeContent={count}
      sx={{
        "& .MuiBadge-badge": {
          fontSize: "10px",
          height: "20px",
          minWidth: "18px",
          fontWeight: 600,
          color: "#fff",
          backgroundColor: "#e65100"
        }
      }}
    >
      <Box
        sx={{
          height: "40px",
          width: "40px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          transition: "all 0.2s ease",
          color: "#666",
          "&:hover": {
            backgroundColor: "#e0e0e0",
            color: "#000",
            transform: "scale(1.05)"
          }
        }}
      >
        {icon}
      </Box>
    </Badge>
  );
}

export default MenuBox;
