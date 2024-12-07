import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import ProfilePictureUpload from "./ProfilePictureUpload";
import TextInput from "./TextInput";
import BioInput from "./BioInput";
import ErrorMessage from "./ErrorMessage"; // Optional
import CustomButton from "../../components/CustomButton";
import { editUserProfile } from "../../api/user";
import { useUser } from "../../contexts/UserProvider";

const EditProfileModal = ({ open, onClose }) => {
  const { user, login } = useUser();
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    userName: user?.userName || "",
    email: user?.email || "",
    bio: user?.bio || "",
    profilePicture: null,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (field, value) => {
    setProfileData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = sessionStorage.getItem("userId");
      const response = await editUserProfile(userId, profileData);

      if (response.status === "SUCCESS" && response.statusCode === 200) {
        await login(sessionStorage.getItem("jwtToken"));
        onClose(); // Close the modal after successful update
      } else if (response.status === "ERROR") {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      setErrorMessage("An error occurred while saving your profile.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h6" align="center">
          Edit Profile
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            justifyContent: "center",
            width: "100%",
          }}
        >
          <ProfilePictureUpload
            onUpload={(file) => handleInputChange("profilePicture", file)}
          />
          <Divider sx={{ width: "100%" }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
              mb: 2,
            }}
          >
            <TextInput
              label="First Name"
              placeholder="Your first name"
              value={profileData.firstName}
              onChange={(value) => handleInputChange("firstName", value)}
            />
            <TextInput
              label="Last Name"
              placeholder="Your last name"
              value={profileData.lastName}
              onChange={(value) => handleInputChange("lastName", value)}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
              mb: 2,
            }}
          >
            <TextInput
              label="User Name*"
              placeholder="Choose a cool username"
              value={profileData.userName}
              onChange={(value) => handleInputChange("userName", value)}
              required={true}
            />
            <TextInput
              label="Email"
              placeholder="Your email"
              value={profileData.email}
              onChange={(value) => handleInputChange("email", value)}
              disabled={true} // Email field is disabled
            />
          </Box>
          <Divider sx={{ width: "100%" }} />
          <BioInput
            onChange={(value) => handleInputChange("bio", value)}
            value={profileData.bio}
          />
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </Box>
      </DialogContent>
      <DialogActions>
        <CustomButton
          variant="text"
          color="secondary"
          onClick={onClose}
          content="Cancel"
        />
        <CustomButton
          variant="contained"
          color="primary"
          content="Save Changes"
          onClick={handleSubmit}
        />
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileModal;
