/* eslint-disable react-hooks/static-components */
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Tabs,
  Tab,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Dot,
} from "recharts";

function AnalyticsOverview({ data }) {
  const [activeTab, setActiveTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [periodAnchorEl, setPeriodAnchorEl] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("Week");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePeriodClick = (event) => {
    setPeriodAnchorEl(event.currentTarget);
  };

  const handlePeriodClose = () => {
    setPeriodAnchorEl(null);
  };

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    handlePeriodClose();
  };

  const chartData = data || [
    { month: "Jan", value: 45000 },
    { month: "Feb", value: 25000 },
    { month: "Mar", value: 52000 },
    { month: "Apr", value: 78000 },
    { month: "May", value: 65000 },
    { month: "Jun", value: 85000 },
  ];

  // Custom dot component to show dots on the line
  const CustomDot = (props) => {
    const { cx, cy } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill="#fff"
        stroke="#93C5FD"
        strokeWidth={2}
      />
    );
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        height: "100%",
      }}
    >
      <CardContent>
        {/* Header with Tabs */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              minHeight: "40px",
              "& .MuiTab-root": {
                minHeight: "40px",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: 500,
                color: "#999",
                "&.Mui-selected": {
                  color: "#000",
                  fontWeight: 600,
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#1976d2",
              },
            }}
          >
            <Tab label="Users" />
            <Tab label="Orders" />
            <Tab label="Consultations" />
            <Tab label="Services" />
            <Tab label="AI" />
          </Tabs>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              label={selectedPeriod}
              size="small"
              onClick={handlePeriodClick}
              onDelete={handlePeriodClick}
              deleteIcon={<KeyboardArrowDownIcon />}
              sx={{
                backgroundColor: "#f5f5f5",
                fontWeight: 500,
                fontSize: "13px",
                "& .MuiChip-deleteIcon": {
                  fontSize: "18px",
                },
              }}
            />
            <Menu
              anchorEl={periodAnchorEl}
              open={Boolean(periodAnchorEl)}
              onClose={handlePeriodClose}
            >
              <MenuItem onClick={() => handlePeriodSelect("Day")}>Day</MenuItem>
              <MenuItem onClick={() => handlePeriodSelect("Week")}>Week</MenuItem>
              <MenuItem onClick={() => handlePeriodSelect("Month")}>Month</MenuItem>
              <MenuItem onClick={() => handlePeriodSelect("Year")}>Year</MenuItem>
            </Menu>

            <IconButton size="small" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Export</MenuItem>
              <MenuItem onClick={handleMenuClose}>Download</MenuItem>
              <MenuItem onClick={handleMenuClose}>Share</MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Chart */}
        <Box sx={{ height: 280, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="#f0f0f0" 
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#999" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#999" }}
                tickFormatter={(value) => `${value / 1000}K`}
                domain={[0, 110000]}
                ticks={[0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#93C5FD"
                strokeWidth={2}
                dot={<CustomDot />}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

export default AnalyticsOverview;

