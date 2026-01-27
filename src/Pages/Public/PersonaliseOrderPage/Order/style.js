import { FONT_FAMILY } from "../../../../Config/font";

const styles = {
  padding: "80px 0",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  "& .order-card": {
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "none !important",
  },
  "& .header": {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    "& .title": {
      fontSize: "20px",
      fontFamily: FONT_FAMILY.tertiary,
      fontWeight: 900,
      textAlign: "center",
    },
    "& .description": {
      fontSize: "16px",
      color: "rgb(125, 150, 150)",
      fontFamily: FONT_FAMILY.tertiary,
      textAlign: "center",
      width: "70ch",
      mx: "auto",
      letterSpacing: "1px",
    },
  },
  "& .content": {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
};

export const buttonStyles = {
  px: "1.5rem",
  py: "1rem",
  fontWeight: 700,
  borderRadius: "1rem",
  fontSize: "1rem",
  transition: "all 0.3s ease",
};

export default styles;
