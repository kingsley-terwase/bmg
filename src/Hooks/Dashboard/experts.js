/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";
import { useState, useEffect } from "react";

function useAddExpert() {
  const { config } = useUserContext();
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/create/expert`,
        data,
        config,
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
      if (error.response.data?.error !== 0) {
        showToast.error(error?.response?.data?.message);
      } else {
        showToast.error("An error occurred while adding Expert.");
      }
      return false;
    }
  };
}

const useFetchExperts = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [experts, setExperts] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/get/experts`,
        config,
      );

      const result = response.data;

      console.log(" Response:", result);

      if (result.code === 0) {
        setExperts(result.result);
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

  return { experts, refetch: fetchData, loading };
};

function useGetExpert() {
  const [loading, setLoading] = useState(false);
  const { config } = useUserContext();
  const [expertData, setExpertData] = useState(null);

  const getExpert = async (expertId) => {
    if (!expertId) {
      console.error("No ID provided");
      return;
    }

    setLoading(true);
    console.log("Fetching method with ID:", expertId);

    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/expert/${expertId}`,
        config,
      );

      const result = response.data;
      console.log("single res:", result);

      if (result?.code === 0) {
        setExpertData(result?.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setExpertData(null);
    } finally {
      setLoading(false);
    }
  };

  return { expertData, loading, getExpert };
}

const useUpdateExpertStatus = () => {
  return async (data, id) => {
    if (!id || typeof id === "object") {
      console.error("Invalid expert ID:", id);
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_SERVER_URL}/admin/update/expert/status/${id}`,
        data,
      );

      const result = response.data;
      console.log("Update Response:", result);

      showToast.success(result.message);
      return result;
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      showToast.error(
        error?.response?.data?.message || "Error occurred while updating.",
      );
    }
  };
};

export { useAddExpert, useFetchExperts, useGetExpert, useUpdateExpertStatus };
