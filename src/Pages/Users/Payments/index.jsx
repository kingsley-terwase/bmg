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
import { payments, headers } from "./data";
import { useNavigate } from "react-router-dom";

const UserPaymentsPage = () => {
    const navigate = useNavigate()
  return (
    <div>
      <PagesHeader
        label="Payments"
        desc={
          "See all your payments, view their status and make pending payments on orders."
        }
      />
      <Box mt={3} mb={3}>
        <CustomTable title="Total Payments" headers={headers}>
          {payments.map((row) => (
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
                  <IconButton size="small" onClick={navigate("/dashboard/user/payments/single")}>
                    <Visibility fontSize="small" />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </CustomTable>
      </Box>
    </div>
  )
}

export default UserPaymentsPage