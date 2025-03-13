import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4f46e5',
      light: '#818cf8',
      dark: '#3730a3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#06b6d4', 
      light: '#22d3ee',
      dark: '#0891b2',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#b91c1c',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#1d4ed8',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },
    text: {
      primary: '#111827',
      secondary: '#4b5563',
      disabled: '#9ca3af',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.2,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      fontSize: '0.875rem',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.05),0px 1px 1px 0px rgba(0,0,0,0.03),0px 1px 3px 0px rgba(0,0,0,0.03)",
    "0px 3px 3px -2px rgba(0,0,0,0.05),0px 2px 4px 0px rgba(0,0,0,0.03),0px 1px 8px 0px rgba(0,0,0,0.03)",
    "0px 3px 5px -1px rgba(0,0,0,0.1),0px 5px 8px 0px rgba(0,0,0,0.06),0px 1px 14px 0px rgba(0,0,0,0.04)",
    "0px 2px 10px -1px rgba(0,0,0,0.1),0px 4px 16px 0px rgba(0,0,0,0.06),0px 1px 20px 0px rgba(0,0,0,0.04)",
    "0px 4px 5px -2px rgba(0,0,0,0.1),0px 8px 10px 1px rgba(0,0,0,0.06),0px 3px 14px 2px rgba(0,0,0,0.04)",
    "0px 5px 5px -3px rgba(0,0,0,0.1),0px 10px 15px 1px rgba(0,0,0,0.06),0px 4px 18px 3px rgba(0,0,0,0.04)",
    "0px 6px 6px -3px rgba(0,0,0,0.1),0px 12px 17px 2px rgba(0,0,0,0.06),0px 5px 22px 4px rgba(0,0,0,0.04)",
    "0px 7px 8px -4px rgba(0,0,0,0.1),0px 14px 20px 3px rgba(0,0,0,0.06),0px 6px 25px 5px rgba(0,0,0,0.04)",
    "0px 8px 9px -4px rgba(0,0,0,0.1),0px 16px 22px 3px rgba(0,0,0,0.06),0px 7px 28px 5px rgba(0,0,0,0.04)",
    "0px 9px 10px -5px rgba(0,0,0,0.1),0px 18px 24px 3px rgba(0,0,0,0.06),0px 8px 30px 6px rgba(0,0,0,0.04)",
    "0px 10px 11px -6px rgba(0,0,0,0.1),0px 20px 26px 4px rgba(0,0,0,0.06),0px 9px 33px 7px rgba(0,0,0,0.04)",
    "0px 11px 12px -6px rgba(0,0,0,0.1),0px 22px 28px 4px rgba(0,0,0,0.06),0px 10px 35px 7px rgba(0,0,0,0.04)",
    "0px 12px 13px -7px rgba(0,0,0,0.1),0px 24px 30px 5px rgba(0,0,0,0.06),0px 11px 38px 8px rgba(0,0,0,0.04)",
    "0px 13px 14px -7px rgba(0,0,0,0.1),0px 26px 32px 5px rgba(0,0,0,0.06),0px 12px 40px 8px rgba(0,0,0,0.04)",
    "0px 14px 15px -8px rgba(0,0,0,0.1),0px 28px 34px 5px rgba(0,0,0,0.06),0px 13px 42px 9px rgba(0,0,0,0.04)",
    "0px 15px 16px -8px rgba(0,0,0,0.1),0px 30px 36px 6px rgba(0,0,0,0.06),0px 14px 45px 9px rgba(0,0,0,0.04)",
    "0px 16px 17px -9px rgba(0,0,0,0.1),0px 32px 38px 6px rgba(0,0,0,0.06),0px 15px 47px 10px rgba(0,0,0,0.04)",
    "0px 17px 18px -9px rgba(0,0,0,0.1),0px 34px 40px 6px rgba(0,0,0,0.06),0px 16px 49px 10px rgba(0,0,0,0.04)",
    "0px 18px 19px -10px rgba(0,0,0,0.1),0px 36px 42px 7px rgba(0,0,0,0.06),0px 17px 52px 11px rgba(0,0,0,0.04)",
    "0px 19px 20px -10px rgba(0,0,0,0.1),0px 38px 44px 7px rgba(0,0,0,0.06),0px 18px 54px 11px rgba(0,0,0,0.04)",
    "0px 20px 21px -11px rgba(0,0,0,0.1),0px 40px 46px 7px rgba(0,0,0,0.06),0px 19px 56px 12px rgba(0,0,0,0.04)",
    "0px 21px 22px -11px rgba(0,0,0,0.1),0px 42px 48px 8px rgba(0,0,0,0.06),0px 20px 59px 12px rgba(0,0,0,0.04)",
    "0px 22px 23px -12px rgba(0,0,0,0.1),0px 44px 50px 8px rgba(0,0,0,0.06),0px 21px 61px 13px rgba(0,0,0,0.04)",
    "0px 23px 24px -12px rgba(0,0,0,0.1),0px 46px 52px 8px rgba(0,0,0,0.06),0px 22px 63px 13px rgba(0,0,0,0.04)",
  ],
  
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.2s ease',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)',
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #0891b2 30%, #06b6d4 90%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.06)',
        },
        elevation2: {
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
        },
        elevation3: {
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.03)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 100%)',
          color: '#ffffff',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
        },
      },
    },
  },
});

export default theme;