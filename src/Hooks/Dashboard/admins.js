/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";
import { useState, useEffect } from "react";

function useAddAdmin() {
  const { config } = useUserContext();
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/create-admin`,
        data,
        config
      );

      const result = response.data;
      console.log(result);

      if (result?.code === 0) {
        showToast.success(result.message);
        return true;
      }
      if (result?.code !== 0) {
        showToast.error(result.message);
        return false;
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      if (error.response.data?.code !== 0) {
        showToast.error(error.response.data.message);
      } else {
        showToast.error("An error occurred while adding Admininistrator.");
      }
      return false;
    }
  };
}

const useFetchAdmins = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/get-admins`,
        config
      );

      const result = response.data;

      console.log(" Response:", result);

      if (result.code === 0) {
        setAdmins(result.result);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { admins, refetch: fetchData, loading };
};

function useGetAdmin() {
  const [loading, setLoading] = useState(false);
  const { config } = useUserContext();
  const [adminData, setAdminData] = useState(null);

  const getAdmin = async (adminId) => {
    if (!adminId) {
      console.error("No method ID provided");
      return;
    }

    setLoading(true);
    console.log("Fetching method with ID:", adminId);

    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/get-admin/${adminId}`,
        config
      );

      const result = response.data;
      console.log("single res:", result);

      if (result?.code === 0) {
        setAdminData(result?.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setAdminData(null);
    } finally {
      setLoading(false);
    }
  };

  return { adminData, loading, getAdmin };
}

export { useAddAdmin, useFetchAdmins, useGetAdmin };
