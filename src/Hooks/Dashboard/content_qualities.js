/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";
import { useState, useEffect } from "react";

function useCreateContentQuality() {
  const { config } = useUserContext();
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/create/content-quality`,
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
        showToast.error("An error occurred while creating content type.");
      }
      return false;
    }
  };
}

const useFetchContentQualtity = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [qualities, setQualities] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/content-qualities`,
        config,
      );

      const result = response.data;
      console.log("Fetching:", result);

      if (result.code === 0) {
        setQualities(result.result);
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

  return { qualities, refetch: fetchData, loading };
};

function useGetContentQuality() {
  const [loading, setLoading] = useState(false);
  const { config } = useUserContext();
  const [qualityData, setQualityData] = useState(null);

  const getContentQuality = async (qualityId) => {
    if (!qualityId) {
      console.error("No ID provided");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/content-quality/${qualityId}`,
        config,
      );

      const result = response.data;

      if (result?.code === 0) {
        setQualityData(result?.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setQualityData(null);
    } finally {
      setLoading(false);
    }
  };

  return { qualityData, loading, getContentQuality };
}

const useUpdateContentQuality = () => {
  return async (data, id) => {
    console.error("Invalid content quality ID:", id);

    if (!id || typeof id === "object") {
      console.error("Invalid content quality ID:", id);
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_SERVER_URL}/admin/update/content-quality/${id}`,
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
          "Error occurred while updating content type.",
      );
    }
  };
};

function useDeleteContentQuality() {
  const { config } = useUserContext();

  return async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_SERVER_URL}/admin/delete/content-quality/${id}`,
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

export {
  useCreateContentQuality,
  useFetchContentQualtity,
  useGetContentQuality,
  useDeleteContentQuality,
  useUpdateContentQuality,
};
