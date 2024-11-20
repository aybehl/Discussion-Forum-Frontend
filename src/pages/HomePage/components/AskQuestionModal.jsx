import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Avatar,
  Autocomplete,
} from "@mui/material";
import TextInput from "./TextInput";
import { useUser } from "../../../contexts/UserProvider";
import { TagsContext } from "../../../contexts/TagsProvider";
import { createQuestion } from "../../../api/questions";
import CustomButton from "../../../components/CustomButton";

const AskQuestionModal = ({ open, onClose, onQuestionPosted }) => {
  const { user } = useUser();
  const { tags } = useContext(TagsContext);

  // Consolidate question data into one state
  const [questionData, setQuestionData] = useState({
    title: "",
    body: "",
    tags: [],
    mediaFiles: null,
  });

  const handleInputChange = (field, value) => {
    setQuestionData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleMediaUpload = (e) => {
    handleInputChange("mediaFiles", e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      // Prepare data for API call
      const payload = {
        title: questionData.title,
        body: questionData.body,
        tagIds: questionData.tags.map((tag) => tag.tagId), // Send only tag IDs
        mediaFiles: questionData.mediaFiles,
      };

      await createQuestion(payload); // API call to create question
      onQuestionPosted(); // Refresh questions list
      onClose(); // Close modal
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  const avatarContent = user.profilePic
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
              backgroundColor: !user.profilePic
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
            {`@${user.userName}`}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ padding: 0, mx: 2, my: 2 }}>
        <Box display="flex" flexDirection="column" gap="1rem">
          <TextInput
            label="Question Title"
            placeholder="Give a short and descriptive title for your question"
            value={questionData.title}
            onChange={(value) => handleInputChange("title", value)}
          />
          <TextInput
            label="Question"
            placeholder="Ask a question and let our community help you..."
            value={questionData.body}
            onChange={(value) => handleInputChange("body", value)}
            multiline
            rows={4}
          />
          <Autocomplete
            multiple
            options={tags}
            getOptionLabel={(tag) => tag.tagName}
            value={questionData.tags}
            onChange={(event, newValue) =>
              handleInputChange("tagIds", newValue)
            }
            isOptionEqualToValue={(option, value) =>
              option.tagId === value.tagId
            }
            renderInput={(params) => (
              <TextInput
                {...params}
                label="Tags"
                placeholder="Select tags for your question"
              />
            )}
            sx={{
              "& .MuiAutocomplete-popupIndicator": {
                color: "primary.main",
              },
              "& .MuiAutocomplete-clearIndicator": {
                color: "gray.dark",
              },
            }}
          />
          <Button variant="outlined" component="label">
            Upload Media
            <input type="file" hidden onChange={handleMediaUpload} />
          </Button>
          {questionData.mediaFiles && (
            <Typography variant="caption">
              {questionData.mediaFiles.name}
            </Typography>
          )}
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
          content={"Post"}
          onClick={handleSubmit}
          textVariant="outlined"
        />
      </DialogActions>
    </Dialog>
  );
};

export default AskQuestionModal;
