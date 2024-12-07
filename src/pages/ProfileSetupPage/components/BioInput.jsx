import { useTheme } from "@emotion/react";
import { TextField, Typography, Box } from "@mui/material";

const BioInput = ({ onChange, value }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0, alignItems: "flex-start", width: "100%"}}>
      <Typography variant="body2" sx={{ minWidth: "5rem", textAlign: "left" }}>
        Your Bio
      </Typography>
      <TextField
        placeholder="Share a little about yourself – fitness goals, fun facts, or favorite workouts!"
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          "&:hover": {
            cursor: "pointer", // Adds pointer cursor on hover
          },
          "& .MuiOutlinedInput-root": {
            padding: "0 0.75rem", // Custom padding for the input field
            marginTop: "0.5rem",
            "&:hover fieldset": {
              borderColor: theme.palette.primary.main, // Hover color from theme
            },
          },
          "& .MuiInputBase-input": {
            fontSize: "0.8rem", // Font size for input text
            padding: "0.5rem 0", // Additional padding inside the input
          },
          "& .MuiInputBase-input::placeholder": {
            fontSize: "0.8rem", // Placeholder font size
          },
        }}
      />
    </Box>
  );
};

export default BioInput;
