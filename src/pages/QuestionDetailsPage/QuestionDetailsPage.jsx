import React from "react";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import Sidebar from "../../components/SideBar/SideBar";
import QuestionDetailsSection from "./components/QuestionDetailsSection";

const QuestionDetailsPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(135deg, ${theme.palette.gray.darkest} 30%, ${theme.palette.common.black} 90%)`,
        color: "common.white",
      }}
    >
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Sidebar />
        <QuestionDetailsSection />
      </Box>
    </Box>
  );
};

export default QuestionDetailsPage;
