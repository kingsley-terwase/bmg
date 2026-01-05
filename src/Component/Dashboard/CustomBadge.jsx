import { ArrowForward, CheckRounded } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

const BADGE_CONFIG = {
  success: {
    background: "#eaffed",
    color: "#009512",
    icon: <CheckRounded fontSize="inherit" />
  },
  danger: {
    background: "#ffe9e9",
    color: "#F75151",
    icon: <ArrowForward fontSize="inherit" />
  }
};

const StatusBadge = ({ variant = "success", label = "" }) => {
  const config = BADGE_CONFIG[variant] ?? BADGE_CONFIG.success;

  return (
    <Stack
      direction="row"
      spacing={0.5}
      alignItems="center"
      sx={{
        backgroundColor: config.background,
        borderRadius: 999,
        px: 0.8,
        py: 0.5,
        width: "fit-content"
      }}
    >
      <Box
        sx={{
          backgroundColor: config.color,
          color: "#fff",
          height: 20,
          width: 20,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 15
        }}
      >
        {config.icon}
      </Box>

      <Typography
        variant="caption"
        sx={{
          fontWeight: 500,
          fontSize: 12,
          color: config.color,
          mr: 0.5
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
};

export default StatusBadge;
