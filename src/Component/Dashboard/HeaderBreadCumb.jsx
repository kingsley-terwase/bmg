import { Box, Typography } from "@mui/material";
import { dbColors } from "../../Config/color";

export const HeaderBreadCrumb = ({
  label = "Overview",
  desc,
  color = dbColors.main.default
}) => {
  return (
    <Box sx={{ mt: 2, mb: 5, width: "900px" }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 35
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          mb: 2,
          width: 70,
          borderRadius: 6,
          borderBottom: 7,
          borderBottomWidth: 4,
          borderBottomColor: color
        }}
      />
      <Typography
        sx={{ fontWeight: 600, fontSize: 13, fontFamily: "Comfortaa", color: "#2d2b2bff" }}
      >
        {desc}
      </Typography>
    </Box>
  );
};

export default HeaderBreadCrumb;
