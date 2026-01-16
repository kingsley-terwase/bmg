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
import { useFetchEbooks } from "../../../Hooks/Dashboard/ebooks";
import { BASE_IMAGE_URL } from "../../../Config/paths";
import { formatDate } from "../../../utils/functions";

const EbooksPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const { eboooks, loading } = useFetchEbooks();

  return (
    <div>
      <PagesHeader
        label="Manage Ebooks"
        desc="View, update and delete resources, update active status."
        enableSearch
        placeholder="Search resources..."
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Ebook",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/ebook"),
          },
          {
            label: "View Categories",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/categories"),
          },
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Total Resources" headers={headers}>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : eboooks.length > 0 ? (
            eboooks.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{row.author}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{formatDate(row.created_at)}</TableCell>
                <TableCell>{row.title}</TableCell>
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
                </TableCell>{" "}
                <TableCell>{formatDate(row.updated_at)}</TableCell>
                <TableCell>
                  <IconButton size="small">
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
                    No Ebook(s) Available.
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

export default EbooksPage;
