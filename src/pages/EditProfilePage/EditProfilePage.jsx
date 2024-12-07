import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar/SideBar";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import EditProfileSection from "./components/EditProfileSection";

const EditProfilePage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(135deg, ${theme.palette.gray.darkest} 30%, ${theme.palette.common.black} 90%)`,
        color: "common.white",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Sidebar />
        <EditProfileSection />
      </Box>
    </Box>
  );
};

export default EditProfilePage;
