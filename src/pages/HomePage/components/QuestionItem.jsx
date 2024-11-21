import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { formatISODate } from "../../../utils/dateUtils";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import TagChips from "../../../components/TagChips";

const QuestionItem = ({ question }) => {
  const { title, tags, upvotes, noOfReplies, createdAt } = question;
  const theme = useTheme();

  return (
    <Box
      component={Link}
      to={`/questions/${question.questionId}`}
      style={{ textDecoration: "none" }}
      sx={{
        display: "grid",
        gridTemplateColumns: "3fr 1fr 1fr 1fr",
        gap: "1rem",
        alignItems: "center",
        py: 2,
        borderBottom: "0.5px solid",
        borderColor: 'gray.darker',
        color: "common.white",
        "&:hover": {
          background: `linear-gradient(135deg, ${theme.palette.common.black} 30%, ${theme.palette.gray.darkest} 90%)`,
          color: "primary.main", // Hover color
          transition: "background 1s"
        },
      }}
    >
      <Box sx={{
        pl: 3,
        display: 'flex', 
        flexDirection: 'column',
        gap: "0.5rem",
        }}>
        <Typography variant="subtitle2" sx={{fontWeight: 300}} >
          {title}
        </Typography>
        <TagChips tags={tags}/>
      </Box>
      <Typography variant="subtitle2" textAlign="center" sx={{fontWeight: 300}}>
        {upvotes}
      </Typography>
      <Typography variant="subtitle2" textAlign="center" sx={{fontWeight: 300}}>
        {noOfReplies}
      </Typography>
      <Typography variant="subtitle2" textAlign="center" sx={{fontWeight: 300}}>
        {formatISODate(createdAt)}
      </Typography>
    </Box>
  );
};

export default QuestionItem;
