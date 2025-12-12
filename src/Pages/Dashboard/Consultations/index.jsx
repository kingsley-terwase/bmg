import React, { useState } from "react";
import { Box, TableRow, TableCell, Checkbox, IconButton } from "@mui/material";
import {
  CustomTable,
  StatusChip,
  PagesHeader,
} from "../../../Component";
import { SendOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { consultations, headers } from "./data";

const ConsultationsPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  return (
    <div>
      <PagesHeader
        label="Manage Counsultations"
        desc="View and manage consultations, see booked appointments, reply via mails and update consultations status."
        enableSearch
        placeholder="Search Consultations..."
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Send Mail",
            icon: <SendOutlined />,
            onClick: () => navigate("/dashboard/admin/mails")
          },
          {
            label: "View Orders",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/orders")
          },
          {
            label: "View Campaigns",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/orders")
          }
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Consultations" headers={headers}>
          {consultations.map((row) => (
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

export default ConsultationsPage;
