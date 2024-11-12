import { Box, TextField, Typography } from "@mui/material";

const TextInput = ({ label, placeholder, onChange, required, disabled, value }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "0" }}>
      <Typography variant="body2" 
      sx={{ minWidth: "5rem", textAlign: "left" }}
      >
        {label}
      </Typography>
      <TextField
        placeholder={placeholder}
        fullWidth
        variant="outlined"
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        value={value}
        sx={{
          // "& .MuiInputBase-root": {
          //   cursor: disabled ? "not-allowed" : "pointer", // Override cursor for both states
          // },
          "& .MuiOutlinedInput-root": {
            padding: "0 0.75rem", // Custom padding for the input field
            "&:hover fieldset": {
              borderColor: "primary.main", // Hover color from theme
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

export default TextInput;
