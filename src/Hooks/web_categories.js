import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_SERVER_URL } from "../Config/paths";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    `${BASE_SERVER_URL}/web/categories`
                );

                if (res.data.success) {
                    setCategories(res.data.result);
                } else {
                    setError(res.data.message);
                }
            } catch (err) {
                setError(
                    err?.response?.data?.message || "Failed to fetch categories"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
};

export const useCategory = (id) => {
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setLoading(false);   
            return;
        }

        const fetchCategory = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    `${BASE_SERVER_URL}/web/category/${id}`
                );

                if (res.data.success) {
                    setCategory(res.data.result);
                } else {
                    setError(res.data.message);
                }
            } catch (err) {
                setError(
                    err?.response?.data?.message || "Failed to fetch category"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id]);

    return { category, loading, error };
};

