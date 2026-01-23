/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";

function useAddAdminRole() {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);

  const addAdminRole = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/create/admin-type`,
        data,
        config
      );
      const result = response.data;

      if (result?.error === 0) {
        showToast.success(result.message);
        return true;
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      if (error?.response?.data?.error) {
        showToast.error(error.response.data.message);
      } else {
        showToast.error("An error occurred while adding Admin.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addAdminRole, loading };
}

function useGetAdminTypes() {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [adminTypes, setAdminTypes] = useState([]);

  const getTypes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_SERVER_URL}/admin/admin-types`,
        config
      );

      const result = res.data;

      console.log("Admin Types Response:", result);

      if (result?.code === 0) {
        setAdminTypes(result.result);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTypes();
  }, []);

  return { adminTypes, refetch: getTypes, loading };
}

function useUpdateAdminType() {
  const [loading, setLoading] = useState(false);

  const updateStatus = async (id, data) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${BASE_SERVER_URL}/admin/update/admin-type/${id}`,
        data
      );

      const result = response.data;
      console.log("result res:", result);

      if (result?.code === 0) {
        showToast.success(result.message);
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      if (error?.response?.data?.code !== 0) {
        showToast.error(error.response.data.message);
      } else {
        showToast.error("An error occurred while updating Admin Type!");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { updateStatus, loading };
}

export { useAddAdminRole, useGetAdminTypes, useUpdateAdminType };
