import React from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from "recharts";

function TopRankingExpertsCard({ data }) {
  const chartData = data || [
    { name: "James", value: 250, color: "#93C5FD" },
    { name: "David", value: 280, color: "#6EE7B7" },
    { name: "Paul", value: 200, color: "#1F2937" },
    { name: "Sarah", value: 270, color: "#93C5FD" },
    { name: "Emma", value: 150, color: "#C4B5FD" },
    { name: "John", value: 240, color: "#34D399" }
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
            mb: 3
          }}
        >
          <Typography variant="h6" fontWeight={600} color="text.primary">
            Top Ranking Experts
          </Typography>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Box sx={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barSize={35}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#999" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#999" }}
                domain={[0, 300]}
                ticks={[0, 100, 200, 300]}
                label={{
                  value: "30K",
                  angle: 0,
                  position: "top",
                  offset: 10,
                  style: { fontSize: 11, fill: "#999" }
                }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TopRankingExpertsCard;
