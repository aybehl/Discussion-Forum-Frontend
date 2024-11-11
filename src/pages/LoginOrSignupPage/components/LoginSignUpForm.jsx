import {
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Box,
} from "@mui/material";
import CustomButton from "../../../components/CustomButton";
import { useState } from "react";

const LoginSignUpForm = ({ onLoginSignup, buttonText, isLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "USER",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    onLoginSignup(formData);
  };

  return (
    <form
      onSubmit={handleFormSubmission}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 16,
        width: "100%",
        maxWidth: 400,
        minWidth: 300,
      }}
    >
      <TextField
        name="email"
        label="Email address"
        variant="outlined"
        fullWidth
        required
        value={formData.email}
        onChange={handleFormChange}
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        required
        value={formData.password}
        onChange={handleFormChange}
      />
      {/* Display the role selection checkbox only in login flow */}
      {isLogin && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "space-around" }}>
          <FormLabel component="legend" sx={{ minWidth: "100px" }}>
            Select Role
          </FormLabel>
          <FormControl component="fieldset">
            <RadioGroup
              row
              name="role"
              value={formData.role}
              onChange={handleFormChange}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "space-between" }}>
                <FormControlLabel value="USER" control={<Radio />} label="User" />
                <FormControlLabel
                  value="MODERATOR"
                  control={<Radio />}
                  label="Moderator"
                />
              </Box>
            </RadioGroup>
          </FormControl>
        </Box>
      )}

      <CustomButton
        variant="contained"
        color="primary"
        size="large"
        padding="1rem"
        borderRadius="0.5rem"
        content={buttonText}
        textColor="common.white"
        textVariant="button"
        type="submit"
      />
    </form>
  );
};

export default LoginSignUpForm;
