import { Box, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 0,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <IconButton onClick={handleClick}>
        <ArrowBackIcon
          sx={{
            fontSize: "1.5rem",
          }}
        />
      </IconButton>
      <Typography variant="body2" sx={{ color: "gray.darker"}}>Back</Typography>
    </Box>
  );
};

export default BackButton;
