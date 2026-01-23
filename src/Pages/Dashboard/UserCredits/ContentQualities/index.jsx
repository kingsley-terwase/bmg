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
import EditContentQualityModal from "./edit";
import AddContentQualities from "./add";
import { useFetchContentQualtity } from "../../../../Hooks/Dashboard/content_qualities";
import ViewContentQualityModal from "./view";

const ContentQualitySection = () => {
  const navigate = useNavigate();
  const {
    qualities,
    loading: qualitiesLoading,
    refetch,
  } = useFetchContentQualtity();

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState(null);

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
    setSelectedQuality(id);
    setEditModal(true);
  };

  const handleCloseEdit = async () => {
    setEditModal(false);
    await refetch();
    setSelectedQuality(null);
  };

  return (
    <div>
      <PagesHeader
        label="Manage Content Qualities"
        desc="Manage content qualities, add variations of qualities for content generation edit and delete content qualities."
        actions={[
          {
            label: "Add Content Quality",
            icon: <AddOutlined />,
            onClick: handleOpenModal,
          },
          {
            label: "View Subscription Plans",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/subscriptions"),
          },
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Content Qualities" headers={headers}>
          {qualitiesLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : qualities.length > 0 ? (
            qualities.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>

                <TableCell>{row.name}</TableCell>
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
                    No Sub Category Available...
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </CustomTable>
      </Box>

      <ViewContentQualityModal
        open={open}
        onClose={handleClose}
        qualityId={selectedId}
      />

      <AddContentQualities open={openCreate} onClose={handleCloseModal} />

      <EditContentQualityModal
        open={editModal}
        onClose={handleCloseEdit}
        qualityId={selectedQuality}
      />
    </div>
  );
};

export default ContentQualitySection;
