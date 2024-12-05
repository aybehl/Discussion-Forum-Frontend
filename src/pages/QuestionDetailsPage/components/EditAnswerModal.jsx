import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Avatar
} from "@mui/material";
import TextInput from "../../HomePage/components/TextInput";
import CustomButton from "../../../components/CustomButton";
import { updateAnswer } from "../../../api/answers";
import { useUser } from "../../../contexts/UserProvider";

const EditAnswerModal = ({ open, onClose, answer, onAnswerUpdated }) => {
  const { user } = useUser();
  const [answerBody, setAnswerBody] = useState(answer.body || "");
  const [error, setError] = useState(false);

  const handleInputChange = (value) => {
    setAnswerBody(value);
    setError(false);
  };

  const validateInput = () => {
    if (!answerBody.trim()) {
      setError(true);
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validateInput()) return;

    try {
      await updateAnswer(answer.answerId, { body: answerBody });
      onAnswerUpdated(); // Callback to refresh the answer
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating answer:", error);
    }
  };

  const avatarContent =
    user == null
      ? { children: "G" }
      : user.profilePic
      ? { src: user.profilePic }
      : { children: user.userName?.charAt(0).toUpperCase() };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ padding: 0, mx: 2, my: 2 }}>
        <Box display="flex" alignItems="center" gap="0.5rem">
          <Avatar
            {...avatarContent}
            alt="User Avatar"
            sx={{
              width: 50,
              height: 50,
              backgroundColor: !user?.profilePic
                ? "primary.main"
                : "transparent",
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: "gray.darker",
              textDecoration: "none",
            }}
          >
            {`@${user?.userName}`}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ padding: 0, mx: 2, my: 2 }}>
        <Box display="flex" flexDirection="column" gap="1rem">
          <TextInput
            label="Answer*"
            placeholder="Edit your answer"
            value={answerBody}
            onChange={handleInputChange}
            multiline
            rows={4}
            required={true}
            error={error}
            helperText={error ? "Answer body is required" : ""}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: 0, mx: 2, my: 2 }}>
        <CustomButton
          variant="text"
          bgColor="secondary"
          textColor="gray.darker"
          size="small"
          padding={"0.5rem 1rem"}
          borderRadius={"0.5rem"}
          content={"Cancel"}
          onClick={onClose}
          textVariant="outlined"
        />
        <CustomButton
          variant="contained"
          bgColor="primary"
          textColor="common.white"
          size="small"
          padding={"0.5rem 1rem"}
          borderRadius={"0.5rem"}
          content={"Update Answer"}
          onClick={handleUpdate}
          textVariant="outlined"
        />
      </DialogActions>
    </Dialog>
  );
};

export default EditAnswerModal;
