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
import { SendOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { headers } from "./data";
import { useFetchConsultations } from "../../../Hooks/Dashboard/consultations";
import { formatDate } from "../../../utils/functions";

const ConsultationsPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const { consultations, loading } = useFetchConsultations();

  return (
    <div>
      <PagesHeader
        label="Manage Counsultations"
        desc="View and manage consultations, see booked appointments, reply via mails and update consultations status."
        enableSearch
        placeholder="Search Consultations..."
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Send Mail",
            icon: <SendOutlined />,
            onClick: () => navigate("/dashboard/admin/mails"),
          },
          {
            label: "View Orders",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/orders"),
          },
          {
            label: "View Campaigns",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/orders"),
          },
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Consultations" headers={headers}>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : consultations.length > 0 ? (
            consultations.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>

                <TableCell>{row.full_name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{formatDate(row.created_at)}</TableCell>
                <TableCell>{formatDate(row.updated_at)}</TableCell>

                <TableCell>
                  <StatusChip status={row.status} label={row.status} />
                </TableCell>

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
                    No Consulation(s) Found.
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

export default ConsultationsPage;
