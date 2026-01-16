import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Sparkle24Regular, Wand24Regular } from "@fluentui/react-icons";
import { FONT_FAMILY } from "../../../Config/font";

const UserGenerateWebsites = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: 720 }}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 1,
            mb: 3,
            borderRadius: "50px",
            background: `${theme.palette.primary.main}15`,
            border: `1px solid ${theme.palette.primary.main}30`,
          }}
        >
          <Wand24Regular style={{ color: theme.palette.primary.main }} />
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            AI Web Creation
          </Typography>
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontWeight: 900,
            fontSize: { xs: "2.4rem", md: "3rem" },
            lineHeight: 1.1,
            mb: 3,
            color: theme.palette.text.heading,
          }}
        >
          Stunning Websites <br />
          <Box
            component="span"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: FONT_FAMILY.tertiary,
            }}
          >
            Built by AI
          </Box>
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            lineHeight: 1.7,
            mb: 4,
          }}
        >
          Describe your idea—and watch AI instantly turn it into a professional
          site. No code. No hassle. Just pure creativity.
        </Typography>

        <Button
          variant="contained"
          size="large"
          endIcon={<Sparkle24Regular />}
          sx={{
            px: 3,
            py: 1,
            fontSize: "1.15rem",
            fontWeight: 700,
            borderRadius: 2,
            bgcolor: theme.palette.primary.main,
            boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
            textTransform: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: theme.palette.primary.dark,
              transform: "translateY(-2px)",
              boxShadow: `0 12px 32px ${theme.palette.primary.main}60`,
            },
          }}
        >
          Start Creating
        </Button>
      </Box>
    </Box>
  );
};

export default UserGenerateWebsites;
