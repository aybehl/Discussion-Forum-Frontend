import { Box, Button } from '@mui/material';
import CustomButton from '../../../components/customButton';

const ActionButtons = () => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    gap: 8, 
    mt: 4,
    }}>
    <CustomButton variant="contained" color="primary" size="large" padding={'1rem 2rem'} borderRadius={'0.5rem'} content={'Let’s Get Fit Together! Sign Up Now!'}/>
    <CustomButton variant="contained" color="primary" size="large" padding={'1rem 2rem'} borderRadius={'0.5rem'} content={'Already Sweating? Log In Here!'}/>
    <CustomButton variant="contained" color="primary" size="large" padding={'1rem 2rem'} borderRadius={'0.5rem'} content={'Take a Quick Lap – Sign In as Guest!'}/>
  </Box>
);

export default ActionButtons;
