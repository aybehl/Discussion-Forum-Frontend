import { useTheme } from "@emotion/react";
import { Box, TextField, InputAdornment, IconButton, Button, Typography, Avatar } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt"; // Import camera icon
import FaceIcon from '@mui/icons-material/Face';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRef, useState } from "react";

const ProfilePictureUpload = ({ onUpload, profilePic }) => { 
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {

    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setFileName(file.name);
      onUpload(file);
    }
  };

  const handleCameraIconClick = () => {
    fileInputRef.current.click(); // Trigger click on hidden file input
  };

  const handleDeleteIconClick = () => {
    setImage(null);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "2rem", width: "100%" }}>
      <Avatar
        src={image || profilePic || undefined} // Display image if available, otherwise fallback to initials
        alt="Profile Picture"
        sx={{
          width: 150,
          height: 150,
          mb: 1,
          backgroundColor: image ? "transparent" : `${theme.palette.primary.main}`,
          color: "white",
          fontSize: "2rem",
        }}
      >
        {!(image || profilePic) && <FaceIcon sx={{ fontSize: "4rem"}}/>}
      </Avatar>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0" }}>
        <TextField
        placeholder="Upload your best look"
        fullWidth
        variant="outlined"
        value={fileName}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0"
            }}>
              <IconButton onClick={handleCameraIconClick}>
                <CameraAltIcon sx={{ fontSize: "1rem"}}/>
              </IconButton>
              {image && (
              <IconButton onClick={handleDeleteIconClick}>
                  <DeleteIcon sx={{ fontSize: "1rem"}}/>
                </IconButton>
              )}
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
            fontSize: "0.8rem", // Font size for input text
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
        {/* <Typography variant="caption" display="block">
          <p style={{margin: "0"}}>
          At least 150x150 px recommended.
          </p>
          <p style={{margin: "0"}}>
          JPG or PNG is allowed.
          </p>
        </Typography> */}
      </Box>
    </Box>
  );
};

export default ProfilePictureUpload;
