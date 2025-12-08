import React, { useState } from "react";
import { Box, TableRow, TableCell, Checkbox, IconButton } from "@mui/material";
import { CustomTable, StatusChip, PagesHeader } from "../../../Component";
import { admins, headers } from "./data";
import { AddOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AdminRoles = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  return (
    <div>
      <PagesHeader
        label="Manage Roles"
        desc="Manage admministrators roles, add, edit and disable admin roles. "
        enableSearch
        placeholder="Seach admin role.."
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Role",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/add/admin-roles")
          }
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Admin Roles" headers={headers}>
          {admins.map((row) => (
            <TableRow hover key={row.id}>
              <TableCell>
                <Checkbox />
              </TableCell>

              <TableCell>{row.id}</TableCell>
              <TableCell>{row.firstname}</TableCell>
              <TableCell>{row.lastname}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>

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

export default AdminRoles;
