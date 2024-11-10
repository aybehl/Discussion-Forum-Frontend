import { Box, Divider, Typography } from "@mui/material";

const DividerWithText = ({ text }) => (
  <Box sx={{ display: "flex", alignItems: "center", width: "100%", maxWidth: 400, my: 3 }}>
    <Divider sx={{ flexGrow: 1 }} />
    <Typography variant="body2" sx={{ mx: 2 }}>{text}</Typography>
    <Divider sx={{ flexGrow: 1 }} />
  </Box>
);

export default DividerWithText;
