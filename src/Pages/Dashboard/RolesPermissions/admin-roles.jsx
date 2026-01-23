import React, { useState } from "react";
import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  Stack,
  CircularProgress,
} from "@mui/material";
import {
  CustomButton,
  CustomTable,
  PagesHeader,
  StatusBadge,
} from "../../../Component";
import {
  AddOutlined,
  VisibilityOutlined,
  DisabledByDefaultOutlined,
  DoneOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useGetAdminTypes } from "../../../Hooks/Dashboard/admin_types";
import { headers } from "./data";
import { formatDate } from "../../../utils/functions";
import { showToast } from "../../../utils/toast";
import { useLoader } from "../../../Contexts/LoaderContext";
import { useUpdateAdminType } from "../../../Hooks/Dashboard/admin_types";
import AdminRoleEditModal from "./edit-roles-modal";

const AdminRoles = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState(null);
  const { showLoader, hideLoader } = useLoader();
  const [editModal, setEditModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);

  const { adminTypes, refetch, loading: typesLoading } = useGetAdminTypes();
  const { updateStatus, loading: disableLoading } = useUpdateAdminType();

  const handleDisableType = (id, status) => async (e) => {
    e.preventDefault();

    try {
      setLoadingId(id);
      await updateStatus(id, { status });
      await refetch();
    } catch (error) {
      showToast.error(error || "Failed to update role");
    } finally {
      setLoadingId(null);
    }
  };

  const handleEdit = (row) => {
    setSelectedRole(row);
    setEditModal(true);
  };

  const handleUpdateRole = async ({ payload }) => {
    if (!selectedRole) return;

    try {
      setLoading(true);
      showLoader();

      const res = await updateStatus(selectedRole.id, payload);
      if (res) {
        showToast.success("Role updated successfully.");
        await refetch();
      }

      setEditModal(false);
      setSelectedRole(null);
    } catch (error) {
      showToast.error(error || "Role update failed.");
    } finally {
      setLoading(false);
      hideLoader();
    }
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
            onClick: () => navigate("/dashboard/add/admin-roles"),
          },
          {
            label: "Manage Permissions",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/manage/admin-permissions"),
          },
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Admin Roles" headers={headers}>
          {typesLoading && (
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
                      startIcon={<DisabledByDefaultOutlined />}
                      sx={{ textTransform: "none", px: 2 }}
                      onClick={handleDisableType(row.id, false)}
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
                      startIcon={<DoneOutlined />}
                      color="success"
                      variant="filled"
                      sx={{ textTransform: "none", px: 2 }}
                      onClick={handleDisableType(row.id, true)}
                      disabled={disableLoading && loadingId === row.id}
                    />
                  )}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </CustomTable>
      </Box>

      <AdminRoleEditModal
        open={editModal}
        onClose={() => {
          setEditModal(false);
          setSelectedRole(null);
        }}
        role={selectedRole}
        loading={loading}
        onUpdate={handleUpdateRole}
      />
    </div>
  );
};

export default AdminRoles;
