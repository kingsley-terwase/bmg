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
import { CustomTable, PagesHeader } from "../../../Component";
import { headers } from "./data";
import { AddOutlined, VisibilityOutlined, EditOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFetchServiceFaqs } from "../../../Hooks/Dashboard/service_faqs";
import { formatDate, truncateText } from "../../../utils/functions";
import SingleServiceFaqModal from "./single";
import EditServiceFaqModal from "./edit";

const ServiceFaqsPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    await refetch();
    setSelectedId(null);
  };

  const handleOpenEdit = (id) => {
    setSelectedFaq(id);
    setEditModal(true);
  };

  const handleCloseEdit = async () => {
    setEditModal(false);
    await refetch();
    setSelectedFaq(null);
  };

  const {
    refetch,
    serviceFaqs,
    loading: serviceFaqsLoading,
  } = useFetchServiceFaqs();

  return (
    <div>
      <PagesHeader
        label="Service FAQs"
        desc="Manage service FAQs - view available service FAQs, add new FAQs, update, terminate or disable FAQs."
        enableSearch
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Service FAQ",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/service-faq"),
          },
          {
            label: "Add Category FAQ",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/category-faq"),
          },
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Available Service FAQs" headers={headers}>
          {serviceFaqsLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : serviceFaqs.length > 0 ? (
            serviceFaqs.map((row, index) => (
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
                    {truncateText(row.answer, 60)}
                  </Typography>
                </TableCell>
                <TableCell>{row.service_name}</TableCell>

                <TableCell>{formatDate(row.created_at)}</TableCell>
                <TableCell>{formatDate(row.updated_at)}</TableCell>

                <TableCell>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="end"
                    gap={0.5}
                  >
                    <IconButton size="small" onClick={() => handleOpen(row.id)}>
                      <VisibilityOutlined fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenEdit(row.id)}
                    >
                      <EditOutlined fontSize="small" />
                    </IconButton>
                  </Stack>
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
                    No Service FAQ Available.
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </CustomTable>
      </Box>

      <SingleServiceFaqModal
        open={open}
        onClose={handleClose}
        faqId={selectedId}
      />

      <EditServiceFaqModal
        open={editModal}
        onClose={handleCloseEdit}
        faqId={selectedFaq}
      />
    </div>
  );
};

export default ServiceFaqsPage;
