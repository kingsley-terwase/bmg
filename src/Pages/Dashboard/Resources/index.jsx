import React, { useState } from "react";
import { Box, TableRow, TableCell, Checkbox, IconButton } from "@mui/material";
import { CustomTable, StatusChip, PagesHeader } from "../../../Component";
import { resources, headers } from "./data";
import { AddOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ResourcesPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  return (
    <div>
      <PagesHeader
        label="Manage Resources"
        desc="View, update and delete resources, update active status."
        enableSearch
        placeholder="Search resources..."
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Industry",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/industries")
          },
          {
            label: "Add Blog",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/blogs")
          },
          {
            label: "View Categories",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/categories")
          }
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Total Resources" headers={headers}>
          {resources.map((row) => (
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

export default ResourcesPage;
