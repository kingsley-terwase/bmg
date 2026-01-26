import React, { useState } from "react";
import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Grid,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  CustomTable,
  StatusChip,
  PagesHeader,
  InfoCard,
} from "../../../Component";
import { headers } from "./data";
import { VisibilityOutlined, AddOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { EMOJI_ICONS } from "../../../Config/emojiIcons";
import { useFetchBlogs } from "../../../Hooks/Dashboard/blogs";
import { formatDate, truncateText, stripHtml } from "../../../utils/functions";

const BlogsPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const { blogs, loading: blogsLoading } = useFetchBlogs();

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
            onClick: () => navigate("/dashboard/admin/add/blogs"),
          },
          {
            label: "View Categories",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/categories"),
          },
          {
            label: "Add Portfolio",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/add/portfolios"),
          },
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
              icon={EMOJI_ICONS.rss}
              title="Posts"
              value={blogs.length}
              actionLabel="Total Posts"
              color="#61B5FF"
              onAction={() => console.log("View Users")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              icon={EMOJI_ICONS.people}
              actionLabel="Total Views"
              title="Views"
              value="0"
              color="#61B5FF"
              onAction={() => console.log("View Users")}
            />
          </Grid>
        </Grid>
      </Box>

      <Box mt={3} mb={3}>
        <CustomTable title="Total Blogs" headers={headers}>
          {blogsLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : blogs.length > 0 ? (
            blogs.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  {row.author_first_name}
                  {""}
                  {row.author_last_name}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{formatDate(row.created_at)}</TableCell>
                <TableCell
                  sx={{
                    maxWidth: 400,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography variant="body2" title={row.answer}>
                    {truncateText(stripHtml(row.content), 80)}
                  </Typography>
                </TableCell>
                <TableCell>{formatDate(row.updated_at)}</TableCell>
                <TableCell>
                  <StatusChip
                    status={row.status === true ? "active" : "inactive"}
                    label={row.status === true ? "Active" : "Disabled"}
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small">
                    <VisibilityOutlined fontSize="medium" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>
                <Stack alignItems="center" spacing={2}>
                  <Typography
                    variant="body1"
                    sx={{ color: "#2C3891", fontWeight: 600 }}
                  >
                    No Blog(s) Found.
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </CustomTable>
      </Box>
    </div>
  );
};

export default BlogsPage;
