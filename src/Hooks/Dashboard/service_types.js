/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { useEffect, useState } from "react";
import { showToast } from "../../utils/toast";

function useCreateServiceTypes() {
  const { config } = useUserContext();
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/create/service-type`,
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
        showToast.error("An error occurred while adding service type.");
      }
      return false;
    }
  };
}

const useFetchServiceTypes = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [serviceTypes, setServiceTypes] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/service-types`,
        config,
      );

      const result = response.data;
      console.log("service type res:", result);

      if (result.code === 0) {
        setServiceTypes(result.result);
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

  return { serviceTypes, refetch: fetchData, loading };
};

function useGetServiceType() {
  const [loading, setLoading] = useState(false);
  const { config } = useUserContext();
  const [typeData, setTypeData] = useState(null);

  const getServiceType = async (catId) => {
    if (!catId) {
      console.error("No category ID provided");
      return;
    }

    setLoading(true);
    console.log("Fetching category with ID:", catId);

    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/service-type/${catId}`,
        config,
      );

      const result = response.data;
      console.log("single res:", result);

      if (result?.code === 0) {
        setTypeData(result?.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setTypeData(null);
    } finally {
      setLoading(false);
    }
  };

  return { typeData, loading, getServiceType };
}

function useDeleteServiceType() {
  const { config } = useUserContext();

  return async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_SERVER_URL}/admin/delete/service-type/${id}`,
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

function useUpdateServiceType() {
  const [loading, setLoading] = useState(false);

  const updateStatus = async (id, data) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${BASE_SERVER_URL}/admin/update/service-type/${id}`,
        data,
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
        showToast.error("An error occurred while updating service type!");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { updateStatus, loading };
}

export {
  useCreateServiceTypes,
  useFetchServiceTypes,
  useGetServiceType,
  useDeleteServiceType,
  useUpdateServiceType,
};
