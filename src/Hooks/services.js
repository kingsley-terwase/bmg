import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_SERVER_URL } from "../Config/paths";
import { formatGHS } from "../utils/currency";

export const useGetServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_SERVER_URL}/web/services`);

        if (res.data.success) {
          setServices(res.data.result);
        } else {
          setError(res.data.message);
        }
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
};

export const useGetService = (id) => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Early return if no ID provided
    if (!id) {
      setLoading(false);
      setError("No service ID provided");
      return;
    }

    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state

        const res = await axios.get(`${BASE_SERVER_URL}/web/service/${id}`);

        if (res.data.success) {
          setService(res.data.result);
          setError(null);
        } else {
          setError(res.data.message || "Failed to load service");
          setService(null);
        }
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to fetch service");
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]); // Only re-run when id changes

  return { service, loading, error };
};

export const calculateServicePrice = (service, key = 0) => {
  // Get the first service type
  const serviceType = service?.service_types?.[key];

  // Return default values if no service type exists
  if (!serviceType) {
    return {
      originalPrice: 0,
      finalPrice: 0,
      discountAmount: 0,
      discountLabel: null,
      hasDiscount: false,
      serviceType: null,
      discountType: null,
    };
  }

  const originalPrice = Number(serviceType.price || 0);
  const hasDiscount =
    serviceType.discount_value && Number(serviceType.discount_value) > 0;

  let finalPrice = originalPrice;
  let discountAmount = 0;
  let discountLabel = null;
  let discountType = serviceType.discount_type;

  if (hasDiscount) {
    if (discountType === "fixed") {
      discountAmount = Number(serviceType.discount_value);
      finalPrice -= discountAmount;
      discountLabel = `${formatGHS(serviceType.discount_value)} OFF`;
    } else if (discountType === "percentage") {
      discountAmount =
        (originalPrice * Number(serviceType.discount_value)) / 100;

      // Apply discount_max_amount cap if it exists
      if (serviceType.discount_max_amount) {
        discountAmount = Math.min(
          discountAmount,
          Number(serviceType.discount_max_amount),
        );
      }

      finalPrice -= discountAmount;
      discountLabel = `${serviceType.discount_value}% OFF`;
    }
  }

  return {
    originalPrice,
    finalPrice,
    discountAmount,
    discountLabel,
    hasDiscount,
    serviceType,
  };
};
