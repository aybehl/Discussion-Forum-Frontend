import React from "react";
import { Box, Typography } from "@mui/material";

const ProfileDetail = ({ title, value }) => {
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: "normal", color: "gray.main"}}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: "normal"}}>
        {value || "N/A"}
      </Typography>
    </Box>
  );
};

export default ProfileDetail;
