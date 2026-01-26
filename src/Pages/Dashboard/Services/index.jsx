import React, { useState } from "react";
import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Grid,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  CustomTable,
  StatusChip,
  PagesHeader,
  TopSellingServicesCard,
  CategoryOverviewCard,
} from "../../../Component";
import { headers, serviceData } from "./data";
import { AddOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFetchServices } from "../../../Hooks/Dashboard/services";
import { formatDate } from "../../../utils/functions";

const ServicesPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const { services, loading: servicesLoading } = useFetchServices();

  const handleView = (serviceId) => {
    navigate(`/dashboard/admin/service/details`, {
      state: { serviceId },
    });
  };

  return (
    <div>
      <PagesHeader
        label="Manage Services"
        desc="Add services, control services status, manage editing and deleting services."
        enableSearch
        placeholder="Search services..."
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Service",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/services"),
          },
          {
            label: "Add Category",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/category"),
          },
        ]}
      />

      <Box>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          mt={3}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <CategoryOverviewCard
              title="Services Overview"
              data={serviceData}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TopSellingServicesCard />
          </Grid>
        </Grid>
      </Box>

      <Box mt={3} mb={3}>
        <CustomTable title="Total Services" headers={headers}>
          {servicesLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : services.length > 0 ? (
            services.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>

                <TableCell>{row.service_name}</TableCell>
                <TableCell>{row.category_name}</TableCell>
                <TableCell>{formatDate(row.created_at)}</TableCell>
                <TableCell>{formatDate(row.updated_at)}</TableCell>

                <TableCell>
                  <StatusChip
                    status={row.service_status === true ? "active" : "inactive"}
                    label={row.service_status === true ? "Active" : "Disabled"}
                  />
                </TableCell>

                <TableCell>
                  <IconButton size="small" onClick={() => handleView(row.id)}>
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
                    No Services Available.
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

export default ServicesPage;
