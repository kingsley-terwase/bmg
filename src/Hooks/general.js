/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../Config/paths";
import { useState, useEffect, useCallback } from "react";
import { useUserContext } from "../Contexts";
import { toast } from "react-toastify";

const useGetAllPortfolio = (filters = {}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useCallback(
    async (page = 1, append = false) => {
      setLoading(true);
      try {
        const params = {
          page,
          limit: filters.limit || 9,
          ...(filters.status !== undefined && { status: filters.status }),
          ...(filters.search && { search: filters.search }),
          ...(filters.sort && { sort: filters.sort }),
          ...(filters.order && { order: filters.order }),
          ...(filters.category && { category: filters.category }),
          ...(filters.service && { service: filters.service }),
        };

        const response = await axios.get(`${BASE_SERVER_URL}/web/portfolios`, {
          params,
        });

        const result = response.data;

        if (result.code === 0) {
          const newData = result.result || [];

          if (append) {
            setData((prevData) => [...prevData, ...newData]);
          } else {
            setData(newData);
          }

          // Check if there's more data to load
          setHasMore(newData.length === params.limit);
          setCurrentPage(page);
        }
        setLoading(false);
      } catch (error) {
        setData([]);
        console.error("Error fetching portfolios:", error);
        setLoading(false);
      }
    },
    [
      filters.limit,
      filters.status,
      filters.search,
      filters.sort,
      filters.order,
      filters.category,
      filters.service,
    ],
  );

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchData(currentPage + 1, true);
    }
  }, [currentPage, loading, hasMore, fetchData]);

  const refetch = useCallback(() => {
    setData([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchData(1, false);
  }, [fetchData]);

  useEffect(() => {
    fetchData(1, false);
  }, [fetchData]);

  return { data, refetch, loading, hasMore, loadMore };
};

const useGetCategories = (page = 1, limit = 8) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_SERVER_URL}/web/categories`, {
        params: { page, limit },
      });

      const result = response.data;

      if (result.code === 0) {
        // If backend returns nested structure with data and total
        if (result.result.data) {
          setData(result.result.data);
          setTotal(result.result.total);
        } else {
          // Fallback for simple array response
          setData(result.result);
          setTotal(result.result.length);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  return { data, total, refetch: fetchData, loading };
};

const useGetCategoryServices = ({ page = 1, limit = 8, id }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    if (!id) {
      setData([]);
      setTotal(0);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/web/category-services/${id}`,
        {
          params: { id, page, limit },
        },
      );

      const result = response.data;

      if (result.code === 0) {
        // If backend returns nested structure with data and total
        if (result.result.data) {
          setData(result.result.data);
          setTotal(result.result.total);
        } else {
          // Fallback for simple array response
          setData(result.result);
          setTotal(result.result.length);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching category services:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, id]);

  return { data, total, refetch: fetchData, loading };
};

const useGetAllFAQ = (page = 1, limit = 8) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_SERVER_URL}/web/faq`, {
        params: { page, limit },
      });

      const result = response.data;

      if (result.code === 0) {
        // If backend returns nested structure with data and total
        if (result.result.data) {
          setData(result.result.data);
          setTotal(result.result.total);
        } else {
          // Fallback for simple array response
          setData(result.result);
          setTotal(result.result.length);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching faq:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  return { data, total, refetch: fetchData, loading };
};

const useGetBlogs = (page = 1, limit = 8) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_SERVER_URL}/web/blogs`, {
        params: { page, limit },
      });

      const result = response.data;

      if (result.code === 0) {
        // If backend returns nested structure with data and total
        if (result.result.data) {
          setData(result.result.data);
          setTotal(result.result.total);
        } else {
          // Fallback for simple array response
          setData(result.result);
          setTotal(result.result.length);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  return { data, total, refetch: fetchData, loading };
};

function useSubmitConsultation() {
  const [loading, setLoading] = useState(false);
  const { config } = useUserContext();

  const submitConsultation = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/web/book/consultation`,
        data,
        config,
      );

      const result = response.data;
      console.log("result res:", result);

      if (result?.code === 0) {
        toast.success(result.message);
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      if (error?.response?.data?.code !== 0) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while updating service!");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submitConsultation, loading };
}

function useBuyGiftCard() {
  const [loading, setLoading] = useState(false);
  const { config } = useUserContext();

  /**
   * Purchases a gift card with the provided data
   * @param {object} data - Gift card purchase data
   * @returns {Promise<object|boolean>} Response data on success, false on error
   */
  const buyGiftCard = async (data) => {
    setLoading(true);
    try {
      console.log("data:", data);
      const response = await axios.post(
        `${BASE_SERVER_URL}/user/purchase/gift-card/:id`,
        data,
        config,
      );

      const result = response.data;
      console.log("result:", result);
      if (result?.code === 0) {
        toast.success(result.message);
        return response;
      }

      return response;
    } catch (error) {
      console.error("Error:", error.response?.data);
      if (error?.response?.data?.code !== 0) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while purchasing gift card!");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { buyGiftCard, loading };
}

export {
  useGetAllPortfolio,
  useGetCategories,
  useGetCategoryServices,
  useGetAllFAQ,
  useGetBlogs,
  useSubmitConsultation,
  useBuyGiftCard,
};
