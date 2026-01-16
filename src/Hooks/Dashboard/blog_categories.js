/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";
import { useState, useEffect } from "react";

function useCreateBlogCategory() {
  const { config } = useUserContext();
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/create/blog-category`,
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
    } catch (error) {
      console.error("Error:", error.response.data);
      if (error.response.data?.error) {
        showToast.error(error.response.data.message);
      } else {
        showToast.error("An error occurred while creating blog category.");
      }
      return false;
    }
  };
}

const useFetchBlogCategory = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [blogCategories, setBlogCategories] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/blog-categories`,
        config
      );

      const result = response.data;

      console.log(" Response:", result);

      if (result.code === 0) {
        setBlogCategories(result.result);
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

  return { blogCategories, refetch: fetchData, loading };
};

export { useCreateBlogCategory, useFetchBlogCategory };
