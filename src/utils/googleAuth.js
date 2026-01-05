import { BASE_SERVER_URL } from "../Config/paths";
/**
 * Google OAuth Configuration
 * Get your Client ID from: https://console.cloud.google.com/
 */

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

/**
 * Initialize Google Sign-In
 * Call this in your App.jsx or index.jsx
 */
export const initializeGoogleAuth = () => {
  return new Promise((resolve, reject) => {
    // Check if script already loaded
    if (window.google && window.google.accounts) {
      resolve(window.google);
      return;
    }

    // Load Google Sign-In script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google && window.google.accounts) {
        resolve(window.google);
      } else {
        reject(new Error("Google Sign-In failed to load"));
      }
    };
    script.onerror = () =>
      reject(new Error("Failed to load Google Sign-In script"));
    document.head.appendChild(script);
  });
};

/**
 * Handle Google Sign-In with Popup
 * Returns ONLY the google access token
 */
export const signInWithGooglePopup = async () => {
  await initializeGoogleAuth();

  return new Promise((resolve, reject) => {
    try {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: "email profile",
        callback: (response) => {
          if (response?.access_token) {
            resolve(response.access_token);
          } else {
            reject(new Error("Failed to obtain Google access token"));
          }
        },
        error_callback: (error) => {
          console.error("Google Popup Sign-Up Error:", error);
          reject(error);
        }
      });

      client.requestAccessToken();
    } catch (error) {
      console.error("Google Popup Sign-Up Error:", error);
      reject(error);
    }
  });
};

/**
 * Handle Google Sign-In with One-Tap
 * @param {Function} onSuccess - Callback for successful sign-in
 * @param {Function} onError - Callback for errors
 */
export const signInWithGoogleOneTap = async (onSuccess, onError) => {
  try {
    await initializeGoogleAuth();

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async (response) => {
        try {
          // Decode JWT token to get user info
          const userObject = parseJwt(response.credential);

          onSuccess({
            credential: response.credential,
            user: {
              email: userObject.email,
              firstName: userObject.given_name,
              lastName: userObject.family_name,
              fullName: userObject.name,
              picture: userObject.picture,
              googleId: userObject.sub
            }
          });
        } catch (error) {
          onError(error);
        }
      },
      auto_select: false,
      cancel_on_tap_outside: true
    });

    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        console.log(
          "One-Tap not displayed:",
          notification.getNotDisplayedReason()
        );
      }
    });
  } catch (error) {
    onError(error);
  }
};

/**
 * Parse JWT token
 */
const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid token:", error);
    throw new Error("Invalid token");
  }
};

/**
 * Sign out from Google
 */
export const signOutFromGoogle = () => {
  if (window.google && window.google.accounts && window.google.accounts.id) {
    window.google.accounts.id.disableAutoSelect();
  }
};

/**
 * Send Google auth data to your backend
 * @param {Object} googleData - Data received from Google
 * @param {String} type - 'registration' or 'login'
 */
export const sendGoogleAuthToBackend = async (data, type = "login") => {
  const response = await fetch(`${BASE_SERVER_URL}/auth/google/user-${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Google authentication failed");
  }

  return response.json();
};

export default {
  initializeGoogleAuth,
  signInWithGooglePopup,
  signInWithGoogleOneTap,
  signOutFromGoogle,
  sendGoogleAuthToBackend
};
