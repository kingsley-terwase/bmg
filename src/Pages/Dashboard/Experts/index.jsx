import React, { useState } from "react";
import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Grid,
  CircularProgress
} from "@mui/material";
import {
  CustomTable,
  StatusChip,
  PagesHeader,
  InsightPieCard,
  TopRankingExpertsCard
} from "../../../Component";
import { headers } from "./data";
import { AddOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFetchExperts } from "../../../Hooks/experts";

const ExpertsPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  const { refetch, experts, loading } = useFetchExperts();

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
            onClick: () => navigate("/dashboard/admin/add/expert")
          }
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
                { name: "Terminated Experts", value: 1000, color: "#F44336" }
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
          {loading && (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          )}

          {experts.map((row) => (
            <TableRow hover key={row.id}>
              <TableCell>
                <Checkbox />
              </TableCell>

              <TableCell>{row.id}</TableCell>
              <TableCell>{row.firstname}</TableCell>
              <TableCell>{row.lastname}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>

              <TableCell>
                <StatusChip status={row.status} label={row.status} />
              </TableCell>

              <TableCell>
                <IconButton size="small">
                  <VisibilityOutlined fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </CustomTable>
      </Box>
    </div>
  );
};

export default ExpertsPage;
