import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  IconButton
} from "@mui/material";
import CustomButton from "./CustomButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const GuestPromptModal = ({ open, onClose, headingText, subheadingText }) => {
  const navigate = useNavigate();

  const onSignUp = () => {
    navigate("/signup");
  };

  const onLogin = () => {
    navigate("/login");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ padding: 0, mx: 2, mb: 0 }}>

      <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0.5rem",
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              color: "gray.dark",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {/* Row for heading */}
        <Box sx={{ textAlign: "center", padding: "0 1rem 1rem 1rem" }}>
          <Typography variant="h5">{headingText}</Typography>
        </Box>

        {/* <Typography variant="h5" align="center">
          {headingText}
        </Typography> */}
      </DialogTitle>
      <DialogContent sx={{ padding: 0, mx: 2, my: 2 }}>
      <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }} 
      >
      <Typography
          variant="body1"
          textAlign="center"
          sx={{ color: "gray.dark",  width: "50%"}}
        >
          {subheadingText}
        </Typography>
      </Box>
      </DialogContent>
      <DialogActions>
        <Box
          display="flex"
          justifyContent="center"
          gap="1.5rem"
          width="100%"
          marginBottom={"2rem"}
        >
          <CustomButton
            variant="contained"
            bgColor="primary"
            textColor="common.white"
            size="medium"
            padding={"0.5rem 1rem"}
            borderRadius={"1rem"}
            content={"Create an Account"}
            onClick={onSignUp}
            textVariant="body2"
          />
          <CustomButton
            variant="contained"
            bgColor="primary"
            textColor="common.white"
            size="medium"
            padding={"0.5rem 1rem"}
            borderRadius={"1rem"}
            content={"Already a member? Login"}
            onClick={onLogin}
            textVariant="body2"
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default GuestPromptModal;
