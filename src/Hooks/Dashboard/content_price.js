/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";
import { useState, useEffect } from "react";

function useCreateContentPrice() {
  const { config } = useUserContext();
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/create/content-price`,
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
      if (error.response.data?.code !== 0) {
        showToast.error(error.response.data.message);
      } else {
        showToast.error("An error occurred while creating content price.");
      }
      return false;
    }
  };
}

const useFetchContentPrices = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/content-prices`,
        config,
      );

      const result = response.data;
      console.log("Fetching ID:", result);

      if (result.code === 0) {
        setPrices(result.result);
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

  return { prices, refetch: fetchData, loading };
};

function useGetContentPrice() {
  const [loading, setLoading] = useState(false);
  const { config } = useUserContext();
  const [priceData, setPriceData] = useState(null);

  const getPrice = async (priceId) => {
    if (!priceId) {
      console.error("No ID provided");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/content-price/${priceId}`,
        config,
      );

      const result = response.data;

      if (result?.code === 0) {
        setPriceData(result?.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setPriceData(null);
    } finally {
      setLoading(false);
    }
  };

  return { priceData, loading, getPrice };
}

function useDeleteContentPrice() {
  const { config } = useUserContext();

  return async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_SERVER_URL}/admin/delete/content-price${id}`,
        {},
        config,
      );
      showToast.success(response.data.message);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      if (error?.response?.data?.error) {
        showToast.error(error.response.data.message);
      } else {
        showToast.error("An error occurred!");
      }
    }
  };
}

const useUpdateContentPrice = () => {
  return async (data, id) => {
    console.error("Invalid price ID:", id);

    if (!id || typeof id === "object") {
      console.error("Invalid price ID:", id);
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_SERVER_URL}/admin/update/content-price/${id}`,
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
          "Error occurred while updating content price.",
      );
    }
  };
};

export {
  useCreateContentPrice,
  useFetchContentPrices,
  useGetContentPrice,
  useDeleteContentPrice,
  useUpdateContentPrice,
};
