import React, { useState } from "react";
import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Grid,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import {
  CustomTable,
  StatusChip,
  PagesHeader,
  InsightPieCard,
  TopRankingExpertsCard,
} from "../../../Component";
import { headers } from "./data";
import { AddOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFetchExperts } from "../../../Hooks/Dashboard/experts";

const ExpertsPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  const { experts, loading: expertsLoading } = useFetchExperts();

  return (
    <div>
      <PagesHeader
        label="Manage Experts"
        desc="Manage Experts - view all orders, assign new orders, add, edit, terminate or disable and expert."
        enableSearch
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Expert",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/expert"),
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
            <InsightPieCard
              title="Experts Insight"
              chartData={[
                { name: "Active Experts", value: 5000, color: "#4CAF50" },
                { name: "Suspended Experts", value: 2500, color: "#FF9800" },
                { name: "Terminated Experts", value: 1000, color: "#F44336" },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TopRankingExpertsCard />
          </Grid>
        </Grid>
      </Box>

      <Box mt={3} mb={3}>
        <CustomTable title="Total Experts" headers={headers}>
          {expertsLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : experts.length > 0 ? (
            experts.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>

                <TableCell>{row.first_name}</TableCell>
                <TableCell>{row.last_name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>

                <TableCell>
                  <StatusChip
                    status={row.is_verified === true ? "active" : "inactive"}
                    label={row.is_verified === true ? "Verified" : "Unverified"}
                  />
                </TableCell>

                <TableCell>
                  <StatusChip
                    status={row.status === 1 ? "active" : "inactive"}
                    label={row.status === 1 ? "Active" : "Disabled"}
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
                    No Expert Found.
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

export default ExpertsPage;
