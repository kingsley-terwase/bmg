import React from "react";
import { styled } from "@mui/material";

const COLORS = {
  primary: {
    filled: { bg: "#7DBBFF", border: "#28C3FF", color: "#fff" },
    outlined: { bg: "#28C3FF29", border: "#28C3FF", color: "#28C3FF" }
  },
  success: {
    filled: { bg: "#2FC269", border: "#2FC269", color: "#FFFFFF" },
    outlined: { bg: "#CDFFD3", border: "#2FC269", color: "#2FC269" }
  },
  danger: {
    filled: { bg: "#E43F51", border: "#E43F51", color: "#fff" },
    outlined: { bg: "#FFC0C0", border: "#E43F51", color: "#E43F51" }
  },
  warning: {
    filled: { bg: "#FFD18B", border: "#FFD18B", color: "#000" }
  },
  sky: {
    outlined: { bg: "#B3E8FF", border: "#28C3FF", color: "#28C3FF" }
  },
  pure: {
    filled: { bg: "#F1F4F9", border: "#F1F4F9", color: "#000" }
  }
};

const StyledButton = styled("button")(
  ({ colorMode, variant, radius, fullWidth, boxShadow, disabled }) => {
    const styles = COLORS[colorMode]?.[variant] || {};

    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      padding: "7px 10px",
      borderRadius: radius || "7px",
      fontSize: "15px",
      fontFamily: "Comfortaa",
      fontWeight: 700,
      border: `1px solid ${styles.border || "transparent"}`,
      backgroundColor: styles.bg || "transparent",
      color: styles.color || "#000",
      width: fullWidth ? "100%" : "fit-content",
      boxShadow: boxShadow || "0px 2px 8px rgba(0,0,0,0.1)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.55 : 1,
      pointerEvents: disabled ? "none" : "auto",
      transition: "0.25s ease-in-out",
      "&:hover": disabled
        ? {}
        : {
            opacity: 0.85,
            transform: "scale(0.98)"
          }
    };
  }
);

const CustomButton = ({
  title,
  children,
  color = "primary",
  variant = "filled",
  radius,
  fullWidth = false,
  startIcon,
  endIcon,
  boxShadow,
  sx,

  loading = false,
  disabled = false,

  ...rest
}) => {
  const isDisabled = disabled || loading;

  return (
    <StyledButton
      colorMode={color}
      variant={variant}
      radius={radius}
      fullWidth={fullWidth}
      boxShadow={boxShadow}
      disabled={isDisabled}
      style={sx}
      {...rest}
    >
      {startIcon && <span style={{ display: "flex" }}>{startIcon}</span>}

      {loading ? "Loading..." : children || title}

      {endIcon && !loading && (
        <span style={{ display: "flex" }}>{endIcon}</span>
      )}
    </StyledButton>
  );
};

export default CustomButton;
