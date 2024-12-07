import { Box, Typography, Avatar, CircularProgress } from "@mui/material";
import { useUser } from "../contexts/UserProvider";
import { Link, useNavigate } from "react-router-dom";
import GuestPromptModal from "./GuestPromptModal";
import { useState } from "react";

const Header = ({ variant = "default" }) => {
  const { user, loading, logout } = useUser();
  const isGuest = !user || !user.userName;
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleGuestModalClose = () => {
    setIsGuestModalOpen(false);
  };

  const handleAvatarClick = (event) => {
    if (isGuest) {
      event.preventDefault(); // Prevent navigation
      setIsGuestModalOpen(true); // Open the modal
    } else {
      navigate("/edit-profile"); // Navigate to Edit Profile page
    }
  };

  const handleLogoClick = () => {
    navigate("/questions"); // Navigate to the homepage
  };

  if (loading) {
    // Show a loader while fetching user profile
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "4rem", // Header height
          borderBottom: "1px solid gray",
        }}
      >
        <CircularProgress size={24} />
      </Box>
    );
  }

  const avatarContent = isGuest
    ? { children: "G" }
    : user.profilePic
    ? { src: user.profilePic }
    : { children: user.userName?.charAt(0).toUpperCase() };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 2,
        mx: 8,
        borderBottom: "1px solid",
        borderColor: "gray.darker",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={handleLogoClick}
      >
        <img
          src="/logo.svg"
          alt="Fit.Connect Logo"
          style={{ marginRight: 8 }}
        />
        <Typography variant="h6" component="span">
          Fit.Connect
        </Typography>
      </Box>
      {variant !== "landing" && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
            }}
            onClick={handleAvatarClick}
          >
            <Avatar
              {...avatarContent}
              alt="User Avatar"
              sx={{
                width: 50,
                height: 50,
                backgroundColor: isGuest
                  ? "gray.main" // Background color for guest
                  : !user.profilePic
                  ? "primary.main" // Background color if profile picture doesn't exist
                  : "transparent", // No background color for existing profile picture
                color: isGuest || !user.profilePic ? "common.white" : "inherit", // Text color for guest or no profile picture
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: "common.white",
                textDecoration: "none",
              }}
            >
              {isGuest ? "Guest User" : `@${user.userName}`}
            </Typography>
          </Box>
        </Box>
      )}
      {/* Modal for Guest Users */}
      <GuestPromptModal
        open={isGuestModalOpen}
        onClose={handleGuestModalClose}
        headingText="Oops! You Need an Account to View Your Profile!"
        subheadingText="Sign up or log in to start a conversation and get answers from the community."
      />
    </Box>
  );
};

export default Header;
