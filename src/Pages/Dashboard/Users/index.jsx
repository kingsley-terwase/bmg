import React, { useState } from "react";
import { Box, TableRow, TableCell, Checkbox, IconButton } from "@mui/material";
import { CustomTable, StatusChip, PagesHeader } from "../../../Component";
import { users, headers } from "./data";
import {
  VisibilityOutlined
} from "@mui/icons-material";

const UsersPage = () => {
  const [search, setSearch] = useState();

  return (
    <div>
      <PagesHeader
        label="Manage Users"
        desc="Manage user base, view profiles and active status, disable or terminate users, send mails. "
        enableSearch
        searchValue={search}
        onSearchChange={setSearch}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Total Users" headers={headers}>
          {users.map((row) => (
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

export default UsersPage;
