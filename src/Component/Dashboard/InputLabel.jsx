import React from "react";
import { Typography } from "@mui/material";

const InputLabel = ({ text = "", size = "14px", color = "#363853" }) => {
  return (
    <Typography
      fontSize={size}
      fontFamily="Comfortaa"
      fontWeight={600}
      color={color}
    >
      {text}
    </Typography>
  );
};
export default InputLabel;
