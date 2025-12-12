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
  StatusCard
} from "../../../Component";
import { gifts, headers } from "./data";
import { AddOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const GiftsPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  return (
    <div>
      <PagesHeader
        label="Manage Gifts"
        desc="Control and manage gifts, add, edit and delete gifts."
        enableSearch
        placeholder="Search gifts..."
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Gift",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/gifts")
          },
          {
            label: "Add Coupons",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/coupons")
          },
          {
            label: "View Orders",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/orders")
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
            <StatusCard percentage={83} amount={200} label={"Total Gifts"} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <StatusCard percentage={55} amount={89} label={"Gifts Sold"} />
          </Grid>
        </Grid>
      </Box>

      <Box mt={3} mb={3}>
        <CustomTable title="Total Gifts" headers={headers}>
          {gifts.map((row) => (
            <TableRow hover key={row.id}>
              <TableCell>
                <Checkbox />
              </TableCell>

              <TableCell>{row.id}</TableCell>
              <TableCell>{row.subject}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.dueDate}</TableCell>
              <TableCell>{row.amount}</TableCell>

              <TableCell>
                <StatusChip status={row.status} label={row.status} />
              </TableCell>

              <TableCell>
                <IconButton size="small">
                  <VisibilityOutlined fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </CustomTable>
      </Box>
    </div>
  );
};

export default GiftsPage;
