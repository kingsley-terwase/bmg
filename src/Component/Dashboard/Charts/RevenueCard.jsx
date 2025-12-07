import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

function RevenueChart({ data, period = "Monthly", title }) {
  const chartData = data || [
    { month: "Jan", value: 10, amount: "$10K" },
    { month: "Feb", value: 12, amount: "$12K" },
    { month: "Mar", value: 11, amount: "$11K" },
    { month: "Apr", value: 15, amount: "$15K" },
    { month: "May", value: 13, amount: "$13K" },
    { month: "Jun", value: 18, amount: "$18K" },
    { month: "Jul", value: 16, amount: "$16K" },
    { month: "Aug", value: 20, amount: "$20K" },
    { month: "Sep", value: 19, amount: "$19K" },
    { month: "Oct", value: 22, amount: "$22K" },
    { month: "Nov", value: 21, amount: "$21K" },
    { month: "Dec", value: 24, amount: "$24K" },
  ];

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {title}
            </Typography>
            <Chip
              icon={<TrendingUpIcon sx={{ fontSize: 16 }} />}
              label="+12.5%"
              size="small"
              sx={{
                mt: 1,
                backgroundColor: "#E8F5E9",
                color: "#4CAF50",
                fontWeight: 600,
                "& .MuiChip-icon": {
                  color: "#4CAF50",
                },
              }}
            />
          </Box>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Box sx={{ height: 250, mt: 3 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barSize={25}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#999" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#999" }}
                tickFormatter={(value) => `$${value}K`}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill="#4CAF50"
                    opacity={0.7 + (index / chartData.length) * 0.3}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", textAlign: "center", mt: 2 }}
        >
          {period} Revenue Trend
        </Typography>
      </CardContent>
    </Card>
  );
}

export default RevenueChart;