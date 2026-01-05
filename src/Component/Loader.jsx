import React from "react";
import { Box } from "@mui/material";
import { DotLoader } from "react-spinners";
import { useLoader } from "../Contexts/LoaderContext";

const GlobalLoader = () => {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(226, 237, 246, 0.75)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <DotLoader color="#2C3891" size={60} loading={loading} />
    </Box>
  );
};

export default GlobalLoader;
