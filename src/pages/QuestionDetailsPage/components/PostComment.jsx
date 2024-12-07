import { Box, TextField } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import AuthorAvatar from "../../../components/AuthorAvatar";
import { useUser } from "../../../contexts/UserProvider";
import CustomButton from "../../../components/CustomButton";
import { postComment } from "../../../api/comments";

const PostComment = ({ answerId, onCommentPosted, setIsCommenting }) => {
  const { user } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [error, setError] = useState(false);
  const containerRef = useRef(null);
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsExpanded(false); // Collapse the TextField when clicking outside
      setIsCommenting(false);
    }
  };

  const handleInputClick = () => {
    setIsExpanded(true);
  };

  const handlePostComment = async () => {
    if (!commentBody.trim()) {
      setError(true);
      return;
    }

    try {
      const payload = {
        answerId,
        body: commentBody,
      };

      await postComment(payload);

      setCommentBody("");
      setIsExpanded(false);
      setError(false);
      onCommentPosted();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      <AuthorAvatar
        width={30}
        height={30}
        username={user?.userName}
        profilePicUrl={user?.profilePic}
        margin={"1rem 0"}
      />
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          borderBottom: "1px solid",
          borderColor: "gray.darker",
          padding: "1rem 0",
          width: "100%",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Got thoughts? Share them here!"
          fullWidth
          multiline
          minRows={isExpanded ? 2 : 1} // Start with 1 row; expand to 2 on click
          maxRows={10} // Dynamically grows to a maximum of 10 rows
          value={commentBody}
          onClick={handleInputClick}
          onChange={(e) => setCommentBody(e.target.value)}
          error={error}
          helperText={error ? "Comment can't be empty" : ""}
          InputProps={{
            sx: {
              padding: "0.75rem",
              fontSize: "0.9rem",
              backgroundColor: "white",
              borderRadius: "8px",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              transition: "all 0.5s ease", // Smooth animation for expansion
            },
          }}
        />
        {isExpanded && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
              marginTop: "0.5rem",
            }}
          >
            <CustomButton
              variant="contained"
              bgColor="primary"
              textColor="common.white"
              size="small"
              padding={"0.5rem 1rem"}
              borderRadius={"0.5rem"}
              content={"Post Comment"}
              onClick={handlePostComment}
              textVariant="outlined"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PostComment;
