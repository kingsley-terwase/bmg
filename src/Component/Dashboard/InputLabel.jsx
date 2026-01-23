import React from "react";
import { Typography } from "@mui/material";

const InputLabel = ({ text = "", size = "14px" }) => {
  return (
    <Typography
      fontSize={size}
      fontFamily="Comfortaa"
      fontWeight={600}
      color="#363853"
    >
      {text}
    </Typography>
  );
};
export default InputLabel;
