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
        config
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
        config
      );

      const result = response.data;
      console.log("single res:", result);

      if (result.code === 0) {
        setCategories(result.result);
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
  const [loading, setLoading] = useState(false); // Changed to false initially
  const { config } = useUserContext();
  const [categoryData, setCategoryData] = useState(null); // Changed to null

  const getCategory = async (catId) => {
    if (!catId) {
      console.error("No category ID provided");
      return;
    }

    setLoading(true);
    console.log("Fetching category with ID:", catId);

    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/subcategory/${catId}`,
        config
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

export { useCreateCategories, useFetchCategories, useGetCategory };
