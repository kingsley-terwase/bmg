import React from "react";
import { Box, Typography, Divider, Stack } from "@mui/material";
import { styles } from "../../styles/dashboard";
import { dbColors } from "../../Config/color";
import { ArrowForwardRounded } from "@mui/icons-material";

const InfoCard = ({
  icon: Icon,
  title,
  value,
  actionLabel = "View More",
  onAction,
  color = dbColors.main.default,
  arrow = false
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        background: "#fff",
        borderRadius: "18px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        overflow: "hidden"
      }}
    >
      {/* Left colored bar */}
      <Box
        sx={{
          width: "8px",
          background: dbColors.main.default,
          borderTopLeftRadius: "36px",
          borderBottomLeftRadius: "36px"
        }}
      />

      <Box sx={{ flex: 1, px: 3, py: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          {Icon && (
            <Box sx={styles.iconCon}>
              <Icon
                style={styles.icon}
                sx={{
                  fontSize: { xs: 30, md: 35 },
                  color: dbColors.main.default
                }}
              />
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <Typography
              sx={{ fontWeight: 500, fontSize: 13, fontFamily: "comfortaa" }}
            >
              {title}
            </Typography>
            <Typography sx={{ fontWeight: 700, color, fontFamily: "jost" }}>
              {value}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />
        <Stack direction={"row"} gap={0} alignItems={"center"}>
          <Typography
            onClick={onAction}
            sx={{
              fontWeight: 600,
              fontSize: 12,
              fontFamily: "comfortaa",
              cursor: "pointer",
              "&:hover": { opacity: 0.7 }
            }}
          >
            {actionLabel}
          </Typography>
          { arrow && 
          <ArrowForwardRounded
            sx={{
              fontSize: { xs: 10, md: 20 },
              color: color
            }}
          />
          }
        </Stack>
      </Box>
    </Box>
  );
};

export default InfoCard;
