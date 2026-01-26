/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";
import { useState, useEffect } from "react";

function useCreateCategories() {
  const { config } = useUserContext();
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/create/category`,
        data,
        config,
      );
      const result = response.data;

      if (result?.code === 0) {
        showToast.success(result.message);
        return true;
      }
      if (result?.code !== 0) {
        showToast.success(result.message);
        return false;
      }
      if (result?.error) {
        showToast.error(result?.message);
        return false;
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      if (error.response.data?.code !== 0) {
        showToast.error(error?.response?.data?.message);
      } else {
        showToast.error("An error occurred while creating category.");
      }
      return false;
    }
  };
}

const useFetchCategories = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/categories`,
        config,
      );

      const result = response.data;
      console.log("single res:", result);

      if (result.code === 0) {
        setCategories(result?.result?.data);
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

  return { categories, refetch: fetchData, loading };
};

function useGetCategory() {
  const [loading, setLoading] = useState(false);
  const { config } = useUserContext();
  const [categoryData, setCategoryData] = useState(null);

  const getCategory = async (catId) => {
    if (!catId) {
      console.error("No category ID provided");
      return;
    }

    setLoading(true);
    console.log("Fetching category with ID:", catId);

    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/category/${catId}`,
        config,
      );

      const result = response.data;
      console.log("single res:", result);

      if (result?.code === 0) {
        setCategoryData(result?.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setCategoryData(null);
    } finally {
      setLoading(false);
    }
  };

  return { categoryData, loading, getCategory };
}

const useUpdateCategory = () => {
  return async (data, id) => {
    if (!id || typeof id === "object") {
      console.error("Invalid category ID:", id);
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_SERVER_URL}/admin/update/category/${id}`,
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
          "Error occurred while updating category.",
      );
    }
  };
};

const useDeleteCategory = () => {
  return async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_SERVER_URL}/admin/delete/category/${id}`,
        {},
      );

      const result = response.data;

      showToast.success(result.message);
      return result;
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      showToast.error("error occurred while deleting category.");
      throw error;
    }
  };
};

export {
  useCreateCategories,
  useFetchCategories,
  useGetCategory,
  useUpdateCategory,
  useDeleteCategory
};
