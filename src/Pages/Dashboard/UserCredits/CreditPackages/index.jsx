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
import { CustomTable, StatusChip, PagesHeader } from "../../../../Component";
import { headers } from "./data";
import {
  AddOutlined,
  VisibilityOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../utils/functions";
import ViewCreditPackageModal from "./view";
import AddCreditPackageModal from "./add";
import { useFetchPackages } from "../../../../Hooks/Dashboard/credit_packages";
import EditCreditPackageModal from "./edit";

const CreditPackageSection = () => {
  const navigate = useNavigate();
  const { packages, loading: packagesLoading, refetch } = useFetchPackages();
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

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
    setSelectedPackage(id);
    setEditModal(true);
  };

  const handleCloseEdit = async () => {
    setEditModal(false);
    await refetch();
    setSelectedPackage(null);
  };

  return (
    <div>
      <PagesHeader
        label="Credit Packages"
        desc="Create credit packages, to manage user credits, perform edit and delete operations."
        actions={[
          {
            label: "Add Package",
            icon: <AddOutlined />,
            onClick: handleOpenModal,
          },
          {
            label: "Add Subscription Plans",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/subscriptions"),
          },
          {
            label: "View Plans",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/subscriptions"),
          },
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Total Credit Packages" headers={headers}>
          {packagesLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : packages.length > 0 ? (
            packages.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{formatDate(row.created_at)}</TableCell>
                <TableCell>{row.credits}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{formatDate(row.updated_at)}</TableCell>

                <TableCell>
                  <StatusChip
                    status={row.is_active === true ? "active" : "inactive"}
                    label={row.is_active === true ? "Active" : "Disabled"}
                  />
                </TableCell>

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
                    No Credit Package Available...
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </CustomTable>
      </Box>

      <ViewCreditPackageModal
        open={open}
        onClose={handleClose}
        packageId={selectedId}
      />

      <AddCreditPackageModal open={openCreate} onClose={handleCloseModal} />

      <EditCreditPackageModal
        open={editModal}
        onClose={handleCloseEdit}
        packageId={selectedPackage}
      />
    </div>
  );
};

export default CreditPackageSection;
