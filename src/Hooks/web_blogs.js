import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_SERVER_URL } from "../Config/paths";

// Helper functions for encoding/decoding IDs
const encodeId = (id) => {
    try {
        return btoa(id.toString());
    } catch (err) {
        console.error("Failed to encode ID:", err);
        return id;
    }
};

const decodeId = (encodedId) => {
    try {
        return atob(encodedId);
    } catch (err) {
        console.error("Failed to decode ID:", err);
        return encodedId;
    }
};

// Hook for fetching all blog categories
export const useBlogCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await axios.get(
                    `${BASE_SERVER_URL}/web/blog-categories`
                );

                if (res.data.success) {
                    // Add encoded ID to each category for URL usage
                    const categoriesWithEncodedId = res.data.result.map(cat => ({
                        ...cat,
                        encodedId: encodeId(cat.id)
                    }));
                    setCategories(categoriesWithEncodedId);
                } else {
                    setError(res.data.message || "Failed to load categories");
                }
            } catch (err) {
                setError(
                    err?.response?.data?.message || "Failed to fetch blog categories"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
};

// Hook for fetching a single blog category
export const useBlogCategory = (encodedId) => {
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!encodedId) {
            setLoading(false);
            setError("No category ID provided");
            return;
        }

        const fetchCategory = async () => {
            try {
                setLoading(true);
                setError(null);

                // Decode the ID before making the API call
                const decodedId = decodeId(encodedId);

                const res = await axios.get(
                    `${BASE_SERVER_URL}/web/blog-category/${decodedId}`
                );

                if (res.data.success) {
                    setCategory({
                        ...res.data.result,
                        encodedId: encodeId(res.data.result.id)
                    });
                    setError(null);
                } else {
                    setError(res.data.message || "Failed to load category");
                    setCategory(null);
                }
            } catch (err) {
                setError(
                    err?.response?.data?.message || "Failed to fetch blog category"
                );
                setCategory(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [encodedId]);

    return { category, loading, error };
};

// Hook for fetching all blogs
export const useBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await axios.get(
                    `${BASE_SERVER_URL}/web/blogs`
                );

                if (res.data.success) {
                    // Add encoded ID to each blog for URL usage
                    const blogsWithEncodedId = res.data.result.map(blog => ({
                        ...blog,
                        encodedId: encodeId(blog.id),
                        author_name: `${blog.author_first_name} ${blog.author_last_name}`
                    }));
                    setBlogs(blogsWithEncodedId);
                } else {
                    setError(res.data.message || "Failed to load blogs");
                }
            } catch (err) {
                setError(
                    err?.response?.data?.message || "Failed to fetch blogs"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return { blogs, loading, error };
};

// Hook for fetching a single blog
export const useBlog = (encodedId) => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!encodedId) {
            setLoading(false);
            setError("No blog ID provided");
            return;
        }

        const fetchBlog = async () => {
            try {
                setLoading(true);
                setError(null);

                // Decode the ID before making the API call
                const decodedId = decodeId(encodedId);

                const res = await axios.get(
                    `${BASE_SERVER_URL}/web/blog/${decodedId}`
                );

                if (res.data.success) {
                    setBlog({
                        ...res.data.result,
                        encodedId: encodeId(res.data.result.id),
                        author_name: `${res.data.result.author_first_name} ${res.data.result.author_last_name}`
                    });
                    setError(null);
                } else {
                    setError(res.data.message || "Failed to load blog");
                    setBlog(null);
                }
            } catch (err) {
                setError(
                    err?.response?.data?.message || "Failed to fetch blog"
                );
                setBlog(null);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [encodedId]);

    return { blog, loading, error };
};

// Export helper functions for use in components
export { encodeId, decodeId };