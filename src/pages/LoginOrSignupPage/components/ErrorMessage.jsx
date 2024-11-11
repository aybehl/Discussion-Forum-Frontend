import { Alert } from "@mui/material";

const ErrorMessage = ({ message }) => {
  return (
    <Alert
      severity="error"
      sx={{mt: "0.5rem"}}
    >
      {message}
    </Alert>
  );
};

export default ErrorMessage;
