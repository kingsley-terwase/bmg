import React from "react";
import {
  CampaignOutlined,
  CategoryOutlined,
  ContactPageOutlined,
  HelpCenterOutlined,
  MailOutlineSharp,
  PeopleOutline,
  RssFeedOutlined,
  ShoppingBagOutlined,
  ShoppingCartOutlined,
  TipsAndUpdatesOutlined,
  MoreVertOutlined,
  AddOutlined,
  VisibilityOutlined
} from "@mui/icons-material";
import { Box, TableRow, TableCell, Checkbox, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  RevenueCard,
  InsightPieCard,
  TransactionsCard,
  InfoCard,
  TopRankingExpertsCard,
  TopSellingServicesCard,
  TrafficByLocationCard,
  AnalyticsOverview,
  CustomTable,
  StatusChip,
  PagesHeader
} from "../../../Component";
import { headers, data } from "../../../Config/data";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const transactionsData = {
    successful: 15000,
    unsuccessful: 5000
  };

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

  const analyticsData = [
    { month: "Jan", value: 45000 },
    { month: "Feb", value: 25000 },
    { month: "Mar", value: 52000 },
    { month: "Apr", value: 78000 },
    { month: "May", value: 65000 },
    { month: "Jun", value: 85000 }
  ];

  const navigate = useNavigate();

  return (
    <Box>
      <PagesHeader
        title="Overview"
        desc={
          "Welcome to the admin dashboard, your central hub for managing administrators,users and experts, tracking system performance, reviewing transactions, and maintaining overall platform integrity."
        }
        searchEnabled={false}
        actions={[
          {
            label: "Add Expert",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/expert")
          },
          {
            label: "Add Admin",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/expert")
          },
          {
            label: "View Orders",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/add/expert")
          }
        ]}
      />

      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <InfoCard
            icon={PeopleOutline}
            title="Users"
            value="7000"
            onAction={() => console.log("View Users")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <InfoCard
            icon={ShoppingCartOutlined}
            title="Orders"
            value="5000"
            onAction={() => console.log("View Users")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <InfoCard
            icon={CategoryOutlined}
            title="Categories"
            value="500"
            onAction={() => console.log("View Users")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <InfoCard
            icon={ShoppingBagOutlined}
            title="Services"
            value="7000"
            onAction={() => console.log("View Users")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <InfoCard
            icon={RssFeedOutlined}
            title="Blogs"
            value="3000"
            onAction={() => console.log("View Users")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <InfoCard
            icon={MailOutlineSharp}
            title="Mails"
            value="1000"
            onAction={() => console.log("View Users")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <InfoCard
            icon={ContactPageOutlined}
            title="Testimonials"
            value="7000"
            onAction={() => console.log("View Users")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <InfoCard
            icon={HelpCenterOutlined}
            title="Consultations"
            value="7000"
            onAction={() => console.log("View Users")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <InfoCard
            icon={CampaignOutlined}
            title="Campaign"
            value="7000"
            onAction={() => console.log("View Users")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <InfoCard
            icon={TipsAndUpdatesOutlined}
            title="AI"
            value="7000"
            onAction={() => console.log("View Users")}
          />
        </Grid>
      </Grid>

      <Box>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          mt={3}
        >
          <Grid size={{ xs: 12, md: 4 }}>
            <InsightPieCard
              title="Orders Insight"
              chartData={[
                { name: "Completed", value: 65000, color: "#4CAF50" },
                { name: "Pending", value: 25500, color: "#FF9800" },
                { name: "Cancelled", value: 10000, color: "#F44336" }
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TransactionsCard data={transactionsData} title={"Transactions"} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <RevenueCard
              data={revenueData}
              period="Monthly"
              title={"Revenue"}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 3, mt: 4 }}>
        <AnalyticsOverview data={analyticsData} />
      </Box>

      <Box>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          mt={3}
        >
          <Grid size={{ xs: 12, md: 4 }}>
            <TopSellingServicesCard />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TrafficByLocationCard />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TopRankingExpertsCard />
          </Grid>
        </Grid>
      </Box>

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

export default DashboardHome;
