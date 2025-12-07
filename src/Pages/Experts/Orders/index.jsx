import React from "react";
import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Stack
} from "@mui/material";
import { CustomTable, StatusChip, PagesHeader } from "../../../Component";
import { Visibility } from "@mui/icons-material";
import { orders, headers } from "./data";

const ExpertOrders = () => {
  return (
    <div>
      <PagesHeader
        label="Orders Overview"
        desc={
          "Manage all your orders, update orders status, decline or accept orders.  "
        }
      />
      <Box mt={3} mb={3}>
        <CustomTable title="Assigned Orders" headers={headers}>
          {orders.map((row) => (
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
                <Stack direction={"row"} gap={1}>
                  <IconButton size="small">
                    <Visibility fontSize="small" />
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

export default ExpertOrders;
