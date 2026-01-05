import React, { useState } from "react";
import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  CircularProgress
} from "@mui/material";
import { CustomTable, StatusChip, PagesHeader } from "../../../Component";
import { headers } from "./data";
import { VisibilityOutlined } from "@mui/icons-material";
import { useFetchAdmins } from "../../../Hooks/admins";
import { formatDate } from "../../../utils/functions";

const Administrators = () => {
  const [search, setSearch] = useState();

  const { refetch, admins, loading } = useFetchAdmins();

  console.log("Admins in Administrators Page:", admins);

  return (
    <div>
      <PagesHeader
        label="Manage Admininstrators"
        desc="Manage admministrators, update admin roles and permissions, add administrators, terminate or disable and admin, send mails. "
        enableSearch
        searchValue={search}
        onSearchChange={setSearch}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Total Admins" headers={headers}>
          {loading && (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          )}
          {admins.map((row) => (
            <TableRow hover key={row.id}>
              <TableCell>
                <Checkbox />
              </TableCell>

              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{formatDate(row.created_at)}</TableCell>
              <TableCell>
                <StatusChip
                  status={row.status === true ? "active" : "inactive"}
                  label={row.status === true ? "Active" : "Disabled"}
                />
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

export default Administrators;
