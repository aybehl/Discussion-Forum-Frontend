import { Box } from "@mui/material";
import BackButton from "./components/BackButton";
import HeadingSection from "./../../components/HeadingSection";
import LoginSignUpForm from "./components/LoginSignUpForm";
import LoginSignUpLink from "./components/LoginSignUpLink";
import DividerWithText from "./components/DividerWithText";
import GoogleButton from "./components/GoogleButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "./components/ErrorMessage";
import { useUser } from "../../contexts/UserProvider"; 

const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useUser();

  const handleLogin = async (userData) => {
    try {
      const response = await login(userData);

      if(response.status === 'SUCCESS' && response.statusCode === 200){
        login(response.data.token);
        //sessionStorage.setItem('jwtToken', response.data.token);
        sessionStorage.setItem('userId', response.data.userId);
        sessionStorage.setItem('emailId', userData.email);
        navigate('/home');
      } else if(response.status === 'ERROR'){
        setErrorMessage(response.message);
      }
    } catch(error){
      console.error("Login failed:", error);

      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google sign-up logic
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: 8, mx: 20}}>
      <BackButton />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <HeadingSection heading={'Welcome back friend!'}/>
        <LoginSignUpForm onLoginSignup={handleLogin} buttonText={'Log in'} isLogin={true}/>
        <LoginSignUpLink text={'Sign up'} link={'/signup'}/>
        {
          errorMessage && <ErrorMessage message={errorMessage}/>
        }
        <DividerWithText text="OR" />
        <GoogleButton onGoogleButtonClick={handleGoogleLogin} text={'Login with Google'}/>
      </Box>
    </Box>
  );
};

export default LoginPage;
