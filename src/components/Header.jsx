import { Box, Typography, Avatar, CircularProgress } from "@mui/material";
import { useUser } from "../contexts/UserProvider";
import { Link } from "react-router-dom";

const Header = ({ variant = "default" }) => {
  const { user, loading } = useUser();
  const isGuest = !user || !user.userName;

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

  console.log("isGuest - ", isGuest);
  console.log("avatarContent - ", avatarContent);
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
        }}
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
          <Link
            to={isGuest ? "#" : "/profile"}
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
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
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default Header;
