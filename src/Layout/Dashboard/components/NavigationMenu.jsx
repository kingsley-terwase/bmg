import React, { useState } from "react";
import { Box } from "@mui/material";
import { getNav } from "../data";
import { ActiveLink, InActiveLink } from "./customLink";
import { dbColors } from "../../../Config/color";

function NavigationMenu({ role }) {
  const currentPath = window.location.pathname;
  const [openItemIndex, setOpenItemIndex] = useState(null);

  // Pass null for user and subRole since we're not tracking auth
  const nav = getNav(role, null, null);

  const toggleItem = (index) => {
    setOpenItemIndex(index === openItemIndex ? null : index);
  };

  return (
    <Box>
      {nav.map((cell, i) => (
        <Box key={i}>
          <ActiveLink
            onClick={() => toggleItem(i)}
            to={cell.path}
            isactive={cell.path == currentPath}
          >
            <Box
              component="span"
              sx={{
                color: openItemIndex == i
                  ? dbColors.main.primary
                  : dbColors.main.default
              }}
            >
              {cell.icon}
            </Box>
            {cell.label}
          </ActiveLink>
          {openItemIndex === i && cell.children && cell.children.length > 0 && (
            <Box pl={2} mt={1}>
              {cell.children.map((child, i) => (
                <InActiveLink
                  key={i}
                  to={child.path}
                  isactive={child.path == currentPath}
                  data-aos="fade-up"
                  data-aos-delay={`${(i + 1) * 100}`}
                >
                  {child.label}
                </InActiveLink>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default NavigationMenu;
