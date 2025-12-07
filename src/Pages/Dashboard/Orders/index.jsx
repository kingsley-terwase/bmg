import React, { useState } from "react";
import { Box, TableRow, TableCell, Checkbox, IconButton } from "@mui/material";
import { CustomTable, StatusChip, PagesHeader } from "../../../Component";
import { orders, headers } from "./data";
import { VisibilityOutlined } from "@mui/icons-material";

const OrdersPage = () => {
  const [search, setSearch] = useState();

  return (
    <div>
      <PagesHeader
        label="Manage Orders"
        desc="View all orders, see their status, update status, assign orders to expert."
        enableSearch
        searchValue={search}
        onSearchChange={setSearch}
      />

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
