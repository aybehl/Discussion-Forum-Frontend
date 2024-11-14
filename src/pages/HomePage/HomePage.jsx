import Header from "../../components/Header";
import { Box } from '@mui/material';
import { useTheme } from '@emotion/react';

const HomePage = () => {
  
  const theme = useTheme();
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      //backgroundColor: 'secondary.main',
      background: `linear-gradient(135deg, ${theme.palette.gray.darkest} 30%, ${theme.palette.common.black} 90%)`,
      color: 'common.white',
      }}>
      <Header/>
    </Box>
  );
};

export default HomePage;