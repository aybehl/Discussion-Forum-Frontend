import React, { useState, useEffect, useContext } from "react";
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
  Chip,
} from "@mui/material";
import TextInput from "../../HomePage/components/TextInput";
import { useUser } from "../../../contexts/UserProvider";
import { TagsContext } from "../../../contexts/TagsProvider";
import { updateQuestion } from "../../../api/questions";
import CustomButton from "../../../components/CustomButton";

const EditQuestionModal = ({
  open,
  onClose,
  questionId,
  question,
  onQuestionUpdated,
}) => {
  const { user } = useUser();
  const { tags } = useContext(TagsContext);
  const originalTags = question.tags;

  // Media variables
  const [media, setMedia] = useState(question.media || []); // Existing media files
  const [newMediaFiles, setNewMediaFiles] = useState([]); // New uploads
  const [mediaToDelete, setMediaToDelete] = useState([]); // Deleted media IDs

  const [questionData, setQuestionData] = useState({
    title: question.title,
    body: question.body,
    tags: question.tags,
    mediaFiles: question.media || [],
    mediaToDelete: [],
  });

  const [errors, setErrors] = useState({
    title: false,
    body: false,
    tags: false,
  });

  const handleInputChange = (field, value) => {
    setQuestionData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);

    setNewMediaFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveMedia = (fileOrMedia) => {
    if (fileOrMedia.mediaId) {
      // Existing media file (has mediaId)
      setMediaToDelete((prev) => [...prev, fileOrMedia.mediaId]); // Add to mediaToDelete
      setMedia((prevMedia) =>
        prevMedia.filter((media) => media.mediaId !== fileOrMedia.mediaId)
      ); // Remove from media array
    } else {
      // Newly uploaded file (doesn't have mediaId)
      setNewMediaFiles((prevFiles) =>
        prevFiles.filter((file) => file !== fileOrMedia)
      ); // Remove from newMediaFiles
    }
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

  const handleUpdate = async () => {
    if (!validateInputs()) {
      return; // Exit if validation fails
    }

    try {
      const finalTags = questionData.tags;
      const tagsToDelete = originalTags
        .filter(
          (originalTag) =>
            !finalTags.some((tag) => tag.tagId == originalTag.tagId)
        )
        .map((tag) => tag.tagId);

      const newTagIds = finalTags
        .filter(
          (finalTag) => !originalTags.some((tag) => tag.tagId == finalTag.tagId)
        )
        .map((tag) => tag.tagId);

      // Prepare data for API call
      const payload = {
        title: questionData.title,
        body: questionData.body,
        tagsToDelete,
        newTagIds,
        mediaToDelete, // Track deleted media IDs
        newMediaFiles, // Track new uploads
      };

      await updateQuestion(questionId, payload); // API call to update question
      onQuestionUpdated(); // Callback to refresh the question
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating question:", error);
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
            label="Title*"
            placeholder="Edit your question title"
            value={questionData.title}
            onChange={(value) => handleInputChange("title", value)}
            required={true}
            error={errors.title}
            helperText={errors.title ? "Question title is required" : ""}
          />
          <TextInput
            label="Body*"
            placeholder="Edit your question body"
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
                placeholder="Edit tags for your question"
                error={errors.tags}
                helperText={errors.tags ? "At least one tag is required" : ""}
              />
            )}
          />
          <Button variant="outlined" component="label">
            Upload Media
            <input type="file" hidden multiple onChange={handleMediaUpload} />
          </Button>
          <Box>
            {media.map((mediaItem) => (
              <Chip
                key={mediaItem.mediaId}
                label={mediaItem.mediaUrl.split("/").pop()} // Display file name
                onDelete={() => handleRemoveMedia(mediaItem)} // Handle delete
                sx={{
                  margin: "0.25rem",
                  backgroundColor: "gray.light",
                  color: "gray.dark",
                  "& .MuiChip-deleteIcon": { color: "primary.main" },
                }}
              />
            ))}

            {newMediaFiles.map((file, index) => (
              <Chip
                key={index}
                label={file.name} // Display new file name
                onDelete={() => handleRemoveMedia(file)} // Handle delete
                sx={{
                  margin: "0.25rem",
                  backgroundColor: "gray.light",
                  color: "gray.dark",
                  "& .MuiChip-deleteIcon": { color: "primary.main" },
                }}
              />
            ))}
          </Box>
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
          content={"Edit Post"}
          onClick={handleUpdate}
          textVariant="outlined"
        />
      </DialogActions>
    </Dialog>
  );
};

export default EditQuestionModal;
