import { useTheme } from "@emotion/react";
import SidebarItem from "./components/SidebarItem";
import { Box, Typography, List } from "@mui/material";
import { useState } from "react";

const Sidebar = () => {
  const theme = useTheme();
  const [showAllTags, setShowAllTags] = useState(false);

  const tags = [
    {
      tagId: 1,
      tagName: "CoreStrength",
      description:
        "Discussion about exercises that improve core strength and stability.",
    },
    {
      tagId: 2,
      tagName: "WeightLoss",
      description:
        "Tips, tricks, and advice on healthy weight loss techniques.",
    },
    {
      tagId: 3,
      tagName: "Nutrition",
      description:
        "Discussions on proper nutrition, supplements, and diet plans.",
    },
    {
      tagId: 4,
      tagName: "WorkoutRoutines",
      description: "Sharing various workout routines and exercise plans.",
    },
    {
      tagId: 5,
      tagName: "StrengthTraining",
      description: "Strength training exercises and their benefits.",
    },
    {
      tagId: 6,
      tagName: "Cardio",
      description: "Discussions on cardio exercises for endurance and health.",
    },
    {
      tagId: 7,
      tagName: "Flexibility",
      description: "Improving flexibility and mobility through exercises.",
    },
    {
      tagId: 8,
      tagName: "MealPrep",
      description: "Tips and strategies for effective meal preparation.",
    },
    {
      tagId: 9,
      tagName: "MentalHealth",
      description: "How fitness impacts mental health and well-being.",
    },
    {
      tagId: 10,
      tagName: "Recovery",
      description: "Best practices for post-workout recovery and rest.",
    },
    {
      tagId: 11,
      tagName: "InjuryPrevention",
      description: "Tips to prevent injuries during workouts.",
    },
    {
      tagId: 12,
      tagName: "Yoga",
      description: "Discussions on yoga practices and benefits.",
    },
    {
      tagId: 13,
      tagName: "Pilates",
      description: "All about pilates exercises and their impact on fitness.",
    },
    {
      tagId: 14,
      tagName: "HIIT",
      description: "High-Intensity Interval Training techniques and routines.",
    },
    {
      tagId: 15,
      tagName: "Running",
      description: "Advice on running techniques, gear, and endurance.",
    },
    {
      tagId: 16,
      tagName: "Cycling",
      description: "Topics on cycling for fitness and endurance.",
    },
    {
      tagId: 17,
      tagName: "Swimming",
      description: "Benefits of swimming and techniques to improve.",
    },
    {
      tagId: 18,
      tagName: "VegetarianDiet",
      description: "Healthy vegetarian diet options for fitness.",
    },
    {
      tagId: 19,
      tagName: "VeganDiet",
      description: "Plant-based diet options and their impact on health.",
    },
    {
      tagId: 20,
      tagName: "KetoDiet",
      description: "The ketogenic diet and its benefits for fitness.",
    },
    {
      tagId: 21,
      tagName: "Supplements",
      description: "Advice and recommendations on using supplements.",
    },
    {
      tagId: 22,
      tagName: "Weightlifting",
      description: "Techniques and discussions on weightlifting.",
    },
    {
      tagId: 23,
      tagName: "Bodybuilding",
      description: "Topics around bodybuilding and muscle growth.",
    },
    {
      tagId: 24,
      tagName: "HealthyRecipes",
      description: "Sharing healthy and nutritious recipes.",
    },
    {
      tagId: 25,
      tagName: "HomeWorkouts",
      description: "Workouts that can be done at home.",
    },
  ];

  const sidebarItems = [
    { label: "All Questions", to: "/questions" },
    { label: "My Posts", to: "/posts" },
    { label: "My Bookmarks", to: "/bookmarks" },
    { label: "Mentions", to: "/mentions" },
  ];

  const handleToggleTags = () => {
    setShowAllTags((prev) => !prev);
  };

  return (
    <Box
      sx={{
        width: "15%",
        padding: "0.5rem 0",
        borderRight: "1px solid",
        borderColor: "gray.darker",
        height: "100vh",
        mx: 8,
      }}
    >
      <List sx={{ padding: "0" }}>
        {sidebarItems.map((item) => (
          <SidebarItem key={item.to} label={item.label} to={item.to} />
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
          {(showAllTags ? tags : tags.slice(0, 6)).map((tag) => (
            <Box
              key={tag.tagId}
              sx={{
                padding: "0.5rem 0.75rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                backgroundColor: "primary.main",
                cursor: "pointer",
                fontFamily: "Lato",
                "&:hover": {
                  background: `linear-gradient(135deg, ${theme.palette.common.black} 30%, ${theme.palette.gray.darkest} 90%)`,
                  color: theme.palette.common.white, // Hover text color
                },
                transition: "background 1s",
              }}
            >
              {`#${tag.tagName}`}
            </Box>
          ))}

        </Box>
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
              color: "common.white"
            }
          }}
        >
          {showAllTags ? "Collapse" : "See All"}
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
