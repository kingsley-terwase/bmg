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
import { useFetchPayMethods } from "../../../Hooks/Dashboard/payment_methods";
import { formatDate, truncateText, stripHtml } from "../../../utils/functions";
import SingleMethodModal from "./single";

const PaymentsMethodsPage = () => {
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

  const { refetch, methods, loading: methodsLoading } = useFetchPayMethods();

  return (
    <div>
      <PagesHeader
        label="Payment Methods"
        desc="Manage payment methods - view availabel payment methods, add new methods, update, terminate or disable methods."
        enableSearch
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Payment Method",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/payment-method/add"),
          },
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Available Payment Methods" headers={headers}>
          {methodsLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : methods.length > 0 ? (
            methods.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>

                <TableCell>{row.name}</TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell
                  sx={{
                    maxWidth: 400,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography variant="body2" title={row.description}>
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
              <TableCell colSpan={6}>
                <Stack alignItems="center" spacing={2}>
                  <Typography
                    variant="body1"
                    sx={{ color: "#2C3891", fontWeight: 600 }}
                  >
                    No Payment Method Available.
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </CustomTable>
      </Box>

      <SingleMethodModal
        open={open}
        onClose={handleClose}
        methodId={selectedId}
      />
    </div>
  );
};

export default PaymentsMethodsPage;
