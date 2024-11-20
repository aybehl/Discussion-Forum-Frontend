import React, { useContext } from "react";
import { Box, Button, MenuItem, Select } from "@mui/material";
import { TagsContext } from "../../../contexts/TagsProvider";
import FilterListIcon from '@mui/icons-material/FilterList';

const FiltersAndActions = ({ onFilterChange, selectedTag, onAskQuestion }) => {
  const {tags} = useContext(TagsContext);
  
  const handleChange = (event) => {
    onFilterChange(event);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
        mt: 1
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <FilterListIcon/>
        <Select
          value={selectedTag === "Tags" ? "" : selectedTag}
          onChange={handleChange}
          defaultValue="" // Default value shows "Tags"
          displayEmpty
          sx={{
            width: "12rem",
            height: "40px",
            backgroundColor: "transparent",
            color: "common.white",
            border: "0.5px solid",
            borderColor: "gray.main",
            borderRadius: "8px",
            fontSize: "0.875rem",
            "&:hover": {
              borderColor: "primary.main",
            },
            "& .MuiSelect-icon": {
              color: "primary.main",
            },
            "&:focus": {
              outline: "none",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                width: "12rem",
                maxHeight: 200, // Restricts dropdown height
                "& .MuiMenuItem-root": {
                  padding: "0.5rem 1rem",
                  fontSize: "0.875rem",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                },
              },
            },
          }}
        >
          {/* Default option */}
          <MenuItem key={"default"} value="">
            Tags
          </MenuItem>
         
          {tags.map((tag) => (
            <MenuItem key={tag.tagId} value={tag}>
              {tag.tagName}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{
          textTransform: "none",
          py: "0.5rem",
          px: "1.5rem",
          color: "common.white",
          fontWeight: "bold",
          borderRadius: "0.5rem"
        }}
        onClick={onAskQuestion}
      >
        Ask a Question
      </Button>
    </Box>
  );
};

export default FiltersAndActions;
