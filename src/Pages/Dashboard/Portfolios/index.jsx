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
import { payments, headers } from "./data";
import {
  CheckCircleOutlined,
  HourglassTopOutlined,
  VisibilityOutlined,
  AddOutlined
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const PortfoliosPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  return (
    <div>
      <PagesHeader
        label="Manage Portfolios"
        desc="Manage portfolios of services, blogs and categories. Add, update and delete portfolios, also manage their status."
        searchValue={search}
        placeholder="Search portfolios..."
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Portfolio",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/portfolios")
          },
          {
            label: "Add Service",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/services")
          }
        ]}
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

export default PortfoliosPage;
