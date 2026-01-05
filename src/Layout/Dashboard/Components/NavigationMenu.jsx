import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { ActiveLink, InActiveLink } from "./CustomLink";
import { dbColors } from "../../../Config/color";
import { EmojiIcon } from "../../../Component";
import { useUserContext } from "../../../Contexts";
import { useNavigate } from "react-router-dom";
import { getNav } from "../../../utils/getNav";

function NavigationMenu() {
  const currentPath = window.location.pathname;
  const [openItemIndex, setOpenItemIndex] = useState(null);
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const navItems = getNav(user?.user);
  const toggleItem = (index) => {
    setOpenItemIndex(index === openItemIndex ? null : index);
  };

  return (
    <Box>
      {navItems.map((cell, i) => (
        <Box key={i}>
          <ActiveLink
            onClick={() => toggleItem(i)}
            to={cell.path}
            isactive={cell.path == currentPath}
          >
            <EmojiIcon
              name={cell.icon}
              styles={{
                color:
                  openItemIndex == i
                    ? dbColors.main.primary
                    : dbColors.main.default
              }}
            />
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
                  data-aos-once="true"
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
