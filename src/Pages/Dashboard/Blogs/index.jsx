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
import { blogs, headers } from "./data";
import {
  CancelOutlined,
  CheckCircleOutlined,
  HourglassTopOutlined,
  ShoppingCartOutlined,
  VisibilityOutlined,
  AddOutlined,
  RssFeedOutlined,
  PeopleOutlined
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const BlogsPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  return (
    <div>
      <PagesHeader
        label="Manage Blogs"
        desc="View all blogs, view and update their status, delete blogs."
        enableSearch
        placeholder={"Search blogs..."}
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Blogs",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/blogs")
          },
          {
            label: "View Categories",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/categories")
          },
          {
            label: "Add Portfolio",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/add/portfolios")
          }
        ]}
      />

      <Box>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          alignItems={"flex-start"}
          mb={4}
        >
          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              icon={RssFeedOutlined}
              title="Posts"
              value="20"
              actionLabel="Total Posts"
              color="#61B5FF"
              onAction={() => console.log("View Users")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              icon={PeopleOutlined}
              actionLabel="Total Views"
              title="Views"
              value="18"
              color="#61B5FF"
              onAction={() => console.log("View Users")}
            />
          </Grid>
        </Grid>
      </Box>

      <Box mt={3} mb={3}>
        <CustomTable title="Total Blogs" headers={headers}>
          {blogs.map((row) => (
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

export default BlogsPage;
