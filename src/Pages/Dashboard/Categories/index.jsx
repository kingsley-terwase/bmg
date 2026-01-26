import React, { useState } from "react";
import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { CustomTable, StatusChip, PagesHeader } from "../../../Component";
import { headers } from "./data";
import { AddOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFetchCategories } from "../../../Hooks/Dashboard/categories";
import { formatDate, truncateText, stripHtml } from "../../../utils/functions";
import SingleCategoryModal from "./single";

const CategoriesPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const {
    categories,
    refetch,
    loading: categoriesLoading,
  } = useFetchCategories();

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    await refetch();
    setSelectedId(null);
  };

  return (
    <div>
      <PagesHeader
        label="Manage Categories"
        desc="Control and manage categories of services, add, edit and delete categories."
        enableSearch
        placeholder="Search Categories..."
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Category",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/categories"),
          },
          {
            label: "Add SubCategory",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/sub-categories"),
          },
          {
            label: "Add Service",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/service"),
          },
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Total Categories" headers={headers}>
          {categoriesLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : categories.length > 0 ? (
            categories.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>

                <TableCell>{row.name}</TableCell>
                <TableCell
                  sx={{
                    maxWidth: 400,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography variant="body2" title={row.answer}>
                    {truncateText(stripHtml(row.description), 80)}
                  </Typography>
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
                  <IconButton size="small" onClick={() => handleOpen(row.id)}>
                    <VisibilityOutlined fontSize="small" />
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
                    No Category Available.
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </CustomTable>
      </Box>

      <SingleCategoryModal
        open={open}
        onClose={handleClose}
        catId={selectedId}
      />
    </div>
  );
};

export default CategoriesPage;
