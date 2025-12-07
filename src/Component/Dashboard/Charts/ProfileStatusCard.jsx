import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgress } from "@mui/material";
import CustomButton from "../CustomButton";
import { WidthFull } from "@mui/icons-material";

function ProfileStatusCard({ percentage = 55, onUpdate }) {
  // Calculate the progress value for the circular progress (0-100)
  const progress = percentage;

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        height: "100%",
        position: "relative"
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Three Dots Menu */}
        <Box sx={{ position: "absolute", top: 16, right: 16 }}>
          <IconButton size="small">
            <MoreVertIcon sx={{ fontSize: 20, color: "#999" }} />
          </IconButton>
        </Box>

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
            Profile Status
          </Typography>

          {/* Circular Progress */}
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            {/* Background Circle (Gray) */}
            <CircularProgress
              variant="determinate"
              value={100}
              size={200}
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
              size={200}
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
                variant="h4"
                component="div"
                fontWeight={700}
                color="#FF6B35"
              >
                {progress}%
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                fontFamily={"Comfortaa"}
                fontSize={15}
              >
                Complete
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flex: 1 }}>
            <CustomButton title="Update" variant="filled" color="primary" onClick={onUpdate} sx={{width: "200px"}} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProfileStatusCard;
