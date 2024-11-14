import { useState } from "react";
import { Box, Divider } from "@mui/material";
import HeadingSection from "./../../components/HeadingSection";
import ProfilePictureUpload from "./components/ProfilePictureUpload";
import TextInput from "./components/TextInput";
import BioInput from "./components/BioInput";
import ErrorMessage from "./components/ErrorMessage"; // Optional
import { editUserProfile } from "../../api/user";
import CustomButton from "../../components/CustomButton";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const ProfileSetupPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: sessionStorage.getItem('emailId') !== null ? sessionStorage.getItem('emailId'): "",
    bio: "",
    profilePicture: null,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (field, value) => {
    setProfileData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = sessionStorage.getItem('userId');
      const response = await editUserProfile(userId, profileData);

      if (response.status === "SUCCESS" && response.statusCode === 200) {
        navigate("/home");
      } else if (response.status === "ERROR") {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Profile setup failed:", error);
      setErrorMessage("An error occurred while saving your profile.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        justifyContent: "center",
        width: "80%",
        mt: 2,
        mx: "auto"
      }}
    >
      <HeadingSection
        heading={"Welcome friend!"}
        subHeading={"You're Almost There! Let's Get Your Profile Ready"}
      />
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          padding: "1.5rem",
          border: `1px solid ${theme.palette.gray.light}`,
          borderRadius: 4,
        }}
      >
        <ProfilePictureUpload
          onUpload={(file) => handleInputChange("profilePicture", file)}
        />
        <Divider sx={{ width: "100%"}} /> 
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
            onChange={(value) => handleInputChange("userName", value)}
            required={true}
            value={profileData.userName}
          />
          <TextInput
            label="Email Id"
            placeholder="Your email"
            onChange={(value) => handleInputChange("email", value)}
            disabled={(profileData.email !== "") ? true: false}
            value={profileData.email}
          />
        </Box>
        <Divider sx={{ width: "100%"}} /> 
        <BioInput onChange={(value) => handleInputChange("bio", value)} />
        {errorMessage && <ErrorMessage message={errorMessage} />}

        <CustomButton
          variant="contained"
          color="primary"
          size="large"
          padding="1rem 4rem"
          borderRadius="0.5rem"
          content={'Save Profile Info'}
          textColor="common.white"
          textVariant="button"
          type="submit"
      />
      </form>
    </Box>
  );
};

export default ProfileSetupPage;
