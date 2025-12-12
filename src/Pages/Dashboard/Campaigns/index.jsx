import React, { useState } from "react";
import { Box, TableRow, TableCell, Checkbox, IconButton } from "@mui/material";
import { CustomTable, StatusChip, PagesHeader } from "../../../Component";
import { campaigns, headers } from "./data";
import { AddOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CampaignsPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  return (
    <div>
      <PagesHeader
        label="Manage Campaigns"
        desc="Manage campaigns, add, edit and delete campaigns, update active status."
        enableSearch
        placeholder="Search Campaigns..."
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Campaigns",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/campaigns")
          },
          {
            label: "Add Testimonial",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/testimonials")
          },
          {
            label: "View Gifts",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/gifts")
          }
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Total Campaigns" headers={headers}>
          {campaigns.map((row) => (
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

export default CampaignsPage;
