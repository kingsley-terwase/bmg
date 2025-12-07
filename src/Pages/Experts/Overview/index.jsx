import React from "react";
import {
  ShoppingBagOutlined,
  MoreVertOutlined,
  HourglassBottomOutlined,
  CancelOutlined,
  CheckCircleOutline
} from "@mui/icons-material";
import { Box, TableRow, TableCell, Checkbox, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  RevenueCard,
  InsightPieCard,
  InfoCard,
  CustomTable,
  StatusChip,
  HeaderBreadCrumb
} from "../../../Component";
import { headers, data } from "../../../Config/data";

const ExpertOverview = () => {
  const revenueData = [
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
    { month: "Dec", value: 24, amount: "$24K" }
  ];

  return (
    <Box>
      <HeaderBreadCrumb
        desc={
          "View your recent orders, manage your billing addresses, and edit your password and account details"
        }
      />

      <Box>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          alignItems={"flex-start"}
          mb={4}
        >
          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              icon={ShoppingBagOutlined}
              title="Total Orders"
              value="68"
              color="#61B5FF"
              onAction={() => console.log("View Users")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              icon={HourglassBottomOutlined}
              title="Pending Orders"
              value="30"
              color="#61B5FF"
              onAction={() => console.log("View Users")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              icon={CancelOutlined}
              title="Cancelled Orders"
              value="6"
              color="#61B5FF"
              onAction={() => console.log("View Users")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              icon={CheckCircleOutline}
              title="Completed Orders"
              value="32"
              color="#61B5FF"
              onAction={() => console.log("View Users")}
            />
          </Grid>
        </Grid>
      </Box>

      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <InsightPieCard
            title="Orders Insight"
            chartData={[
              { name: "Completed", value: 65000, color: "#4CAF50" },
              { name: "Pending", value: 5500, color: "#FF9800" },
              { name: "Cancelled", value: 3500, color: "#F44336" }
            ]}
          />{" "}
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <RevenueCard data={revenueData} period="Monthly" title={"Earnings"} />
        </Grid>
      </Grid>

      <Box mt={3} mb={3}>
        <CustomTable title="Assigned Orders" headers={headers}>
          {data.map((row) => (
            <TableRow hover key={row.id}>
              <TableCell>
                <Checkbox />
              </TableCell>

              <TableCell>{row.id}</TableCell>
              <TableCell>{row.subject}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.dueDate}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.expert}</TableCell>

              <TableCell>
                <StatusChip status={row.status} label={row.status} />
              </TableCell>

              <TableCell>
                <IconButton size="small">
                  <MoreVertOutlined fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </CustomTable>
      </Box>
    </Box>
  );
};

export default ExpertOverview;
