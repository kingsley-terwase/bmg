import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_SERVER_URL } from "../Config/paths";

export const useGiftCards = () => {
    const [giftCards, setGiftCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGiftCards = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    `${BASE_SERVER_URL}/web/get/gift-cards`
                );

                if (res.data.success) {
                    setGiftCards(res.data.result);
                } else {
                    setError(res.data.message);
                }
            } catch (err) {
                setError(
                    err?.response?.data?.message || "Failed to fetch gift cards"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchGiftCards();
    }, []);

    return { giftCards, loading, error };
};


export const useGiftCard = (id) => {
    const [giftCard, setGiftCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Early return if no ID provided
        if (!id) {
            setLoading(false);
            setError("No gift card ID provided");
            return;
        }

        const fetchGiftCard = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error state

                const res = await axios.get(
                    `${BASE_SERVER_URL}/web/gift-card/${id}`
                );

                if (res.data.success) {
                    setGiftCard(res.data.result);
                    setError(null);
                } else {
                    setError(res.data.message || "Failed to load gift card");
                    setGiftCard(null);
                }
            } catch (err) {
                setError(
                    err?.response?.data?.message || "Failed to fetch gift card"
                );
                setGiftCard(null);
            } finally {
                setLoading(false);
            }
        };

        fetchGiftCard();
    }, [id]); // Only re-run when id changes

    return { giftCard, loading, error };
};


export const useAuthGiftCards = (token) => {
    const [giftCards, setGiftCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Early return if no token provided
        if (!token) {
            setLoading(false);
            setError("Authentication token is required");
            return;
        }

        const fetchGiftCards = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error state

                const res = await axios.get(
                    `${BASE_SERVER_URL}/web/get/gift-cards`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );

                if (res.data.success) {
                    setGiftCards(res.data.result);
                    setError(null);
                } else {
                    setError(res.data.message || "Failed to load gift cards");
                    setGiftCards([]);
                }
            } catch (err) {
                setError(
                    err?.response?.data?.message || "Failed to fetch gift cards"
                );
                setGiftCards([]);
            } finally {
                setLoading(false);
            }
        };

        fetchGiftCards();
    }, [token]); // Only re-run when token changes

    return { giftCards, loading, error };
};

export const useGiftCardByCode = (code) => {
    const [giftCard, setGiftCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Early return if no code provided
        if (!code) {
            setLoading(false);
            setError("No gift card code provided");
            return;
        }

        const fetchGiftCardByCode = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error state

                // Fetch all gift cards and filter by code
                const res = await axios.get(
                    `${BASE_SERVER_URL}/web/get/gift-cards`
                );

                if (res.data.success) {
                    const cards = res.data.result || [];
                    const foundCard = cards.find(card => card.code === code);
                    
                    if (foundCard) {
                        setGiftCard(foundCard);
                        setError(null);
                    } else {
                        setError("Gift card not found");
                        setGiftCard(null);
                    }
                } else {
                    setError(res.data.message || "Failed to load gift card");
                    setGiftCard(null);
                }
            } catch (err) {
                setError(
                    err?.response?.data?.message || "Failed to fetch gift card"
                );
                setGiftCard(null);
            } finally {
                setLoading(false);
            }
        };

        fetchGiftCardByCode();
    }, [code]); // Only re-run when code changes

    return { giftCard, loading, error };
};

export const filterGiftCardsByStatus = (giftCards, status) => {
    return giftCards.filter(card => card.status === status);
};


export const isGiftCardExpired = (giftCard) => {
    if (!giftCard.expiry_date) return false;
    return new Date(giftCard.expiry_date) < new Date();
};


export const formatGiftCardAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};