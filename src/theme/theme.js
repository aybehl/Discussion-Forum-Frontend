import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F68037'
    },
    secondary: {
      main: '#393C43',
    },
    common: {
      black: '#000000',
      white: '#FFFFFF'
    },
    gray: {
      lightest: "#F9FAFB",
      lighter: "#F4F5F7",
      light: "#E5E7EB",
      main: "#9FA6B2",
      dark: "#6B7280",
      darker: "#4B5563",
      darkest: "#252F3F",
    },
  },
  typography: {
    fontFamily: 'Lato, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
      color: '#666',
    },
  },
});

export default theme;