/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";

function useGenerateImage() {
  const { config } = useUserContext();

  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/ai/text-to-image`,
        data,
        config
      );

      const result = response.data;
      console.log("generated image:", result);

      if (result?.strategy || result?.message || result?.status === true) {
        return result;
      }

      if (result?.error || result?.message) {
        const msg = result?.message || result?.error;
        showToast.error(msg);
        return false;
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      if (error.response.data?.code !== 0) {
        showToast.error(error.response.data.message);
      } else {
        showToast.error("Unexpected error occurred. Please try again.");
      }
      return false;
    }
  };
}

const useFetchGeneratedImages = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/ai/ai-images`,
        config
      );

      const result = response.data;
      console.log("single res:", result);

      if (result.code === 0) {
        setImages(result.result);
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

  return { images, refetch: fetchData, loading };
};

function useGenerateImageToImage() {
  const { config } = useUserContext();

  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/ai/image-to-image`,
        data,
        config
      );

      const result = response.data;
      console.log("generated image:", result);

      if (result?.strategy || result?.message || result?.status === true) {
        return result;
      }

      if (result?.error || result?.message) {
        const msg = result?.message || result?.error;
        showToast.error(msg);
        return false;
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      if (error.response.data?.code !== 0) {
        showToast.error(error.response.data.message);
      } else {
        showToast.error("Unexpected error occurred. Please try again.");
      }
      return false;
    }
  };
}

export { useGenerateImage, useFetchGeneratedImages, useGenerateImageToImage };
