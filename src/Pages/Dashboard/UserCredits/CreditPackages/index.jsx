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
import { useFetchPackages } from "../../../../Hooks/Users/credit_packages";
import EditCreditPackageModal from "./edit";

const CreditPackageSection = () => {
  const navigate = useNavigate();
  const { packages, loading: packagesLoading, refetch } = useFetchPackages();

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
        label="Credit Packages"
        desc="Create credit packages, to manage user credits, perform edit and delete operations."
        actions={[
          {
            label: "Add Package",
            icon: <AddOutlined />,
            onClick: () => navigate(() => {}),
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
                    No Credit Package Available...
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </CustomTable>
      </Box>

      <EditCreditPackageModal
        open={open}
        onClose={handleClose}
        packageId={selectedId}
      />
    </div>
  );
};

export default CreditPackageSection;
