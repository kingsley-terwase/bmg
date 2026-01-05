import React, { useState } from "react";
import { Box, TableRow, TableCell, Checkbox, IconButton } from "@mui/material";
import { CustomTable, StatusChip, PagesHeader } from "../../../Component";
import { categories, headers } from "./data";
import { AddOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CategoryRequirementPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  return (
    <div>
      <PagesHeader
        label="Categories  Requirements"
        desc="Control and manage categories of services, add, edit and delete categories."
        enableSearch
        placeholder="Search Requirements..."
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Requirement",
            icon: <AddOutlined />,
            onClick: () =>
              navigate("/dashboard/admin/add/categories-requirement")
          },
          {
            label: "View Categories",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/categories")
          },
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Total Categories" headers={headers}>
          {categories.map((row) => (
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

export default CategoryRequirementPage;
