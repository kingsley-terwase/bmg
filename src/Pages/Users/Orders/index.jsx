import React from "react";
import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Stack,
  Grid
} from "@mui/material";
import {
  CustomTable,
  StatusChip,
  PagesHeader,
  InfoCard
} from "../../../Component";
import { Visibility } from "@mui/icons-material";
import { orders, headers } from "./data";
import {
  ShoppingBagOutlined,
  HourglassBottomOutlined,
  CancelOutlined,
  CheckCircleOutline
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const UserOrders = () => {
  const navigate = useNavigate();
  return (
    <div>
      <PagesHeader
        label="Orders Overview"
        desc={
          "Manage all your orders, track orders progress, update orders status, payment status.  "
        }
      />
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
            title="Total"
            value="37"
            color="#61B5FF"
            actionLabel="Total Orders"
            onAction={() => console.log("View Users")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <InfoCard
            icon={CheckCircleOutline}
            title="Completed"
            value="8"
            actionLabel="Completed Orders"
            color="#61B5FF"
            onAction={() => console.log("View Users")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <InfoCard
            icon={HourglassBottomOutlined}
            title="Pending"
            value="20"
            actionLabel="Pending Orders"
            color="#61B5FF"
            onAction={() => console.log("View Users")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <InfoCard
            icon={CancelOutlined}
            title="Cancelled"
            value="18"
            actionLabel="Cancelled Orders"
            color="#61B5FF"
            onAction={() => console.log("View Users")}
          />
        </Grid>
      </Grid>
      <Box mt={3} mb={3}>
        <CustomTable title="Total Orders" headers={headers}>
          {orders.map((row) => (
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
                <Stack direction={"row"} gap={1}>
                  <IconButton size="small">
                    <Visibility
                      fontSize="small"
                      onClick={() => navigate("/dashboard/user/orders/single")}
                    />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </CustomTable>
      </Box>
    </div>
  );
};

export default UserOrders;
