import { Box, Typography } from "@mui/material";

const HeadingSection = ({ heading, subHeading}) => (
  <Box sx={{ textAlign: "center", mb: 4 }}>
    { heading && 
      (<Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>{heading}</Typography>)
    }
    {
      subHeading && 
      (<Typography variant="h6">{subHeading}</Typography>)
    }
  </Box>
);

export default HeadingSection;
