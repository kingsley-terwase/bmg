/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";
import { useState, useEffect } from "react";

function useAddCategoryFaqs() {
  const { config } = useUserContext();
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/create/category/faqs`,
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
        showToast.error("error occurred while creating category faq.");
      }
      return false;
    }
  };
}

const useFetchCategoryFaqs = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [catFaqs, setCatFaqs] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/category-faqs`,
        config,
      );

      const result = response.data;

      console.log(" Response:", result);

      if (result.code === 0) {
        setCatFaqs(result.result);
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

  return { catFaqs, refetch: fetchData, loading };
};

function useGetCategoryFaq() {
  const [loading, setLoading] = useState(false);
  const { config } = useUserContext();
  const [faqData, setFaqData] = useState(null);

  const getFaqData = async (faqId) => {
    if (!faqId) {
      console.error("No faq ID provided");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/category/faq/${faqId}`,
        config,
      );

      const result = response.data;
      console.log("single res:", result);

      if (result?.code === 0) {
        setFaqData(result?.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setFaqData(null);
    } finally {
      setLoading(false);
    }
  };

  return { faqData, loading, getFaqData };
}

const useUpdateCategoryFaq = () => {
  return async (data, id) => {
    if (!id || typeof id === "object") {
      console.error("Invalid category FAQ ID:", id);
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_SERVER_URL}/admin/update/category/faq/${id}`,
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
          "Error occurred while updating this category FAQ.",
      );
    }
  };
};

const useDeleteCategoryFaq = () => {
  return async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_SERVER_URL}/admin/delete/category/faq/${id}`,
        {},
      );

      const result = response.data;

      console.log("Delete Response:", result);

      showToast.success(result.message);
      return result;
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      showToast.error("error occurred while deleting this category FAQ.");
      throw error;
    }
  };
};

export {
  useAddCategoryFaqs,
  useFetchCategoryFaqs,
  useGetCategoryFaq,
  useUpdateCategoryFaq,
  useDeleteCategoryFaq,
};
