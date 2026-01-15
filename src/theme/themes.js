import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6366f1' },
    secondary: { main: '#06b6d4' },
    background: { default: '#09090b', paper: '#121217' },
    divider: 'rgba(255,255,255,0.08)',
  },
  typography: { fontFamily: 'Inter, sans-serif' },
  shape: { borderRadius: 12 },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4f46e5' },
    secondary: { main: '#0891b2' },
    background: { default: '#f8fafc', paper: '#ffffff' },
    divider: 'rgba(0,0,0,0.08)',
  },
  typography: { fontFamily: 'Inter, sans-serif' },
  shape: { borderRadius: 12 },
});
