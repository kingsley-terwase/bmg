import React, { useState } from "react";
import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  Stack,
  CircularProgress
} from "@mui/material";
import {
  CustomButton,
  CustomTable,
  PagesHeader,
  StatusBadge
} from "../../../Component";
import { AddOutlined, VisibilityOutlined, DeleteOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useGetAdminTypes } from "../../../Hooks/admin_types";
import { headers } from "./data";
import { formatDate } from "../../../utils/functions";
import { showToast } from "../../../utils/toast";
import { useLoader } from "../../../Contexts/LoaderContext";
import { useDisableAdminType } from "../../../Hooks/admin_types";

const AdminRoles = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState(null);
  const [row, setRow] = useState(null);
  const { showLoader, hideLoader } = useLoader();
  const [editModal, setEditModal] = useState(false);

  const { adminTypes, refetch, loading } = useGetAdminTypes();
  const { updateStatus, loading: disableLoading } = useDisableAdminType();

  const handleDisableType = (id, status) => async (e) => {
    e.preventDefault();
    setRow({ id, status });

    try {
      setLoadingId(row.id);
      showLoader();
      await updateStatus(row.id, { status: row.status });
      await refetch();
      setLoadingId(null);
    } catch (error) {
      showToast.error(error || "Failed to add role");
    } finally {
      hideLoader();
      setLoadingId(null);
    }
  };

  const handleEdit = () => {
    setEditModal(true);
  };

  return (
    <div>
      <PagesHeader
        label="Manage Roles"
        desc="Manage admministrators roles, add, edit and disable admin roles. "
        enableSearch
        placeholder="Seach admin role.."
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Role",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/add/admin-roles")
          },
          {
            label: "Manage Permissions",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/manage/admin-permissions")
          }
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Admin Roles" headers={headers}>
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
          {adminTypes.map((row) => (
            <TableRow hover key={row.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                <StatusBadge
                  variant={row.status === true ? "success" : "danger"}
                  label={row.status === true ? "Active" : "Suspended  "}
                />
              </TableCell>
              <TableCell>{formatDate(row.created_at)}</TableCell>
              <TableCell>{formatDate(row.updated_at)}</TableCell>
              <TableCell variant="body" align="right">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="end"
                  gap={0.5}
                >
                  <CustomButton
                    btncolor="danger"
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </CustomButton>
                  {row.status === true ? (
                    <CustomButton
                      title={
                        disableLoading && loadingId === row.id ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          "Disable"
                        )
                      }
                      color="danger"
                      variant="filled"
                      startIcon={<DeleteOutlined />}
                      sx={{ textTransform: "none", px: 2 }}
                      onClick={handleDisableType(row.id, "0")}
                      disabled={disableLoading && loadingId === row.id}
                    />
                  ) : (
                    <CustomButton
                      title={
                        disableLoading && loadingId === row.id ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          "Enable"
                        )
                      }
                      color="success"
                      variant="filled"
                      sx={{ textTransform: "none", px: 2 }}
                      onClick={handleDisableType(row.id, "1")}
                      disabled={disableLoading && loadingId === row.id}
                    />
                  )}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </CustomTable>
      </Box>
    </div>
  );
};

export default AdminRoles;
