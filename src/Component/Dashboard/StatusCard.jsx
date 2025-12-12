import React from "react";
import { Typography, Box } from "@mui/material";
import { CircularProgress } from "@mui/material";

function StatusCard({ percentage = 55, label = "Gifts", amount = "0" }) {
  // Calculate the progress value for the circular progress (0-100)
  const progress = percentage;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3
      }}
    >
      <Typography
        variant="body1"
        fontWeight={600}
        fontFamily={"jost"}
        color="text.primary"
        mb={0.5}
      >
        {label}
      </Typography>

      {/* Circular Progress */}
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        {/* Background Circle (Gray) */}
        <CircularProgress
          variant="determinate"
          value={100}
          size={170}
          thickness={4}
          sx={{
            color: "#E5E7EB",
            position: "absolute"
          }}
        />
        {/* Progress Circle (Green) */}
        <CircularProgress
          variant="determinate"
          value={progress}
          size={170}
          thickness={4}
          sx={{
            color: "#34D399",
            "& .MuiCircularProgress-circle": {
              strokeLinecap: "round"
            }
          }}
        />
        {/* Percentage Text */}
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Typography
            variant="h3"
            component="div"
            fontWeight={700}
            color="#e65100"
          >
            {amount}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default StatusCard;
