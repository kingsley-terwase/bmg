import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_SERVER_URL } from "../Config/paths";

export const useServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    `${BASE_SERVER_URL}/web/services`
                );

                if (res.data.success) {
                    setServices(res.data.result);
                } else {
                    setError(res.data.message);
                }
            } catch (err) {
                setError(
                    err?.response?.data?.message || "Failed to fetch services"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return { services, loading, error };
};

export const useService = (id) => {
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

                const res = await axios.get(
                    `${BASE_SERVER_URL}/web/service/${id}`
                );

                if (res.data.success) {
                    setService(res.data.result);
                    setError(null);
                } else {
                    setError(res.data.message || "Failed to load service");
                    setService(null);
                }
            } catch (err) {
                setError(
                    err?.response?.data?.message || "Failed to fetch service"
                );
                setService(null);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]); // Only re-run when id changes

    return { service, loading, error };
};