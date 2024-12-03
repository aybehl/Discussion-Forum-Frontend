import { Box, TextField,  } from "@mui/material";
import { useState } from "react";

const PostAnswer = ({questionId, onAnswerPosted}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [answerBody, setAnswerBody] = useState("");
  const [error, setError] = useState(false);

  const handleInputClick = () => {
    setIsExpanded(true);
  };

  const handlePostAnswer = () => {
    if (!answerBody.trim()){
      setError(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        border: "1px solid",
        borderColor: "gray.darker",
        padding: "1rem",
        borderRadius: "8px",
        width: "100%",
        backgroundColor: "gray.dark",
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Got thoughts? Share them here!"
        fullWidth
        multiline
        minRows={isExpanded ? 2 : 1} // Start with 1 row; expand to 2 on click
        maxRows={10} // Dynamically grows to a maximum of 10 rows
        value={answer}
        onClick={handleInputClick}
        onChange={(e) => setAnswer(e.target.value)}
        InputProps={{
          sx: {
            padding: isExpanded ? "0.75rem" : "0.5rem", // Adjust padding based on expansion
            fontSize: "0.9rem",
            backgroundColor: "white",
            borderRadius: "8px",
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            transition: "all 0.3s ease", // Smooth animation for expansion
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
          <Button
            variant="contained"
            color="primary"
            onClick={handlePostAnswer}
            disabled={isPosting}
            sx={{
              textTransform: "none",
              padding: "0.5rem 1.5rem",
              fontSize: "0.9rem",
              borderRadius: "8px",
            }}
          >
            {isPosting ? "Posting..." : "Post Answer"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PostAnswer;