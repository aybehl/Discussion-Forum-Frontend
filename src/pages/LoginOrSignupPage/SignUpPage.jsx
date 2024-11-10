import { Box } from "@mui/material";
import BackButton from "./components/BackButton";
import HeadingSection from "./components/HeadingSection";
import LoginSignUpForm from "./components/LoginSignUpForm";
import LoginSignUpLink from "./components/LoginSignUpLink";
import DividerWithText from "./components/DividerWithText";
import GoogleButton from "./components/GoogleButton";

const SignupPage = () => {
  const handleSignup = () => {
    // Handle sign-up logic
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
        <LoginSignUpForm onLoginSignup={handleSignup} buttonText={'Sign Up'}/>
        <LoginSignUpLink text={'Log in'} link={'/login'}/>
        <DividerWithText text="OR" />
        {/* <GoogleButton onGoogleButtonClick={handleGoogleSignup} text={'Sign Up with Google'}/> */}
      </Box>
    </Box>
  );
};

export default SignupPage;
