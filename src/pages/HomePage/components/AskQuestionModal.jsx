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
  Chip
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
    mediaFiles: [],
  });

  const [errors, setErrors] = useState({
    title: false,
    body: false,
    tags: false
  });

  const handleInputChange = (field, value) => {
    setQuestionData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    handleInputChange("mediaFiles", [
      ...(questionData.mediaFiles || []),
      ...files,
    ]);
  };

  const handleRemoveFile = (fileToRemove) => {
    handleInputChange(
      "mediaFiles",
      questionData.mediaFiles.filter((file) => file.name != fileToRemove.name)
    );
  };

  const validateInputs = () => {
    const newErrors = {
      title: questionData.title.trim() === "",
      body: questionData.body.trim() === "",
      tags: questionData.tags.length === 0,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).includes(true); // Return true if no errors
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      return; // Exit if validation fails
    }

    try {
      // Prepare data for API call
      const payload = {
        title: questionData.title,
        body: questionData.body,
        tagIds: questionData.tags.map((tag) => tag.tagId), // Send only tag IDs
        mediaFiles: questionData.mediaFiles,
      };

      const response = await createQuestion(payload); // API call to create question
      const newQuestion = response.data;
      newQuestion.noOfReplies = 0;
      newQuestion.upvotes = 0;
      onQuestionPosted(response.data); // Refresh questions list
      onClose(); // Close modal
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  const avatarContent = user == null ? { children: "G" } : user.profilePic
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
            label="Title*"
            placeholder="Give a short and descriptive title for your question"
            value={questionData.title}
            onChange={(value) => handleInputChange("title", value)}
            required={true}
            error={errors.title}
            helperText={errors.title ? "Question title is required" : ""}
          />
          <TextInput
            label="Body*"
            placeholder="Ask a question and let our community help you..."
            value={questionData.body}
            onChange={(value) => handleInputChange("body", value)}
            multiline
            rows={4}
            required={true}
            error={errors.body}
            helperText={errors.body ? "Question body is required" : ""}
          />
          <Autocomplete
            multiple
            options={tags}
            getOptionLabel={(tag) => tag.tagName}
            value={questionData.tags}
            onChange={(event, newValue) => handleInputChange("tags", newValue)}
            isOptionEqualToValue={(option, value) =>
              option.tagId === value.tagId
            }
            renderInput={(params) => (
              <TextInput
                {...params}
                label="Tags"
                placeholder="Select tags for your question"
                error={errors.tags}
                helperText={errors.tags ? "At least one tag is required" : ""}
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
            <input type="file" hidden multiple onChange={handleMediaUpload} />
          </Button>
          {questionData.mediaFiles && questionData.mediaFiles.length > 0 && (
            <Box sx={{ mt: 0 }}>
              {questionData.mediaFiles.map((file, index) => (
                <Chip
                  key={index}
                  label={file.name}
                  onDelete={() => handleRemoveFile(file)} // Add a delete icon to remove the file
                  sx={{
                    margin: "0.25rem 0.25rem 0 0",
                    backgroundColor: "gray.light",
                    color: "gray.dark",
                    "& .MuiChip-deleteIcon": {
                      color: "primary.main",
                    },
                  }}
                />
              ))}
            </Box>
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
