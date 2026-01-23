/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";
import { useState, useEffect } from "react";

function useCreatePackage() {
  const { config } = useUserContext();
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/create/credit-package`,
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
        showToast.error("An error occurred while creating package.");
      }
      return false;
    }
  };
}

const useFetchPackages = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/credit-packages`,
        config,
      );

      const result = response.data;
      console.log("Fetching ID:", result);

      if (result.code === 0) {
        setPackages(result.result);
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

  return { packages, refetch: fetchData, loading };
};

function useGetPackage() {
  const [loading, setLoading] = useState(false);
  const { config } = useUserContext();
  const [packageData, setPackageData] = useState(null);

  const getPackage = async (packageId) => {
    if (!packageId) {
      console.error("No ID provided");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/credit-package/${packageId}`,
        config,
      );

      const result = response.data;

      if (result?.code === 0) {
        setPackageData(result?.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setPackageData(null);
    } finally {
      setLoading(false);
    }
  };

  return { packageData, loading, getPackage };
}

function useDeletePackage() {
  const { config } = useUserContext();

  return async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_SERVER_URL}/admin/delete/credit-package/${id}`,
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

const useUpdatePackage = () => {
  return async (data, id) => {
          console.error("Invalid package ID:", id);

    if (!id || typeof id === "object") {
      console.error("Invalid package ID:", id);
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_SERVER_URL}/admin/update/credit-package/${id}`,
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
          "Error occurred while updating credit package.",
      );
    }
  };
};

export {
  useCreatePackage,
  useFetchPackages,
  useGetPackage,
  useDeletePackage,
  useUpdatePackage,
};
