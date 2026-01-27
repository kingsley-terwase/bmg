/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";
import { useState, useEffect } from "react";

function useAddServiceFaq() {
  const { config } = useUserContext();
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/create/service/faqs`,
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
      if (error.response.data?.error !== 0) {
        showToast.error(error?.response?.data?.message);
      } else {
        showToast.error("error occurred while creating service faq.");
      }
      return false;
    }
  };
}

const useFetchServiceFaqs = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [serviceFaqs, setServiceFaqs] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/services/faqs`,
        config
      );

      const result = response.data;
      console.log(" Response:", result);

      if (result.code === 0) {
        setServiceFaqs(result.result);
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

  return { serviceFaqs, refetch: fetchData, loading };
};

function useGetServiceFaq() {
  const [loading, setLoading] = useState(false);
  const { config } = useUserContext();
  const [faqData, setFaqData] = useState(null);

  const getFaqData = async (faqId) => {
    if (!faqId) {
      console.error("No FAQ ID provided");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/service/faq/${faqId}`,
        config
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

const useUpdateServiceFaq = () => {
  return async (data, id) => {
    if (!id || typeof id === "object") {
      console.error("Invalid FAQ ID:", id);
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_SERVER_URL}/admin/update/service/faq/${id}`,
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
          "Error occurred while updating this FAQ."
      );
    }
  };
};

const useDeleteServiceFaq = () => {
  return async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_SERVER_URL}/admin/delete/service/faq/${id}`,
        {}
      );

      const result = response.data;

      console.log("Delete Response:", result);

      showToast.success(result.message);
      return result;
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      showToast.error("error occurred while deleting this FAQ.");
      throw error;
    }
  };
};

export {
  useAddServiceFaq,
  useFetchServiceFaqs,
  useGetServiceFaq,
  useUpdateServiceFaq,
  useDeleteServiceFaq,
};
