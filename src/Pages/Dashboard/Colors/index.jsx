import React, { useState } from "react";
import { Box, TableRow, TableCell, Checkbox, IconButton } from "@mui/material";
import { CustomTable, StatusChip, PagesHeader } from "../../../Component";
import { colors, headers } from "./data";
import { AddOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ColorsPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  return (
    <div>
      <PagesHeader
        label="Manage Colors"
        desc="View, update and delete colors, update active status, to add colors go to Add Colors."
        enableSearch
        placeholder="Search industries..."
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Colors",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/colors")
          },
          {
            label: "Add Resources",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/add/resources")
          },
          {
            label: "View Mails",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/mails")
          }
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Colors" headers={headers}>
          {colors.map((row) => (
            <TableRow hover key={row.id}>
              <TableCell>
                <Checkbox />
              </TableCell>

              <TableCell>{row.id}</TableCell>
              <TableCell>{row.subject}</TableCell>
              <TableCell>{row.description}</TableCell>

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

export default ColorsPage;
