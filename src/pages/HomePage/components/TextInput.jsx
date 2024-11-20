import React from "react";
import { Box, TextField, Typography } from "@mui/material";

const TextInput = ({
  label,
  placeholder,
  onChange,
  value,
  multiline = false,
  rows = 1,
  required = false,
  disabled = false,
  error = false,
  helperText = "",
  ...props
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0.25rem",
        width: "100%",
      }}
    >
      <Typography
        variant="body2"
        sx={{ textAlign: "left", fontWeight: 500, color: "gray.darker" , pl: 1}}
      >
        {label}
      </Typography>
      <TextField
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        multiline={multiline}
        rows={rows}
        required={required}
        disabled={disabled}
        error={error}
        helperText={helperText}
        fullWidth
        variant="outlined"
        {...props}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "0.5rem",
            padding: 0,
            "& fieldset": {
              borderColor: "gray.main",
            },
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
            },
          },
          "& .MuiInputBase-input": {
            fontSize: "0.875rem",
            padding: "0.5rem 0.75rem",
          },
          "& .MuiInputBase-input::placeholder": {
            fontSize: "0.875rem",
            color: "gray.main",
          },
          "&.Mui-disabled .MuiInputBase-input": {
            color: "gray.light",
          },
        }}
      />
    </Box>
  );
};

export default TextInput;
