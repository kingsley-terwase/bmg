import { Box, Typography, useTheme } from "@mui/material";
import styles from "./style";

export default function Hero() {
  const theme = useTheme();

  return (
    <Box
      sx={[
        styles,
        {
          backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.lightBg} 0%, ${theme.palette.background.paper} 100%)`,
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      ]}
    >
      <Typography className="title">Personalise Your Order</Typography>
      <Typography
        component="span"
        className="service"
        sx={{
          backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        }}
      >
        Logo & Graphic Design
      </Typography>
      <Typography className="description">
        Design an order that fits your style and preferences.
      </Typography>
    </Box>
  );
}
