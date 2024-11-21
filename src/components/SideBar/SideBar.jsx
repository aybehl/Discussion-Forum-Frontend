import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, List, Skeleton } from "@mui/material";
import SidebarItem from "./components/SidebarItem";
import { getTagsWithQuestionsCount } from "../../api/tags";

const Sidebar = () => {
  const theme = useTheme();
  const [showAllTags, setShowAllTags] = useState(false);
  const [tagsWithCounts, setTagsWithCounts] = useState(null); // Initially null

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getTagsWithQuestionsCount();
        setTagsWithCounts(response.data);
      } catch (error) {
        console.error("Error fetching tags with question counts:", error);
      }
    };

    fetchTags();
  }, []);

  const sidebarItems = [
    { label: "All Questions", to: "/questions", exact: true },
    { label: "My Posts", to: "/posts", exact: true },
    { label: "My Bookmarks", to: "/bookmarks", exact: true },
    { label: "Mentions", to: "/mentions", exact: true },
  ];

  const handleToggleTags = () => {
    setShowAllTags((prev) => !prev);
  };

  return (
    <Box
      sx={{
        width: "20%",
        padding: "0.5rem 0",
        height: "100vh",
        overflowY: "auto",
        ml: 8,
      }}
    >
      <List sx={{ padding: "0" }}>
        {sidebarItems.map((item) => (
          <SidebarItem key={item.to} label={item.label} to={item.to} exact={item.exact}/>
        ))}
      </List>

      {/* Tags Section */}
      <Box
        sx={{
          marginRight: "0.5rem",
          padding: "0.5rem 0.5rem",
        }}
      >
        <Typography variant="body1">Tags</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem", mt: 1.5 }}>
          {tagsWithCounts != null
            ? (showAllTags ? tagsWithCounts : tagsWithCounts.slice(0, 6)).map(
                (tag) => (
                  <Box
                    key={tag.tagId}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.25rem",
                      padding: "0.24rem 0.5rem",
                      borderRadius: "0.5rem",
                      fontSize: "0.875rem",
                      backgroundColor: theme.palette.primary.main,
                      cursor: "pointer",
                      fontFamily: "Lato",
                      "&:hover": {
                        background: `linear-gradient(135deg, ${theme.palette.common.black} 30%, ${theme.palette.gray.darkest} 90%)`,
                        color: theme.palette.common.white,
                      },
                      transition: "background 1s",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: "500",
                        color: theme.palette.common.white,
                      }}
                    >
                      #{tag.tagName}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: "400",
                        fontSize: "0.75rem",
                        color: theme.palette.gray.lighter,
                      }}
                    >
                      {tag.questionCount}
                    </Typography>
                  </Box>
                )
              )
            : // Placeholder skeletons while loading
              Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width="80px"
                  height="25px"
                  sx={{
                    borderRadius: "0.5rem",
                    backgroundColor: theme.palette.gray.light,
                  }}
                />
              ))}
        </Box>
        {tagsWithCounts && (
          <Typography
            variant="caption"
            onClick={handleToggleTags}
            sx={{
              mt: 1.5,
              mx: 1,
              display: "block",
              cursor: "pointer",
              textAlign: "right",
              color: "gray.main",
              "&:hover": {
                color: "common.white",
              },
            }}
          >
            {showAllTags ? "Collapse" : "See All"}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
