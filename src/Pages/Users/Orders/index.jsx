import React from "react";
import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Stack,
  Grid,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  CustomTable,
  StatusChip,
  PagesHeader,
  InfoCard,
} from "../../../Component";
import { Visibility } from "@mui/icons-material";
import { headers } from "./data";
import {
  VisibilityOutlined,
  TipsAndUpdatesOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { EMOJI_ICONS } from "../../../Config/emojiIcons";
import { useFetchUserOrders } from "../../../Hooks/Users/orders";

const UserOrders = () => {
  const navigate = useNavigate();
  const { orders, loading } = useFetchUserOrders();

  return (
    <div>
      <PagesHeader
        label="Orders Overview"
        desc={
          "Manage all your orders, track orders progress, update orders status, payment status.  "
        }
        searchEnabled={false}
        actions={[
          {
            label: "View Consulations",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/user/orders"),
          },
          {
            label: "AI Services",
            icon: <TipsAndUpdatesOutlined />,
            onClick: () => navigate("/dashboard/user/artificial-intelligence"),
          },
        ]}
      />
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        alignItems={"flex-start"}
        mb={4}
      >
        <Grid size={{ xs: 12, md: 3 }}>
          <InfoCard
            icon={EMOJI_ICONS.shoppingCart}
            title="Total"
            value="0"
            color="#61B5FF"
            actionLabel="Total Orders"
            onAction={() => console.log("View Users")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <InfoCard
            icon={EMOJI_ICONS.success}
            title="Completed"
            value="0"
            actionLabel="Completed Orders"
            color="#61B5FF"
            onAction={() => console.log("View Users")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <InfoCard
            icon={EMOJI_ICONS.pending}
            title="Pending"
            value="0"
            actionLabel="Pending Orders"
            color="#61B5FF"
            onAction={() => console.log("View Users")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <InfoCard
            icon={EMOJI_ICONS.cancel}
            title="Cancelled"
            value="0"
            actionLabel="Cancelled Orders"
            color="#61B5FF"
            onAction={() => console.log("View Users")}
          />
        </Grid>
      </Grid>

      <Box mt={3} mb={3}>
        <CustomTable title="Total Orders" headers={headers}>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : orders.length > 0 ? (
            orders.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>

                <TableCell>{row.id}</TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell>{row.image}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.dueDate}</TableCell>
                <TableCell>{row.amount}</TableCell>

                <TableCell>
                  <StatusChip
                    status={row.status === true ? "active" : "inactive"}
                    label={row.status === true ? "Active" : "Disabled"}
                  />
                </TableCell>

                <TableCell>
                  <Stack direction={"row"} gap={1}>
                    <IconButton size="small">
                      <Visibility
                        fontSize="small"
                        onClick={() =>
                          navigate("/dashboard/user/orders/single")
                        }
                      />
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
                    No Order(s) Available
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

export default UserOrders;
