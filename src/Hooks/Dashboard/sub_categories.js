/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";
import { useState, useEffect } from "react";

function useCreateSubCategories() {
  const { config } = useUserContext();
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/create/subcategory`,
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
        showToast.error("An error occurred while creating subcategory.");
      }
      return false;
    }
  };
}

const useFetchSubCategories = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [subCat, setSubCat] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/subcategories`,
        config
      );

      const result = response.data;

      if (result.code === 0) {
        setSubCat(result.result);
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

  return { subCat, refetch: fetchData, loading };
};

function useGetSubCategory() {
  const [loading, setLoading] = useState(false);
  const { config } = useUserContext();
  const [subCategoryData, setSubCategoryData] = useState(null);

  const getCategory = async (subCatId) => {
    if (!subCatId) {
      console.error("No category ID provided");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/subcategory/${subCatId}`,
        config
      );

      const result = response.data;

      if (result?.code === 0) {
        setSubCategoryData(result?.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSubCategoryData(null);
    } finally {
      setLoading(false);
    }
  };

  return { subCategoryData, loading, getCategory };
}

function useDeleteSubCategory() {
  const { config } = useUserContext();

  return async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_SERVER_URL}/admin/delete/subcategory/${id}`,
        {},
        config
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

export {
  useCreateSubCategories,
  useFetchSubCategories,
  useGetSubCategory,
  useDeleteSubCategory,
};
