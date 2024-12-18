import React, { useState } from "react";
import { Box, Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ReportIcon from "@mui/icons-material/Report";
import { useUser } from "../../../contexts/UserProvider";
import GuestPromptModal from "../../../components/GuestPromptModal";

const ContentMenu = ({
  authorId,
  onEdit,
  onDelete,
  editText,
  deleteText,
  onBookmark,
  onReport,
  bookmarkText,
  reportText,
  disabled = false,
}) => {
  const { user } = useUser();
  const userId = sessionStorage.getItem("userId");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    if (disabled) return;

    if (!user) {
      setIsGuestModalOpen(true);
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleGuestModalClose = () => {
    setIsGuestModalOpen(false);
  };

  // Determine menu options based on the user's context
  const renderMenuOptions = () => {
    if (user && userId == authorId) {
      // Author's menu
      return [
        <MenuItem key="edit-post" onClick={onEdit}>
          <EditIcon
            sx={{
              marginRight: "0.5rem",
            }}
          />
          {editText}
        </MenuItem>,
        <MenuItem key="delete-post" onClick={onDelete}>
          <DeleteIcon sx={{ marginRight: "0.5rem" }} />
          {deleteText}
        </MenuItem>,
      ];
    } else if (user) {
      // Logged-in user menu
      return [
        <MenuItem key="bookmark" onClick={onBookmark}>
          <BookmarkIcon sx={{ marginRight: "0.5rem" }} />
          {bookmarkText}
        </MenuItem>,
        <MenuItem key="report" onClick={onReport}>
          <ReportIcon sx={{ marginRight: "0.5rem" }} />
          {reportText}
        </MenuItem>,
      ];
    }

    return null;
  };

  return (
    <Box>
      {/* Three-dot icon button */}
      <IconButton
        aria-label="options"
        onClick={disabled? null: handleMenuOpen}
        sx={{
          color: disabled ? "gray.main" : "gray.light", // Apply correct color based on disabled state
          "&:hover": {
            color: disabled ? "gray.main" : "primary.main", // Prevent hover effect when disabled
          },
          padding: 0,
          cursor: disabled ? "not-allowed" : "pointer", // Explicitly set cursor style
        }}
      >
        <MoreVertIcon sx={{ fontSize: "1.25rem" }} />
      </IconButton>
      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          elevation: 4,
          sx: {
            borderRadius: "8px",
            padding: "0.5rem 0",
            minWidth: "200px",
            "& .MuiMenuItem-root": {
              fontSize: "0.875rem",
              padding: "0.75rem 1rem",
              "&:hover": {
                color: "primary.main",
              },
            },
          },
        }}
      >
        {renderMenuOptions()}
      </Menu>
      <GuestPromptModal
        open={isGuestModalOpen}
        onClose={handleGuestModalClose}
        headingText="Oops! You Need an Account to Interact"
        subheadingText="Sign up or log in to bookmark, report, or interact with the community."
      />
    </Box>
  );
};

export default ContentMenu;
