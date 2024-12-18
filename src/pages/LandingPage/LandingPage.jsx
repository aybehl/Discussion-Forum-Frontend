import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroSection from './components/HeroSection';
import ActionButtons from './components/ActionButtons';
import { Box } from '@mui/material';
import { useTheme } from '@emotion/react';

const LandingPage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      // background: `linear-gradient(135deg, ${theme.palette.gray.darkest} 30%, ${theme.palette.common.black} 90%)`,
      color: 'common.white',
      backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), 
      url(./landingPage3.jpg)
    `,
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat', 
      }}>
      <Header variant="landing"/>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 'auto'
        }}
      >
        <HeroSection />
        <ActionButtons />
      </Box>
      <Footer />
    </Box>
  );
};

export default LandingPage;
