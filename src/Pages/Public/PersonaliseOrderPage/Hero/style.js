import { FONT_FAMILY } from "../../../../Config/font";

const styles = {
  padding: "60px 0",
  minHeight: "40vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  "& .title": {
    fontFamily: FONT_FAMILY.tertiary,
    fontSize: "20px",
    textAlign: "center",
    fontWeight: 900,
    lineHeight: 1,
  },
  "& .service": {
    fontSize: "32px",
    textAlign: "center",
    fontWeight: 900,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontFamily: FONT_FAMILY.tertiary,
  },
  "& .description": {
    fontSize: "16px",
    fontFamily: FONT_FAMILY.tertiary,
    letterSpacing: "2px",
    color: "rgb(125, 150, 150)",
    textAlign: "center",
  },
};

export default styles;
