import { Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginSignUpLink = ({ text, link }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
      <Typography variant="body2">Already have an account?</Typography>
      <Link
        onClick={() => navigate(link)}
        underline="hover"
        sx={{ cursor: "pointer", ml: 1, fontWeight: "600"}}
        variant="body1"
        component="button"
      >
        {text}
      </Link>
    </Box>
  );
};

export default LoginSignUpLink;
