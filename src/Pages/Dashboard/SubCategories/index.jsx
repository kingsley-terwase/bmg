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
import {
  CustomTable,
  StatusChip,
  PagesHeader,
  CategoryOverviewCard,
} from "../../../Component";
import { headers, categoryInfo } from "./data";
import { AddOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFetchSubCategories } from "../../../Hooks/Dashboard/sub_categories";
import { formatDate, truncateText, stripHtml } from "../../../utils/functions";
import SingleSubCategoryModal from "./single";

const SubCategoriesPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const { subCat, loading: subCatLoading, refetch } = useFetchSubCategories();

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
        label="Manage Sub Categories"
        desc="Manage sub categories of categories, perform operations like add, edit and delete sub categories."
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

      <CategoryOverviewCard title="Sub Category Overview" data={categoryInfo} />

      <Box mt={3} mb={3}>
        <CustomTable title="Total Categories" headers={headers}>
          {subCatLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : subCat.length > 0 ? (
            subCat.map((row, index) => (
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
              <TableCell colSpan={7}>
                <Stack alignItems="center" spacing={2}>
                  <Typography
                    variant="body1"
                    sx={{ color: "#2C3891", fontWeight: 600 }}
                  >
                    No Sub Category Available...
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </CustomTable>
      </Box>

      <SingleSubCategoryModal
        open={open}
        onClose={handleClose}
        subCatId={selectedId}
      />
    </div>
  );
};

export default SubCategoriesPage;
