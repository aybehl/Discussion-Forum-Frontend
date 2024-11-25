import React from "react";
import { Box, Typography } from "@mui/material";
import { formatISODate } from "../utils/dateUtils";

const ContentHeader = ({ content }) => {
  return (
    <Box
      sx={{
        pt: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // gap: "2rem",
        flex: 1
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "normal",
          color: "common.white",
        }}
      >
        {`@${content.author.username}`}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "gray.light",
        }}
      >
        {formatISODate(content.createdAt)}
      </Typography>
    </Box>
  );
};

export default ContentHeader;
