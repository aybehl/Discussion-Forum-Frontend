import { Box, TextField, Typography } from "@mui/material";

const TextInput = ({ label, placeholder, onChange, required, disabled }) => {
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
        sx={{
          // "& .MuiInputBase-root": {
          //   cursor: disabled ? "not-allowed" : "pointer", // Override cursor for both states
          // },
          "& .MuiOutlinedInput-root": {
            padding: "0 0.75rem", // Custom padding for the input field
          },
          "& .MuiInputBase-input": {
            fontSize: "1rem", // Font size for input text
            padding: "0.5rem 0", // Additional padding inside the input
          },
          "& .MuiInputBase-input::placeholder": {
            fontSize: "0.9rem", // Placeholder font size
          },
        }}
      />
    </Box>
  );
};

export default TextInput;
