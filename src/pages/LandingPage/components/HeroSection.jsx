import { Box, Typography } from '@mui/material';

const HeroSection = () => (
  <Box 
    sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      //justifyContent: 'center',
      alignItems: 'center',
      gap: 4,
      mb: 10, 
      px: 2 
    }}>
    <Box 
      sx={{
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to <strong>"Fit.Connect"</strong> – The Ultimate Fitness Discussion Forum!
      </Typography>
      <Typography variant="h6" component="p" gutterBottom sx={{
        color: 'gray.main'
      }}>
        Join a community of fitness enthusiasts, share knowledge, and get personalized advice!
      </Typography>
    </Box>
    <Typography variant="body1" component="p" sx={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', color: 'gray.light'}}>
      Whether you're just starting your fitness journey or you're a seasoned athlete, [Fit.Connect] is the place to ask questions, share workout routines, exchange tips, and find inspiration. Engage with fellow fitness lovers, get advice on exercises, nutrition, and everything in between. Let's get stronger together!
    </Typography>
  </Box>
);

export default HeroSection;
