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
    : user.profilePicture
    ? { src: user.profilePicture }
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
            href={isGuest ? "#" : "/profile"}
            underline="none"
            sx={{
              color: "common.white", // Inherit color from parent, so it doesn’t look like a link
              cursor: "pointer",
              textDecoration: "none", // Ensures no underline or link styling
              "&:hover": {
                color: "primary.main",
                textDecoration: "none", // Remove underline on hover
              },
              "&:active": {
                color: "inherit", // Prevent color change on click
                textDecoration: "none",
              },
              "&:focus": {
                color: "inherit", // Prevent color change on focus
                outline: "none", // Remove focus outline if any
                textDecoration: "none",
              },
              "&:visited": {
                color: "inherit", // Prevent color change on visited
                textDecoration: "none",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Avatar {...avatarContent} alt="User Avatar" />
              <Typography
                variant="body2"
                sx={{
                  color: "common.white",
                  textDecoration: "none",
                }}
              >
                {isGuest ? "Guest User" : user.userName}
              </Typography>
            </Box>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default Header;
