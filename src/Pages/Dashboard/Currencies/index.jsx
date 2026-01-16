import React, { useState } from "react";
import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { CustomTable, StatusChip, PagesHeader } from "../../../Component";
import { headers } from "./data";
import { AddOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFetchCurrencies } from "../../../Hooks/Dashboard/currencies";
import { formatDate } from "../../../utils/functions";
import { BASE_IMAGE_URL } from "../../../Config/paths";

const CurrenciesPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const { currencies, loading: currenciesLoading } = useFetchCurrencies();

  return (
    <div>
      <PagesHeader
        label="Manage Currencies"
        desc="View, update and delete currencies, update active status, to add currencies go to Add currencies."
        enableSearch
        placeholder="Search currencies..."
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Currency",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/currency"),
          },
          {
            label: "Add Resources",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/add/resources"),
          },
          {
            label: "View Mails",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/mails"),
          },
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Available Currencies" headers={headers}>
          {currenciesLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : currencies.length > 0 ? (
            currencies.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.name}</TableCell>
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
                <TableCell>{formatDate(row.created_at)}</TableCell>
                <TableCell>{formatDate(row.updated_at)}</TableCell>
                <TableCell>
                  <StatusChip
                    status={row.status === true ? "active" : "inactive"}
                    label={row.status === true ? "Active" : "Disabled"}
                  />
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
                    No Currency Found.
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

export default CurrenciesPage;
