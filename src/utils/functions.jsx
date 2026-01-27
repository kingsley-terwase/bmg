const validateEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return false;
  } else {
    return true;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "-";

  const date = new Date(dateString);

  const datePart = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${datePart} | ${timePart.toLowerCase()}`;
};

// Decode the hashed service ID
const decodeServiceId = (hash) => {
  try {
    if (!hash) return null;

    // URL decode first (handles URL-encoded base64)
    let decodedHash = decodeURIComponent(hash);

    // Replace URL-safe base64 characters if used
    decodedHash = decodedHash.replace(/-/g, "+").replace(/_/g, "/");

    // Decode base64
    const decoded = atob(decodedHash);

    // Extract service ID from format: service_{id}_{timestamp}
    const match = decoded.match(/service_(\d+)_/);
    return match ? match[1] : null;
  } catch (err) {
    console.error("Failed to decode service ID:", err);
    console.error("Hash received:", hash);
  }
};

const fileToBase64 = (file) => {
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const urlToBase64 = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const contentType = response.headers.get("content-type");

    if (!contentType?.startsWith("image/")) {
      throw new Error(`Invalid content-type: ${contentType}`);
    }

    const blob = await response.blob();

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("urlToBase64 failed:", error.message);
    return null;
  }
};

const encodeServiceId = (id) => {
  try {
    // Create the hash string
    const hashString = `service_${id}_${Date.now() % 10000}`;

    // Base64 encode
    let encoded = btoa(hashString);

    // Make URL-safe by replacing characters
    encoded = encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");

    return encoded;
  } catch (err) {
    console.error("Failed to encode service ID:", err);
    return id; // Fallback to plain ID
  }
};

// Resolve AWS image URLs
const resolveAwsImage = (image) => {
  if (!image) return null;
  if (image.startsWith("http")) return image;
  return `${import.meta.env.VITE_AWS_BUCKET_URL}/${image}`;
};

const truncateText = (text = "", maxLength = 80) => {
  if (!text) return "-";
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
};

const getTimeGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
};

const getFormattedDate = () => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const stripHtml = (html = "") => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const formatGHS = (amount) => {
  return `GHS ${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export {
  validateEmail,
  validatePassword,
  formatDate,
  fileToBase64,
  urlToBase64,
  truncateText,
  getTimeGreeting,
  getFormattedDate,
  stripHtml,
  decodeServiceId,
  resolveAwsImage,
  encodeServiceId,
  formatGHS,
};
