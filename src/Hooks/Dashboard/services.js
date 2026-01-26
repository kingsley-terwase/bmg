/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";
import { useState, useEffect } from "react";

function useCreateServices() {
  const { config } = useUserContext();
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/create/service`,
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
      if (error.response.data?.error) {
        showToast.error(error.response.data.message);
      } else {
        showToast.error("An error occurred while adding Service.");
      }
      return false;
    }
  };
}

const useFetchServices = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/services`,
        config,
      );

      const result = response.data;
      console.log("single res:", result);

      if (result.code === 0) {
        setServices(result.result);
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

  return { services, refetch: fetchData, loading };
};

function useGetService() {
  const [loading, setLoading] = useState(false);
  const { config } = useUserContext();
  const [serviceData, setServiceData] = useState(null);

  const getService = async (serviceId) => {
    if (!serviceId) {
      console.error("No service ID provided");
      return;
    }

    setLoading(true);
    console.log("Fetching service with ID:", serviceId);

    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/service/${serviceId}`,
        config,
      );

      const result = response.data;
      console.log("single res:", result);

      if (result?.code === 0) {
        setServiceData(result?.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setServiceData(null);
    } finally {
      setLoading(false);
    }
  };

  return { serviceData, loading, getService };
}

function useDeleteService() {
  const { config } = useUserContext();

  return async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_SERVER_URL}/admin/delete/service/${id}`,
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

function useUpdateService() {
  const [loading, setLoading] = useState(false);
  const { config } = useUserContext();

  const updateService = async (id, data) => {
    console.log("data:", data);
    setLoading(true);
    try {
      const response = await axios.put(
        `${BASE_SERVER_URL}/admin/update/service/${id}`,
        data,
        config,
      );

      const result = response.data;
      console.log("result res:", result);

      if (result?.code === 0) {
        showToast.success(result.message);
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      if (error?.response?.data?.code !== 0) {
        showToast.error(error.response.data.message);
      } else {
        showToast.error("An error occurred while updating service!");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateService, loading };
}

export {
  useCreateServices,
  useFetchServices,
  useGetService,
  useDeleteService,
  useUpdateService,
};
