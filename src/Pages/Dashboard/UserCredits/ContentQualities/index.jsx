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
} from "../../../../Component";
import { headers } from "./data";
import { AddOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../utils/functions";
import { useFetchContentQualtity } from "../../../../Hooks/Users/content_qualities";
import EditContentQualityModal from "./edit";

const ContentQualitySection = () => {
  const navigate = useNavigate();
  const {
    qualities,
    loading: qualitiesLoading,
    refetch,
  } = useFetchContentQualtity();

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
        label="Manage Content Qualities"
        desc="Manage content qualities, add variations of qualities for content generation edit and delete content qualities."
        actions={[
          {
            label: "Add Content Quality",
            icon: <AddOutlined />,
            onClick: () => navigate(() => {}),
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

      <EditContentQualityModal
        open={open}
        onClose={handleClose}
        qualityId={selectedId}
      />
    </div>
  );
};

export default ContentQualitySection;
