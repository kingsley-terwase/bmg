import { Box, Badge, Typography } from "@mui/material";

const CreditBox = ({ balance = "0.00" }) => {
  return (
    <Box
      sx={{
        height: "40px",
        width: "80px",
        backgroundColor: "#764ba2",
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        transition: "all 0.2s ease",
        color: "#ffffffff",
        "&:hover": {
          backgroundColor: "#2C3891",
          color: "#ffffff",
          transform: "scale(1.05)",
        },
      }}
    >
      <Typography
        sx={{ fontWeight: 500, fontSize: 8, fontFamily: "comfortaa" }}
      >
        Credit Balance
      </Typography>
      <Typography sx={{ fontWeight: 600, fontSize: 18, fontFamily: "jost" }}>
        {balance}
      </Typography>
    </Box>
  );
};

export default CreditBox;
