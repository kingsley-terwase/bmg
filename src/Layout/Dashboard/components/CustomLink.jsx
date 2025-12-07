import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import { dbColors } from "../../../Config/color";

const ActiveLink = styled(Link)(({ isactive }) => ({
  fontFamily: "Jost",
  color: "#000000",
  display: "flex",
  alignItems: "center",
  fontSize: "14px",
  fontWeight: 500,
  gap: 7,
  textDecoration: "none",
  borderRadius: "6px",
  padding: "7px 10px",
  margin: "5px 0px",
  transition:
    "colors 0.5s ease-in-out, background-color 0.5s ease-in-out, font-size 0.5s ease-in-out, padding 0.5s ease-in-out",
  "&:hover": {
    color: "#000000",
    fontSize: "14px",
    backgroundColor: dbColors.main.gray,
    padding: "5px 7px"
  },
  ...(isactive == 1 && {
    color: dbColors.main.text,
    fontSize: "14px",
    backgroundColor: dbColors.main.default,
    padding: "5px 7px"
  })
}));

const InActiveLink = styled(Link)(({ isactive }) => ({
  fontFamily: "comfortaa",
  color: "#050505",
  display: "flex",
  alignItems: "center",
  fontSize: "12px",
  textDecoration: "none",
  borderRadius: "7px",
  padding: "7px 10px",
    margin: "5px 0px",
  fontWeight: 700,
  transition: "colors 0.5s ease-in-out, background-color 0.5s ease-in-out",
  "&:hover": {
    color: "#2e2e2eff",
    fontSize: "12px",
    backgroundColor: dbColors.main.gray
  },
    ...(isactive == 1 && {
    color: dbColors.main.text,
    fontSize: "12px",
    backgroundColor: dbColors.main.default,
    padding: "7px 7px"
  })

}));

export { ActiveLink, InActiveLink };
