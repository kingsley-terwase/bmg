/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../Config/paths";
import { useUserContext } from "../Contexts";
import { showToast } from "../utils/toast";
import { useState, useEffect } from "react";

function useCreatePayMethods() {
  const { config } = useUserContext();
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/create/payment/method`,
        data,
        config
      );
      const result = response.data;
      console.log(result);
      if (result?.error === 0) {
        showToast.success(result.message);
        return true;
      }
      if (result?.error === 2) {
        showToast.success(result.message);
        return false;
      }
      if (result?.error) {
        showToast.error(result?.message);
        return false;
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      if (error.response.data?.error) {
        showToast.error(error.response.data.message);
      } else {
        showToast.error("An error occurred while creating method.");
      }
      return false;
    }
  };
}

const useFetchPayMethods = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/payment-methods`,
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

export { useCreatePayMethods, useFetchPayMethods };
