import React from "react";
import { Typography } from "@mui/material";

const InputLabel = ({ text = "" }) => {
  return (
    <Typography
      fontSize="14px"
      fontFamily="Comfortaa"
      fontWeight={600}
      color="#363853"
      mb={1}
    >
      {text}
    </Typography>
  );
};
export default InputLabel;
