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
  InfoCard,
  PagesHeader,
  StatusChip,
} from "../../../Component";
import { headers } from "./data";
import { AddOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { EMOJI_ICONS } from "../../../Config/emojiIcons";
import { formatDate } from "../../../utils/functions";
import { useFetchCoupons } from "../../../Hooks/Dashboard/coupons";

const CouponsPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const { coupons, loading: couponsLoading } = useFetchCoupons();
  return (
    <div>
      <PagesHeader
        label="Manage Coupons"
        desc="Manage coupon codes, add, edit and delete coupons. update active status"
        enableSearch
        placeholder="Search coupon..."
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Coupon",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/coupons"),
          },
          {
            label: "View Gifts",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/gifts"),
          },
          {
            label: "View Orders",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/orders"),
          },
        ]}
      />

      <Box>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          alignItems={"flex-start"}
          mb={4}
        >
          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              icon={EMOJI_ICONS.cardGift}
              title="Total Gifts"
              value="70"
              onAction={() => console.log("View Users")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              icon={EMOJI_ICONS.category}
              title="Gifts Sold"
              value="50"
              onAction={() => console.log("View Users")}
            />
          </Grid>
        </Grid>
      </Box>

      <Box mt={3} mb={3}>
        <CustomTable title="All Coupons" headers={headers}>
          {couponsLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : coupons.length > 0 ? (
            coupons.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.discount_value}</TableCell>
                <TableCell>{row.discount_max_amount}</TableCell>
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
                    No Coupon Code(s) Available.
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

export default CouponsPage;
