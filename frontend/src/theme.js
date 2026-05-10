import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#F59E0B', light: '#334155' },
    secondary: { main: '#f59e0b', light: '#fbbf24' },
    success: { main: '#10b981' },
    error: { main: '#ef4444', light: '#f87171' },
    text: { primary: '#1e293b', secondary: '#64748b' },
    background: { default: '#f8fafc', paper: '#ffffff' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: { borderRadius: 3 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, borderRadius: 2 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { background: 'linear-gradient(20deg, #E0F1FD 50%, #ffffff 100%)' },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '&.Mui-focused fieldset': { borderColor: '#1e293b' },
          },
        },
      },
    },
  },
});