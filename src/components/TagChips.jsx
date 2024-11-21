import { Box, Chip } from "@mui/material";

const TagChips = ({tags}) => {
  return (
    <Box sx={{ display: "flex", gap: "0.5rem" }}>
      {tags.map((tag) => (
        <Chip
          key={tag.tagId}
          label={`#${tag.tagName}`}
          size="small"
          sx={{
            backgroundColor: "primary.main",
            fontSize: "0.75rem",
            color: "common.white",
          }}
        />
      ))}
    </Box>
  );
};

export default TagChips;
