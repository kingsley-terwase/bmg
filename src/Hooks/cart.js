import { useState } from "react";
import axios from "axios";
import { BASE_SERVER_URL } from "../Config/paths";
import { useUserContext } from "../Contexts";

/**
 * Custom hook for handling checkout process
 * @returns {Object} Checkout state and handler functions
 */
const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const { config } = useUserContext();

  /**
   * Validates cart items before submission
   * @param {Array} cartItems - Cart items to validate
   * @returns {Object} Validation result with errors array
   */
  const validateCartItems = (cartItems) => {
    const errors = [];

    // Check if cart is empty
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      errors.push("Cart is empty. Please add items before checkout.");
      return { isValid: false, errors };
    }

    // Validate each cart item
    cartItems.forEach((item, index) => {
      // Required fields validation
      if (!item.id) {
        errors.push(`Item ${index + 1}: Missing item ID`);
      }
      if (!item.service_id) {
        errors.push(`Item ${index + 1}: Missing service ID`);
      }
      if (!item.service_type_id) {
        errors.push(`Item ${index + 1}: Missing service type ID`);
      }
      if (!item.name || item.name.trim() === "") {
        errors.push(`Item ${index + 1}: Missing service name`);
      }
      if (!item.service_type_name || item.service_type_name.trim() === "") {
        errors.push(`Item ${index + 1}: Missing service type name`);
      }

      // Price validation
      if (typeof item.originalPrice !== "number" || item.originalPrice < 0) {
        errors.push(`Item ${index + 1} (${item.name}): Invalid original price`);
      }
      if (typeof item.finalPrice !== "number" || item.finalPrice < 0) {
        errors.push(`Item ${index + 1} (${item.name}): Invalid final price`);
      }
      if (typeof item.discountAmount !== "number" || item.discountAmount < 0) {
        errors.push(
          `Item ${index + 1} (${item.name}): Invalid discount amount`,
        );
      }

      // Quantity validation
      if (
        !item.quantity ||
        typeof item.quantity !== "number" ||
        item.quantity < 1
      ) {
        errors.push(
          `Item ${index + 1} (${item.name}): Invalid quantity (must be at least 1)`,
        );
      }

      // Requirements validation
      if (!item.requirements || typeof item.requirements !== "object") {
        errors.push(
          `Item ${index + 1} (${item.name}): Missing or invalid requirements`,
        );
      }

      // Service data validation
      if (!item.service_data || typeof item.service_data !== "object") {
        errors.push(`Item ${index + 1} (${item.name}): Missing service data`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  /**
   * Initiates the checkout process
   * @param {Array} cartItems - Cart items to checkout
   * @param {string} couponCode - Optional coupon code
   * @param {string} giftCardCode - Optional gift card code
   * @returns {Promise<Object>} Order and payment link data
   */
  const initiateCheckout = async (
    cartItems,
    couponCode = "",
    giftCardCode = "",
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setValidationErrors([]);

    try {
      // Validate cart items
      const validation = validateCartItems(cartItems);
      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        setError(validation.errors[0]); // Set first error as main error
        setLoading(false);
        return {
          success: false,
          error: validation.errors[0],
          validationErrors: validation.errors,
        };
      }

      // Prepare the request payload
      const payload = {
        cart_items: cartItems,
      };

      if (couponCode && couponCode.trim()) {
        payload.coupon_code = couponCode.trim();
      }

      if (giftCardCode && giftCardCode.trim()) {
        payload.gift_card_code = giftCardCode.trim();
      }

      // Make the API request
      const response = await axios.post(
        `${BASE_SERVER_URL}/user/initiate/checkout`,
        payload,
        config,
      );

      // Check if the response indicates success
      if (response.data.success) {
        setSuccess(true);

        const { order, payment_link } = response.data.result;

        // Redirect to payment link if available
        if (payment_link) {
          window.location.href = payment_link;
        }

        return {
          success: true,
          order,
          payment_link,
          message: response.data.message || "Checkout initiated successfully",
        };
      } else {
        // Handle backend errors based on error codes
        const errorMessage = getErrorMessage(
          response.data.code,
          response.data.message,
        );
        setError(errorMessage);

        return {
          success: false,
          error: errorMessage,
          code: response.data.code,
        };
      }
    } catch (err) {
      // Handle network or other errors
      let errorMessage = "An error occurred during checkout. Please try again.";

      if (err.response) {
        // Server responded with an error
        errorMessage = err.response.data?.message || errorMessage;

        if (err.response.status === 401) {
          errorMessage = "Please log in to continue with checkout.";
        } else if (err.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (err.request) {
        // Request made but no response
        errorMessage = "Network error. Please check your connection.";
      }

      setError(errorMessage);

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Maps error codes to user-friendly messages
   * @param {number} code - Error code from backend
   * @param {string} defaultMessage - Default message from backend
   * @returns {string} User-friendly error message
   */
  const getErrorMessage = (code, defaultMessage) => {
    const errorMessages = {
      1: "Your cart is empty. Please add items before checkout.",
      2: "An error occurred. Please try again.",
      3: "The coupon code you entered is invalid or has expired.",
      4: "The gift card code you entered is invalid or inactive.",
      5: "Failed to initialize payment. Please try again.",
      6: "An error occurred during checkout. Please try again.",
    };

    return (
      errorMessages[code] || defaultMessage || "An unexpected error occurred."
    );
  };

  /**
   * Resets the checkout state
   */
  const resetCheckout = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    setValidationErrors([]);
  };

  return {
    loading,
    error,
    success,
    validationErrors,
    initiateCheckout,
    resetCheckout,
  };
};

export default useCheckout;
