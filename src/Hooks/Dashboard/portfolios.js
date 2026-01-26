/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";
import { useState, useEffect } from "react";

function useAddPortfolio() {
  const { config } = useUserContext();
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/create/portfolio`,
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
        showToast.error("error occurred while creating portfolio.");
      }
      return false;
    }
  };
}

const useFetchPortfolios = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [portfolios, setPortfolios] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/portfolios`,
        config,
      );

      const result = response.data;

      if (result.code === 0) {
        setPortfolios(result.result);
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

  return { portfolios, refetch: fetchData, loading };
};

function useGetPortfolio() {
  const [loading, setLoading] = useState(false);
  const { config } = useUserContext();
  const [data, setData] = useState(null);

  const getPortfolio = async (id) => {
    if (!id) {
      console.error("No ID provided");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/portfolio/${id}`,
        config,
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

  return { data, loading, getPortfolio };
}

const useUpdatePortfolio = () => {
  return async (data, id) => {
    if (!id || typeof id === "object") {
      console.error("Invalid ID:", id);
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_SERVER_URL}/admin/update/portfolio/${id}`,
        data,
      );

      const result = response.data;
      console.log("Update Response:", result);

      showToast.success(result.message);
      return result;
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      showToast.error(
        error?.response?.data?.message ||
          "Error occurred while updating portfolio.",
      );
    }
  };
};

const useDeletePortfolio = () => {
  return async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_SERVER_URL}/admin/delete/portfolio/${id}`,
        {},
      );

      const result = response.data;

      console.log("Delete Response:", result);

      showToast.success(result.message);
      return result;
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      showToast.error("error occurred while deleting portfolio.");
      throw error;
    }
  };
};

export {
  useAddPortfolio,
  useFetchPortfolios,
  useGetPortfolio,
  useUpdatePortfolio,
  useDeletePortfolio,
};
