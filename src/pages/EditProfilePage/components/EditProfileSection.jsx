import React, { useState } from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { useUser } from "../../../contexts/UserProvider";
import EditIcon from "@mui/icons-material/Edit";
import ProfileDetail from "./ProfileDetail";
import { formatISODate } from "../../../utils/dateUtils";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import CustomButton from "../../../components/CustomButton";

const EditProfileSection = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleLogout = () => {
    navigate("/"); //Navigate to Landing page
    logout();
  };

  return (
    <Box
      sx={{
        pl: 4,
        mr: 8,
        width: "100%",
        borderLeft: "1px solid",
        borderColor: "gray.darker",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Typography variant="h6" sx={{ my: 3, color: "common.white" }}>
        My Profile
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "2rem",
          alignItems: "center",
          justifyContent: "center",
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: "gray.darker",
          width: "80%",
          py: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
          }}
        >
          <Avatar
            alt={user?.userName}
            src={user?.profilePic}
            sx={{
              width: 200,
              height: 200,
              backgroundColor: !user?.profilePic
                ? "primary.main"
                : "transparent",
            }}
          >
            {!user?.profilePic && user?.userName?.charAt(0).toUpperCase()}
          </Avatar>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              padding: "0.5rem 1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              mb: 4,
            }}
            onClick={handleEditProfile}
          >
            <EditIcon />
            Edit Profile
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "50%",
            maxWidth: "500px",
          }}
        >
          <ProfileDetail title="User Name" value={user?.userName} />
          <ProfileDetail title="First Name" value={user?.firstName} />
          <ProfileDetail title="Last Name" value={user?.lastName} />
          <ProfileDetail title="My Bio" value={user?.bio} />
          <ProfileDetail title="My Email" value={user?.email} />
          <ProfileDetail
            title="Joined At"
            value={formatISODate(user?.joinedAt)}
          />
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            color: "gray.light",
          }}
        >
          Want to log out?
        </Typography>
        <CustomButton
          variant="outlined"
          bgColor="primary"
          textColor="primary.main"
          size="large"
          padding={"0.5rem 1rem"}
          borderRadius={"0.5rem"}
          content={"Log Out"}
          onClick={handleLogout}
          textVariant="outlined"
        />
      </Box>
      <EditProfileModal open={isEditModalOpen} onClose={handleCloseEditModal} />
    </Box>
  );
};

export default EditProfileSection;
