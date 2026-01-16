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
import { formatDate, truncateText } from "../../../utils/functions";
import { useFetchCategoryFaqs } from "../../../Hooks/Dashboard/category_faq";
import SingleCategoryFaqModal from "./single";

const CategoryFaqPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

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

  const { refetch, catFaqs, loading: catFaqsLoading } = useFetchCategoryFaqs();

  return (
    <div>
      <PagesHeader
        label="Category FAQs"
        desc="Manage category FAQs - view available category FAQs, add new FAQs, update, terminate or disable FAQs."
        enableSearch
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Category FAQ",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/category-faq"),
          },
          {
            label: "Add Service FAQ",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/service-faq"),
          },
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Available Category FAQs" headers={headers}>
          {catFaqsLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : catFaqs.length > 0 ? (
            catFaqs.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell
                  sx={{
                    maxWidth: 400,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography variant="body2" title={row.answer}>
                    {truncateText(row.question, 80)}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    maxWidth: 400,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography variant="body2" title={row.answer}>
                    {truncateText(row.answer, 80)}
                  </Typography>
                </TableCell>
                <TableCell>{row.category_name}</TableCell>

                <TableCell>{formatDate(row.created_at)}</TableCell>
                <TableCell>{formatDate(row.updated_at)}</TableCell>

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
                    No Category FAQ Available.
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </CustomTable>
      </Box>

      <SingleCategoryFaqModal
        open={open}
        onClose={handleClose}
        faqId={selectedId}
      />
    </div>
  );
};

export default CategoryFaqPage;
