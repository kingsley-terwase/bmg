import React, { useState } from "react";
import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Grid
} from "@mui/material";
import {
  CustomTable,
  StatusChip,
  PagesHeader,
  InfoCard,
  RevenueCard
} from "../../../Component";
import { payments, headers, revenueData } from "./data";
import {
  CheckCircleOutlined,
  HourglassTopOutlined,
  VisibilityOutlined,
  AddOutlined
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const PaymentsPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  return (
    <div>
      <PagesHeader
        label="Payments"
        desc="View all payments on all orders, pending and completed payments, view and update payments status and see total revenue."
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "View Orders",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/orders")
          },
          {
            label: "Add Service",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/services")
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
          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              icon={HourglassTopOutlined}
              title="Total Pending"
              value="20"
              actionLabel="Pending Payments"
              color="#61B5FF"
              onAction={() => console.log("View Users")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              icon={CheckCircleOutlined}
              actionLabel="Total Revenue"
              title="Total Completed"
              value="18"
              color="#61B5FF"
              onAction={() => console.log("View Users")}
            />
          </Grid>
        </Grid>
      </Box>

      <Box my={3}>
        <RevenueCard data={revenueData} period="Yearly" title={"Total Revenue"} />
      </Box>

      <Box mt={3} mb={3}>
        <CustomTable title="Total Payments" headers={headers}>
          {payments.map((row) => (
            <TableRow hover key={row.id}>
              <TableCell>
                <Checkbox />
              </TableCell>

              <TableCell>{row.id}</TableCell>
              <TableCell>{row.subject}</TableCell>
              <TableCell>{row.image}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.dueDate}</TableCell>
              <TableCell>{row.amount}</TableCell>

              <TableCell>
                <StatusChip status={row.status} label={row.status} />
              </TableCell>

              <TableCell>
                <IconButton size="small">
                  <VisibilityOutlined fontSize="medium" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </CustomTable>
      </Box>
    </div>
  );
};

export default PaymentsPage;
