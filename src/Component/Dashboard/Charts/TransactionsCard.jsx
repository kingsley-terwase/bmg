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
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";

function TransactionsCard({ data, title }) {
  const chartData = [
    { name: "Successful", value: data?.successful || 8500, color: "#4CAF50" },
    {
      name: "Unsuccessful",
      value: data?.unsuccessful || 1500,
      color: "#F44336"
    }
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
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            flexWrap: { xs: "wrap", md: "nowrap" }
          }}
        >
          {/* Bar Chart */}
          <Box sx={{ flex: 1, height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={60}>
                <XAxis dataKey="name" hide />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>

          {/* Legend */}
          <Stack spacing={2.5}>
            {chartData.map((item, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 0.5
                  }}
                >
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
                <Typography variant="h6" fontWeight={600} sx={{ ml: 2.5 }}>
                  {item.value.toLocaleString()}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TransactionsCard;
