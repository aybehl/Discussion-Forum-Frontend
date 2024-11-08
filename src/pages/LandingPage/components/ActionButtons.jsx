import { Box, Button } from '@mui/material';

const ActionButtons = () => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    gap: 8, 
    mt: 4,
    }}>
    <Button variant="contained" color="primary" size="large">
      Let’s Get Fit Together! Sign Up Now!
    </Button>
    <Button variant="contained" color="primary">
      Already Sweating? Log In Here!
    </Button>
    <Button variant="contained" color="primary">
      Take a Quick Lap – Sign In as Guest!
    </Button>
  </Box>
);

export default ActionButtons;
