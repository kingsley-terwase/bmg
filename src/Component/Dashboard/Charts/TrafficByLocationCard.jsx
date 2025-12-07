import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Stack
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function TrafficByLocationCard({ data }) {
  const chartData = data || [
    { name: "Ghana", value: 33.3, color: "#34D399" },
    { name: "United States", value: 22.8, color: "#93C5FD" },
    { name: "Nigeria", value: 19.7, color: "#A5B4FC" },
    { name: "Other", value: 24.2, color: "#1F2937" }
  ];

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        height: "100%"
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2
          }}
        >
          <Typography variant="h6" fontWeight={600} color="text.primary">
            Traffic by Location
          </Typography>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
            flexWrap: { xs: "wrap", md: "nowrap" }
          }}
        >
          {/* Pie Chart */}
          <Box sx={{ width: 200, height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={90}
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>

          {/* Legend */}
          <Stack spacing={1.5} flex={1}>
            {chartData.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: item.color
                    }}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={13}
                  >
                    {item.name}
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight={600} fontSize={13}>
                  {item.value}%
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TrafficByLocationCard;
