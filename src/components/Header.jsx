import { Box, Typography } from '@mui/material';

const Header = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      py: 2,
      mx: 8,
      borderBottom: '1px solid',
      borderColor: 'gray.darker',
    }}
  >
    <img src="/logo.svg" alt="Fit.Connect Logo" style={{ marginRight: 8 }} />
    <Typography variant="h6" component="span">
      Fit.Connect
    </Typography>
  </Box>
);

export default Header;
