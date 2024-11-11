import { Button } from "@mui/material";

const GoogleButton = ({ onGoogleButtonClick, text }) => {
  return (
    <Button
    variant="outlined"
    fullWidth
    sx={{ maxWidth: 400, minWidth: 300, textTransform: "none", py: "1rem", borderRadius: "0.5rem"}}
    onClick={onGoogleButtonClick}
    disabled
  >
    <img src="/google-icon.svg" alt="Google Icon" width="20" style={{ marginRight: "0.5rem" }} />
    {text}
  </Button>
  );
};

export default GoogleButton;
