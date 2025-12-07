import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function InsightPieCard({
  title = "Insight",
  chartData = [],
  showMenu = true,

  // Optional chart configuration
  width = 200,
  height = 200,
  innerRadius = 0,
  outerRadius = 90,
  paddingAngle = 2,

  // Optional click handlers
  onMenuClick = () => {},
}) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        height: "100%",
      }}
    >
      <CardContent>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>

          {showMenu && (
            <IconButton size="small" onClick={onMenuClick}>
              <MoreVertIcon />
            </IconButton>
          )}
        </Box>

        {/* CHART + LEGEND */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          {/* PIE CHART */}
          <Box sx={{ width, height }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={innerRadius}
                  outerRadius={outerRadius}
                  paddingAngle={paddingAngle}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color || "#8884d8"} // fallback color
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>

          {/* LEGEND */}
          <Stack spacing={2} flex={1}>
            {chartData.map((item, index) => (
              <Box key={index}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: item.color || "#8884d8",
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {item.name}
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight={600} sx={{ ml: 2.5 }}>
                  {Number(item.value).toLocaleString()}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default InsightPieCard;
