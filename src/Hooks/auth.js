import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_SERVER_URL } from "../Config/paths";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { showToast } from "../utils/toast";
import { useUserContext } from "../Contexts";

function useRegister() {
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/auth/create-user`,
        data
      );
      const result = response.data;
      if (result?.code === 0) {
        showToast.success(result.message);
        return true;
      }

      if (result?.code) {
        toast.error(result?.message);
        return false;
      }
    } catch (error) {
      console.error("Error:", error.response);
      if (error.response.data?.code) {
        showToast.error(error.response.data.message);
      } else {
        showToast.error("An error occurred while registering user.");
      }
      return false;
    }
  };
}

const useVerifyRegisteration = () => {
  const navigate = useNavigate();

  const verifyEmailOtp = async ({ email, otp, otp_type }) => {
    try {
      console.log("Verifying OTP for:", { email, otp, otp_type });
      const { data } = await axios.post(`${BASE_SERVER_URL}/auth/verify-user`, {
        email,
        otp,
        otp_type
      });

      if (data?.error !== 0) {
        showToast.success(data?.message || "Verification failed");
        return navigate("/login");
      }

      showToast.success("Account verified successfully");
      navigate("/login");

      return true;
    } catch (err) {
      showToast.error(err?.response?.data?.message || "Verification failed");
      return false;
    }
  };

  return { verifyEmailOtp };
};

function useResendEmailVerificationOtp() {
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/auth/user/resend/email/otp`,
        data
      );
      const result = response.data;
      if (result?.error === 0) {
        toast.success(result.message);
      }
      if (result?.error) {
        toast.error(result?.message);
      }
      return result;
    } catch (error) {
      console.error("Error:", error.response.data);
      if (error.response.data?.error) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while resending otp.");
      }
      return false;
    }
  };
}

function useLogin() {
  return async (data) => {
    console.log("Login data:", data);
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/auth/login-user`,
        data
      );
      const result = response.data;

      console.log("Login result:", result);

      if (result?.error === 0) {
        showToast.success(result.message);
        return true;
      }

      if (result?.error) {
        return result;
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      if (error.response.data?.code !== 0) {
        showToast.error(error.response.data.message);
      } else {
        showToast.error("An error occurred while login user.");
      }
      return false;
    }
  };
}

const useVerifyLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verifyLogin = async ({ otp, email, otp_type }) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/auth/verify-login`,
        { otp, email, otp_type }
      );

      const result = response?.data;
      console.log("Login data:", result);

      if (!result || result?.code !== 0) {
        showToast.error("Invalid response from server");
        return { success: false };
      }

      if (result?.code === 0) {
        showToast.success(result.message);

        dispatch(setUser(result.result));
        const user = result.result?.user;

        if (user?.role === 1 || user?.role === 2) {
          navigate("/dashboard");
        } else if (user?.role === 3) {
          navigate("/dashboard/user/overview");
        } else {
          navigate("/dashboard/expert/overview");
        }

        return { success: true, data: result.result };
      }

      showToast.error(result?.message || "Login failed");
      return { success: false };
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "An error occurred while verifying login";

      console.error("Verify login error:", error);
      showToast.error(message);

      return { success: false };
    }
  };

  return { verifyLogin };
};

const useVerifyForgotPwdOtp = () => {
  const verifyOtp = async ({ email, otp, otp_type }) => {
    try {
      const { data } = await axios.post("/auth/", {
        email,
        otp,
        otp_type
      });

      if (data?.error !== 0) {
        showToast.error(data?.message || "Invalid OTP");
        return false;
      }

      showToast.success("OTP verified");
      return true;
    } catch (err) {
      showToast.error(
        err?.response?.data?.message || "OTP verification failed"
      );
      return false;
    }
  };

  return { verifyOtp };
};

const useResendOTP = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resendOTP = async (otp_type, email) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_SERVER_URL}/auth/resend-otp`, {
        otp_type,
        email
      });

      const result = response.data;
      console.log("data:", result);

      if (response.status === 200) {
        showToast.success(result.message || "OTP resent successfuly!");
      }
    } catch (err) {
      const errMsg =
        err.response?.data?.message || err.message || "Network or server error";
      setError(errMsg);
      showToast.error(errMsg);
      console.error("Error Response:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return { resendOTP, loading, error };
};

function useLogout() {
  const { config } = useUserContext();

  return async () => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/auth/logout-user`,
        {},
        config
      );

      const result = response?.data;
      console.log("Logout Response:", result);

      if (result.code === 0) {
        return true;
      }
      return false;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Logout failed, please try again.";

      console.error("Logout error:", errorMessage);
      showToast.error(errorMessage);

      return false;
    }
  };
}

export {
  useRegister,
  useLogin,
  useVerifyLogin,
  useVerifyRegisteration,
  useResendEmailVerificationOtp,
  useVerifyForgotPwdOtp,
  useResendOTP,
  useLogout
};
