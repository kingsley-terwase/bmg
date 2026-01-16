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
import { VisibilityOutlined, AddOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFetchPortfolios } from "../../../Hooks/Dashboard/portfolios";
import { formatDate } from "../../../utils/functions";
import { BASE_IMAGE_URL } from "../../../Config/paths";

const PortfoliosPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const { portfolios, loading } = useFetchPortfolios();

  return (
    <div>
      <PagesHeader
        label="Manage Portfolios"
        desc="Manage portfolios of services, blogs and categories. Add, update and delete portfolios, also manage their status."
        searchValue={search}
        placeholder="Search portfolios..."
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Portfolio",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/portfolios"),
          },
          {
            label: "Add Service",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/services"),
          },
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Total Payments" headers={headers}>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : portfolios.length > 0 ? (
            portfolios.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>

                <TableCell>{row.service_name}</TableCell>
                <TableCell>{formatDate(row.created_at)}</TableCell>
                <TableCell>{row.category_name}</TableCell>
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
                </TableCell>
                <TableCell>{formatDate(row.updated_at)}</TableCell>

                <TableCell>
                  <StatusChip
                    status={row.status === true ? "active" : "inactive"}
                    label={row.status === true ? "Active" : "Disabled"}
                  />
                </TableCell>

                <TableCell>
                  <IconButton size="small">
                    <VisibilityOutlined fontSize="medium" />
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
                    No Portfolio(s) Available.
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

export default PortfoliosPage;
