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
import { useFetchContentTypes } from "../../../../Hooks/Users/content_type";
import EditContentTypeModal from "./edit";

const ContentTypeSection = () => {
  const navigate = useNavigate();
  const { types, loading: typesLoading, refetch } = useFetchContentTypes();

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
        label="Manage Content Types"
        desc="Create content types, manage edit and delete operations."
        actions={[
          {
            label: "Add Content Type",
            icon: <AddOutlined />,
            onClick: () => navigate(() => {}),
          },
          {
            label: "Add Subscription Plan",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/subscriptions"),
          },
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Available Content Types" headers={headers}>
          {typesLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : types.length > 0 ? (
            types.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>

                <TableCell>{formatDate(row.created_at)}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{formatDate(row.updated_at)}</TableCell>

                <TableCell>
                  <StatusChip
                    status={row.is_active === true ? "active" : "inactive"}
                    label={row.is_active === true ? "Active" : "Disabled"}
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

      <EditContentTypeModal
        open={open}
        onClose={handleClose}
        typeId={selectedId}
      />
    </div>
  );
};

export default ContentTypeSection;
