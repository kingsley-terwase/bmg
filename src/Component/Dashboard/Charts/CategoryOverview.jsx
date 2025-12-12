import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { defaultColors } from "../../../Config/color";

function CategoryOverviewCard({ title = "Category Overview", data }) {
  // Process data and assign colors
  const chartData =
    data?.map((item, index) => ({
      name: item.name || `Item ${index + 1}`,
      value: item.value || 0,
      color: item.color || defaultColors[index % defaultColors.length]
    })) || [];

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        height: "100%"
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Title */}
        <Typography variant="h6" fontWeight={600} mb={3}>
          {title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            flexWrap: { xs: "wrap", lg: "nowrap" }
          }}
        >
          {/* Pie Chart */}
          <Box sx={{ width: 240, height: 240, flexShrink: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={110}
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

          {/* Legend Grid - 2 columns */}
          <Box sx={{ flex: 1 }}>
            <Grid container spacing={2}>
              {chartData.map((item, index) => (
                <Grid item xs={6} key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5
                    }}
                  >
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        backgroundColor: item.color,
                        flexShrink: 0
                      }}
                    />
                    <Typography
                      variant="body2"
                      color="text.primary"
                      fontSize={14}
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CategoryOverviewCard;
