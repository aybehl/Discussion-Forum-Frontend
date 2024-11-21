import React from "react";
import { ListItemButton, ListItemText } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "@emotion/react";

const SidebarItem = ({ label, to, exact }) => {
  const theme = useTheme();
  const location = useLocation();
  
  // Ensure the active state only applies when the route matches exactly
  const isActive = exact
    ? location.pathname === to
    : location.pathname.startsWith(to);

  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      <ListItemButton
        sx={{
          padding: "0.5rem 0.5rem",
          marginRight: "0.5rem",
          marginBottom: "0.5rem",
          background: isActive
            ? `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`
            : "transparent",
          borderRadius: "0.5rem",
          "&:hover": {
            background: `linear-gradient(135deg, ${theme.palette.common.black} 30%, ${theme.palette.gray.darkest} 90%)`,
            color: theme.palette.common.white,
            "& .MuiListItemText-root": {
              color: theme.palette.common.white,
            },
          },
        }}
      >
        <ListItemText
          primary={label}
          sx={{
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? theme.palette.common.white : theme.palette.gray.dark,
            transition: "color 0.5s",
          }}
        />
      </ListItemButton>
    </NavLink>
  );
};

export default SidebarItem;
