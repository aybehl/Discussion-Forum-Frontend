import { Box, Typography, Link } from '@mui/material';

const Footer = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      borderTop: '1px solid',
      borderColor: 'gray.darker',
      mx: 8,
      py: 4,
      mt: 'auto'
    }}
  >
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      gap: 4,
    }}>
      <Link href="/" variant="body2" underline="hover">
        Privacy Policy
      </Link>
      <Link href="/" variant="body2" underline="hover">
        Terms of Service
      </Link>
      <Link href="/" variant="body2" underline="hover">
        Contact Information
      </Link>
    </Box>

    <Typography variant="body2">
      © 2024 FitConnect. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
