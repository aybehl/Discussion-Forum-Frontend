import Header from "../../components/Header";
import { Box } from '@mui/material';
import { useTheme } from '@emotion/react';
import Sidebar from "../../components/SideBar/SideBar";
import QuestionsList from "./components/QuestionsList";

const HomePage = () => {
  
  const theme = useTheme();
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      background: `linear-gradient(135deg, ${theme.palette.gray.darkest} 30%, ${theme.palette.common.black} 90%)`,
      color: 'common.white',
      }}>
      <Header/>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'row', 
        }}
      >
        <Sidebar/>
        <QuestionsList/>
      </Box>
    </Box>
  );
};

export default HomePage;