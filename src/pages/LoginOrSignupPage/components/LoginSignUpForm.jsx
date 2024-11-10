import { Box, TextField } from "@mui/material";
import CustomButton from "../../../components/CustomButton";

const LoginSignUpForm = ({ onLoginSignup, buttonText }) => (
  <Box component="form" sx={{ 
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "center",
    gap: 2, 
    width: "100%", 
    maxWidth: 400,
    minWidth: 300,
    }}
    >
    <TextField label="Email address" variant="outlined" fullWidth required />
    <TextField label="Password" type="password" variant="outlined" fullWidth required />
    <CustomButton
      variant="contained"
      color="primary"
      size="large"
      padding="1rem"
      borderRadius="0.5rem"
      content={buttonText}
      onClick={onLoginSignup}
      textColor="common.white"
      textVariant="body1"
    />
  </Box>
);

export default LoginSignUpForm;
