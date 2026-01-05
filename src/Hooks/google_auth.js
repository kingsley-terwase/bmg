import axios from "axios";
import { showToast } from "../utils/toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/slices/userSlice";
import { useLoader } from "../Contexts/LoaderContext";

/**
 * Google Register Hook
 * Sends ONLY google_access_token to backend
 */
const useGoogleAuthRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showLoader, hideLoader } = useLoader();

  return async (googleAccessToken) => {
    try {
      showLoader();
      if (!googleAccessToken) {
        throw new Error("Google access token is required");
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/google/user-registration`,
        {
          google_access_token: googleAccessToken
        }
      );

      const result = response.data;
      console.log(response);

      if (result?.code && result.code !== 0) {
        showToast.error(result.message || "Google authentication failed");
        return false;
      }

      if (result?.code === 0) {
        showToast.success(result.message || "Signed in with Google");
        dispatch(setUser(result.result));
        const user = result.result.user;
        if (user?.role == 1 || user?.role == 2) {
          return navigate("/dashboard");
        } else {
          return navigate("/dashboard/user/overview");
        }
      }

      showToast.success();
      return true;
    } catch (error) {
      console.error("Google Auth Error:", error);

      const message =
        error?.response?.data?.message ||
        error.message ||
        "Google authentication failed";

      showToast.error(message);
      return false;
    } finally {
      hideLoader();
    }
  };
};

/**
 * Google Login Hook
 * Sends ONLY google_access_token to backend
 */
const useGoogleAuthLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showLoader, hideLoader } = useLoader();

  return async (googleAccessToken) => {
    try {
      showLoader();
      if (!googleAccessToken) {
        throw new Error("Google access token is required");
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/google/login-user`,
        {
          google_access_token: googleAccessToken
        }
      );

      const result = response.data;
      console.log(response);

      if (result?.code && result.code !== 0) {
        showToast.error(result.message || "Google authentication failed");
        return false;
      }

      console.log("Google login result:", result);

      if (result?.code === 0) {
        showToast.success(result.message || "Signed in with Google");
        dispatch(setUser(result.result));
        const user = result.result.user;
        if (user?.role == 1 || user?.role == 2) {
          return navigate("/dashboard");
        } else {
          return navigate("/dashboard/user/overview");
        }
      }

      showToast.success();
      return true;
    } catch (error) {
      console.error("Google Auth Error:", error);

      const message =
        error?.response?.data?.message ||
        error.message ||
        "Google authentication failed";

      showToast.error(message);
      return false;
    } finally {
      hideLoader();
    }
  };
};

export { useGoogleAuthRegister, useGoogleAuthLogin };
