import { useTheme } from "@emotion/react";
import { Box, TextField, InputAdornment, IconButton, Button, Typography, Avatar } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt"; // Import camera icon
import { useRef, useState } from "react";

const ProfilePictureUpload = ({ onUpload }) => { 
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {

    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onUpload(file);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click(); // Trigger click on hidden file input
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "2rem", width: "100%" }}>
      <Box sx={{ width: 150, height: 150, borderRadius: "50%", backgroundColor: `${theme.palette.primary.main}99`, mb: 1 }} />
      <Avatar
        src={image || undefined} // Display image if available, otherwise fallback to initials
        alt="Profile Picture"
        sx={{
          width: 150,
          height: 150,
          mb: 1,
          backgroundColor: image ? "transparent" : theme.palette.primary.main, // Use primary color if no image
          color: "white",
          fontSize: "2rem",
        }}
      >
        {!image && "A"} {/* Display "A" or any other placeholder initials when no image */}
      </Avatar>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0" }}>
        <TextField
        placeholder="Upload your best look"
        fullWidth
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleIconClick}>
                <CameraAltIcon sx={{ fontSize: "1.2rem"}}/>
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            padding: "0 0", // Custom padding for the input field
            "&:hover fieldset": {
              borderColor: "primary.main", // Hover color from theme
            },
          },
          "& .MuiInputBase-input": {
            fontSize: "1rem", // Font size for input text
            padding: "0.5rem 0 0.5rem 0.5rem", // Additional padding inside the input
          },
          "& .MuiInputBase-input::placeholder": {
            fontSize: "0.8rem", // Placeholder font size
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
          At least 150x150 px recommended.
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
