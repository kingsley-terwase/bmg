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
import { CustomTable, PagesHeader } from "../../../../Component";
import { headers } from "./data";
import {
  AddOutlined,
  VisibilityOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../utils/functions";
import EditContentPriceModal from "./edit";
import AddContentPrice from "./add";
import { useFetchContentPrices } from "../../../../Hooks/Dashboard/content_price";
import ViewContentPriceModal from "./view";

const ContentPricePage = () => {
  const navigate = useNavigate();
  const { prices, loading: pricesLoading, refetch } = useFetchContentPrices();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    await refetch();
    setSelectedId(null);
  };

  const handleOpenModal = () => {
    setOpenCreate(true);
  };

  const handleCloseModal = async () => {
    setOpenCreate(false);
    await refetch();
  };

  const handleOpenEdit = (id) => {
    setSelectedPrice(id);
    setEditModal(true);
  };

  const handleCloseEdit = async () => {
    setEditModal(false);
    await refetch();
    setSelectedPrice(null);
  };

  return (
    <div>
      <PagesHeader
        label="Manage Content Prices"
        desc="Set the prices for content generations, perform operations like editing and deleting content prices."
        actions={[
          {
            label: "Add Content Price",
            icon: <AddOutlined />,
            onClick: handleOpenModal,
          },
          {
            label: "View Subscription Plans",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/subscriptions"),
          },
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Content Prices" headers={headers}>
          {pricesLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : prices.length > 0 ? (
            prices.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>

                <TableCell>{row.content_quality_name}</TableCell>
                <TableCell>{row.content_type_name}</TableCell>
                <TableCell>{row.cost}</TableCell>
                <TableCell>{row.length_seconds}</TableCell>
                <TableCell>{formatDate(row.created_at)}</TableCell>
                <TableCell>{formatDate(row.updated_at)}</TableCell>

                <TableCell>
                  <Stack direction="row" spacing={1} mt={1}>
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
              <TableCell colSpan={7}>
                <Stack alignItems="center" spacing={2}>
                  <Typography
                    variant="body1"
                    sx={{ color: "#2C3891", fontWeight: 600 }}
                  >
                    No Content Price Found
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </CustomTable>
      </Box>

      <EditContentPriceModal
        open={editModal}
        onClose={handleCloseEdit}
        priceId={selectedPrice}
      />

      <AddContentPrice open={openCreate} onClose={handleCloseModal} />

      <ViewContentPriceModal
        open={open}
        onClose={handleClose}
        priceId={selectedId}
      />
    </div>
  );
};

export default ContentPricePage;
