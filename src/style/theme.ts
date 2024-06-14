import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: '#FF9900', // Amazon Orange
      contrastText: '#FFFFFF', // White text
    },
    secondary: {
      main: '#146EB4', // Amazon Blue
      contrastText: '#FFFFFF', // White text
    },
    text: {
      primary: '#111111', // Black text
      secondary: '#555555', // Grey text
    },
    background: {
      default: '#FFFFFF', // White background
      paper: '#F5F5F5', // Light grey background for paper components
    },
    action: {
      disabled: '#CCCCCC', // Light grey for disabled elements
    },
    divider: '#DDDDDD', // Light grey for dividers
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Amazon uses a similar sans-serif font
    button: {
      textTransform: 'none', // Amazon buttons have normal text case
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Amazon buttons are usually sharp-edged
        },
        containedPrimary: {
          backgroundColor: '#FF9900',
          '&:hover': {
            backgroundColor: '#E68A00', // Darker orange for hover state
          },
        },
        containedSecondary: {
          backgroundColor: '#146EB4',
          '&:hover': {
            backgroundColor: '#0D5A94', // Darker blue for hover state
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#232F3E', // Dark blue for the top bar
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h5: {
          fontWeight: 600, // Amazon headers are usually bold
        },
      },
    },
  },
});
