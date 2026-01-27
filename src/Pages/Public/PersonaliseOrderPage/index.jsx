import { Typography, Box } from "@mui/material";
import Hero from "./Hero";
import Order from "./Order";

export default function PersonaliseOrderPage() {
  return (
    <Box paddingTop="70px">
      <Hero />
      <Order />
    </Box>
  );
}
