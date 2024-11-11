import { useTheme } from "@emotion/react";
import { Box, TextField, InputAdornment, IconButton, Button, Typography } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt"; // Import camera icon
import { useRef } from "react";

const ProfilePictureUpload = ({ onUpload }) => { 
  const theme = useTheme();
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {

    const file = event.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click(); // Trigger click on hidden file input
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "2rem" }}>
      <Box sx={{ width: 100, height: 100, borderRadius: "50%", backgroundColor: "#e0e0e0", mb: 1 }} />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>
        <TextField
        placeholder="Upload your best look"
        fullWidth
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleIconClick}>
                <CameraAltIcon sx={{ fontSize: "1.5rem"}}/>
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            padding: "0 0", // Custom padding for the input field
          },
          "& .MuiInputBase-input": {
            fontSize: "1rem", // Font size for input text
            padding: "0.5rem 0 0.5rem 0.5rem", // Additional padding inside the input
          },
          "& .MuiInputBase-input::placeholder": {
            fontSize: "0.9rem", // Placeholder font size
          },
        }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        hidden // Hidden input field
      />
        <Typography variant="caption" display="block">
          <p style={{margin: "0"}}>
          At least 800×800 px recommended.
          </p>
          <p style={{margin: "0"}}>
          JPG or PNG is allowed.
          </p>
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfilePictureUpload;
