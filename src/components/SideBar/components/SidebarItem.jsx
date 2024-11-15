import React from "react";
import { ListItemButton, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTheme } from "@emotion/react";

const SidebarItem = ({ label, to}) => {
  const theme = useTheme();

  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
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
              color: theme.palette.common.white, // Hover text color
              "& .MuiListItemText-root": {
                color: theme.palette.common.white, // Apply color to ListItemText on hover
              },
            },
          }}
        >
          <ListItemText
            primary={label}
            sx={{
              fontWeight: isActive ? "bold" : "normal", // Set font weight for active/inactive
              color: isActive ? theme.palette.common.white : theme.palette.gray.dark, // Default color
              transition: "color 0.5s", // Smooth transition for color change
            }}
          />
        </ListItemButton>
      )}
    </NavLink>
  );
};

export default SidebarItem;
