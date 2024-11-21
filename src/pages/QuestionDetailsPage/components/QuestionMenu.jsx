import React, { useState } from "react";
import { Box, Menu, MenuItem, IconButton, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ReportIcon from "@mui/icons-material/Report";
import LoginIcon from "@mui/icons-material/Login";
import { useUser } from "../../../contexts/UserProvider";
import GuestPromptModal from "../../../components/GuestPromptModal";

const QuestionMenu = ({ authorId, onEdit, onDelete, onBookmark, onReport }) => {
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    console.log('event - ', event);
    if(!user){
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
    if (user && user.userId === authorId) {
      // Author's menu
      return [
        <MenuItem key="edit-post" onClick={onEdit}>
          <EditIcon sx={{ marginRight: "0.5rem" }} />
          Edit Post
        </MenuItem>,
        <MenuItem key="delete-post" onClick={onDelete}>
          <DeleteIcon sx={{ marginRight: "0.5rem" }} />
          Delete Post
        </MenuItem>,
      ];
    } else if(user) {
      // Logged-in user menu
      return [
        <MenuItem key="bookmark" onClick={onBookmark}>
          <BookmarkIcon sx={{ marginRight: "0.5rem" }} />
          Bookmark Question
        </MenuItem>,
        <MenuItem key="report" onClick={onReport}>
          <ReportIcon sx={{ marginRight: "0.5rem" }} />
          Report Question
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
        onClick={handleMenuOpen}
        sx={{
          color: "gray.light",
          "&:hover": {
            color: "primary.main",
          },

        }}
      >
        <MoreVertIcon sx={{ fontSize: "1.25rem" }}/>
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
                backgroundColor: "primary.light",
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

export default QuestionMenu;
