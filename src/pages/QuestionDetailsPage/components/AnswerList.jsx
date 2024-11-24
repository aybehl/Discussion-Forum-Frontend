import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

const AnswerList = ({ answers }) => {
  return answers.map((answer) => (
    <Box
      key={answer.answerId}
      sx={{
        borderBottom: "1px solid",
        borderColor: "gray.darker",
        py: 2,
      }}
    >
      <Box display="flex" alignItems="center" gap="0.5rem" mb={1}>
        <Avatar
          {...(answer.author?.profilePic?.mediaUrl
            ? { src: answer.author.profilePic.mediaUrl }
            : {
                children: answer.author.username?.charAt(0).toUpperCase(),
              })}
          sx={{
            width: 40,
            height: 40,
            backgroundColor: !answer.author.profilePic
              ? "primary.main"
              : "transparent",
          }}
        />
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            color: "white",
          }}
        >
          {answer.author.username}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "gray.light",
          }}
        >
          {new Date(answer.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "2-digit",
          })}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        sx={{
          color: "gray.light",
          mb: 1,
        }}
      >
        {answer.body}
      </Typography>
    </Box>
  ));
};

export default AnswerList;
