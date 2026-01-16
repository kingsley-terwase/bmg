/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";
import { useState, useEffect } from "react";

const useFetchConsultations = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [consultations, setConsultations] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/consultations`,
        config
      );

      const result = response.data;
      console.log(" Response:", result);

      if (result.code === 0) {
        setConsultations(result.result);
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

  return { consultations, refetch: fetchData, loading };
};

function useGetConsultation() {
  const [loading, setLoading] = useState(false);
  const { config } = useUserContext();
  const [data, setData] = useState(null);

  const getMethod = async (id) => {
    if (!id) {
      console.error("No ID provided");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/consultation/${id}`,
        config
      );

      const result = response.data;
      console.log("single res:", result);

      if (result?.code === 0) {
        setData(result?.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, getMethod };
}

const useUpdateConsultation = () => {
  return async (data, id) => {
    if (!id || typeof id === "object") {
      console.error("Invalid ID:", id);
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_SERVER_URL}/admin/update/consultation/${id}`,
        data
      );

      const result = response.data;
      console.log("Update Response:", result);

      showToast.success(result.message);
      return result;
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      showToast.error(
        error?.response?.data?.message ||
          "Error occurred while updating consultation"
      );
    }
  };
};

const useDeleteConsultation = () => {
  return async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_SERVER_URL}/admin/delete/consultation/${id}`,
        {}
      );

      const result = response.data;

      console.log("Delete Response:", result);

      showToast.success(result.message);
      return result;
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      showToast.error("error occurred while deleting consultation");
      throw error;
    }
  };
};

export {
  useFetchConsultations,
  useGetConsultation,
  useUpdateConsultation,
  useDeleteConsultation,
};
