import { Box } from "@mui/material";
import CustomButton from "../../../components/CustomButton";
import { useNavigate } from "react-router-dom";

const ActionButtons = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleGuestAccess = () => {
    navigate("/questions");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 8,
        mt: 4,
      }}
    >
      <CustomButton
        variant="contained"
        bgColor="primary"
        textColor="common.white"
        size="large"
        padding={"1rem 2rem"}
        borderRadius={"0.5rem"}
        content={"Let’s Get Fit Together! Sign Up Now!"}
        onClick={handleSignUp}
        textVariant="body1"
      />
      <CustomButton
        variant="contained"
        bgColor="primary"
        textColor="common.white"
        size="large"
        padding={"1rem 2rem"}
        borderRadius={"0.5rem"}
        content={"Already Sweating? Log In Here!"}
        onClick={handleLogin}
        textVariant="body1"
      />
      <CustomButton
        variant="contained"
        bgColor="primary"
        textColor="common.white"
        size="large"
        padding={"1rem 2rem"}
        borderRadius={"0.5rem"}
        content={"Take a Quick Lap – Sign In as Guest!"}
        onClick={handleGuestAccess}
        textVariant="body1"
      />
    </Box>
  );
};

export default ActionButtons;
