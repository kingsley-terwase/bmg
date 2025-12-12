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
  InfoCard
} from "../../../Component";
import { orders, headers } from "./data";
import {
  CancelOutlined,
  CheckCircleOutlined,
  HourglassTopOutlined,
  ShoppingCartOutlined,
  VisibilityOutlined,
  AddOutlined
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  return (
    <div>
      <PagesHeader
        label="Manage Orders"
        desc="View all orders, see their status, update status, assign orders to expert."
        enableSearch
        placeholder={"Search orders..."}
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
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
              icon={ShoppingCartOutlined}
              title="Orders"
              value="20"
              actionLabel="Total Orders"
              color="#61B5FF"
              onAction={() => console.log("View Users")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              icon={CheckCircleOutlined}
              actionLabel="Completed Orders"
              title="Orders"
              value="18"
              color="#61B5FF"
              onAction={() => console.log("View Users")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              icon={HourglassTopOutlined}
              actionLabel="Pending Orders"
              title="Orders"
              value="18"
              color="#61B5FF"
              onAction={() => console.log("View Users")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              icon={CancelOutlined}
              actionLabel="Cancelled Orders"
              title="Orders"
              value="18"
              color="#61B5FF"
              onAction={() => console.log("View Users")}
            />
          </Grid>
        </Grid>
      </Box>

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

export default OrdersPage;
