// src/components/Sidebar/SidebarItem.jsx
import React from "react";
import { ListItemButton, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ label, to}) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <ListItemButton
          sx={{
            padding: "0.5rem 0.5rem",
            marginRight: "0.5rem",
            backgroundColor: isActive ? "yellow" : "transparent",
            color: isActive ? "white" : "inherit",
            borderBottom: "1px solid",
            borderColor: "gray.darker",
            "&:hover": {
              backgroundColor: "red",
              color: "white",
            },
          }}
        >
          <ListItemText
            primary={label}
            sx={{
              fontWeight: isActive ? "bold" : "normal",
              color: isActive ? "white" : "inherit",
            }}
          />
        </ListItemButton>
      )}
    </NavLink>
  );
};

export default SidebarItem;
