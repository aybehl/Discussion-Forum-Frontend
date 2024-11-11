import { Box } from "@mui/material";
import BackButton from "./components/BackButton";
import HeadingSection from "./../../components/HeadingSection";
import LoginSignUpForm from "./components/LoginSignUpForm";
import LoginSignUpLink from "./components/LoginSignUpLink";
import DividerWithText from "./components/DividerWithText";
import GoogleButton from "./components/GoogleButton";
import { signup } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "./components/ErrorMessage";

const SignupPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (userData) => {
    try {
      const response = await signup(userData);
      console.log("Signup successful:", response);
      
      if(response.status === 'SUCCESS' && response.statusCode === 201){
        sessionStorage.setItem('jwtToken', response.data.token);
        sessionStorage.setItem('userId', response.data.userId);
        sessionStorage.setItem('emailId', userData.email);
        navigate('/signup/profile-setup');
      } else if(response.status === 'ERROR'){
        setErrorMessage(response.message);
      }
    } catch(error){
      console.error("Signup failed:", error);

      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleGoogleSignup = () => {
    // Handle Google sign-up logic
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: 8, mx: 20}}>
      <BackButton />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <HeadingSection heading={'Hi friend!'} subHeading={'Create an account with us to get started'}/>
        <LoginSignUpForm onLoginSignup={handleSignup} buttonText={'Sign Up'} isLogin={false}/>
        <LoginSignUpLink text={'Log in'} link={'/login'}/>
        {
          errorMessage && <ErrorMessage message={errorMessage}/>
        }
        <DividerWithText text="OR" />
        <GoogleButton onGoogleButtonClick={handleGoogleSignup} text={'Sign Up with Google'}/>
      </Box>
    </Box>
  );
};

export default SignupPage;
