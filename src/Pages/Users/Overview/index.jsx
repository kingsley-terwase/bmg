import React from "react";
import {
  ShoppingBagOutlined,
  MoreVertOutlined,
  HelpCenterOutlined,
  TipsAndUpdatesOutlined,
  CreditCardOutlined,
  VisibilityOutlined,
  AddOutlined
} from "@mui/icons-material";
import { Box, TableRow, TableCell, Checkbox, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  RevenueCard,
  InsightPieCard,
  TransactionsCard,
  InfoCard,
  CustomTable,
  StatusChip,
  PagesHeader,
  ProfileStatusCard
} from "../../../Component";
import { headers, data } from "../../../Config/data";
import { useNavigate } from "react-router-dom";

const UserOverview = () => {
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

  const handleProfileUpdate = () => {
    console.log("Update profile clicked");
  };

  const navigate = useNavigate();

  return (
    <div>
      <Box>
        <PagesHeader
          title="Overview"
          desc={
            "Welcome to your dashboard, your central hub for managing orders, consultations, AI services, notifications and mails, and profile."
          }
          searchEnabled={false}
          actions={[
            {
              label: "View Orders",
              icon: <VisibilityOutlined />,
              onClick: () => navigate("/dashboard/user/orders")
            },
            {
              label: "Book Consultation",
              icon: <AddOutlined />,
              onClick: () => navigate("/dashboard/user/consultations")
            },
            {
              label: "AI Services",
              icon: <TipsAndUpdatesOutlined />,
              onClick: () =>
                navigate("/dashboard/users/artificial-intelligence")
            }
          ]}
        />

        <Box>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            alignItems={"flex-start"}
            mb={4}
          >
            <Grid size={{ xs: 12, md: 8 }}>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid size={{ xs: 12, md: 4 }}>
                  <InfoCard
                    icon={ShoppingBagOutlined}
                    title="Total Orders"
                    value="37"
                    arrow
                    color="#61B5FF"
                    onAction={() => navigate("/dashboard/user/orders")}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <InfoCard
                    icon={HelpCenterOutlined}
                    title="Consulations"
                    value="8"
                    arrow
                    color="#61B5FF"
                    onAction={() => navigate("/dashboard/user/consultations")}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <InfoCard
                    icon={TipsAndUpdatesOutlined}
                    title="AI Services"
                    value="20"
                    color="#61B5FF"
                    arrow
                    onAction={() =>
                      navigate("/dashboard/user/artificial-intelligence")
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <InfoCard
                    icon={CreditCardOutlined}
                    title="Payments"
                    value="18"
                    arrow
                    color="#61B5FF"
                    onAction={() => navigate("/dashboard/user/payments")}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ProfileStatusCard
                percentage={55}
                onUpdate={handleProfileUpdate}
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
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TransactionsCard data={transactionsData} title={"Payments"} />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <RevenueCard
              data={revenueData}
              period="Monthly"
              title={"Transactions"}
            />
          </Grid>
        </Grid>

        <Box mt={3} mb={3}>
          <CustomTable title="Recent Orders" headers={headers}>
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
    </div>
  );
};

export default UserOverview;
