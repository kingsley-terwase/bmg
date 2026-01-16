import React, { useState } from "react";
import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { CustomTable, StatusChip, PagesHeader } from "../../../Component";
import { headers } from "./data";
import { VisibilityOutlined, AddOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFetchBlogCategory } from "../../../Hooks/Dashboard/blog_categories";
import { formatDate } from "../../../utils/functions";
import { BASE_IMAGE_URL } from "../../../Config/paths";

const BlogCategoryPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const { blogCategories, loading: blogCatLoading } = useFetchBlogCategory();

  return (
    <div>
      <PagesHeader
        label="Blog Category"
        desc="View all blogs categories, view and update their status, delete blogs categories."
        enableSearch
        placeholder={"Search categories..."}
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Blog Category",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/blog-category"),
          },
          {
            label: "View Portfolios",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/portfolios"),
          },
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Total Blogs" headers={headers}>
          {blogCatLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : blogCategories.length > 0 ? (
            blogCategories.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>

                <TableCell>{row.name}</TableCell>
                <TableCell>{row.slug}</TableCell>
                <TableCell>
                  <Box
                    component="img"
                    src={`${BASE_IMAGE_URL}/${row.image}`}
                    alt={row.name}
                    loading="lazy-load"
                    sx={{
                      maxHeight: 50,
                      maxWidth: "100%",
                      objectFit: "cover",
                    }}
                  />
                </TableCell>
                <TableCell>{formatDate(row.created_at)}</TableCell>
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
                    No Blog Category(s) Found.
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

export default BlogCategoryPage;
