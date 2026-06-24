import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      sidebar: { width: number };
      header: { height: number };
    };
  }
  interface ThemeOptions {
    custom?: {
      sidebar?: { width?: number };
      header?: { height?: number };
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#7C3AED',
      light: '#A78BFA',
      dark: '#5B21B6',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F97316',
      light: '#FDBA74',
      dark: '#EA580C',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#10B981',
      light: '#6EE7B7',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#F59E0B',
      light: '#FCD34D',
    },
    error: {
      main: '#EF4444',
      light: '#FCA5A5',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#fef7ff',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1d1a24',
      secondary: '#4a4455',
      disabled: '#9CA3AF',
    },
    divider: '#ccc3d8',
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontSize: '28px', fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.3px' },
    h2: { fontSize: '24px', fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.2px' },
    h3: { fontSize: '20px', fontWeight: 600, lineHeight: 1.4 },
    h4: { fontSize: '18px', fontWeight: 600, lineHeight: 1.4 },
    h5: { fontSize: '16px', fontWeight: 500, lineHeight: 1.5, letterSpacing: '0.15px' },
    h6: { fontSize: '14px', fontWeight: 400, lineHeight: 1.5, letterSpacing: '0.15px' },
    body1: { fontSize: '14px', fontWeight: 400, lineHeight: 1.57, letterSpacing: '0.15px' },
    body2: { fontSize: '12px', fontWeight: 400, lineHeight: 1.5, letterSpacing: '0.4px' },
    caption: { fontSize: '12px', fontWeight: 600, lineHeight: 1, letterSpacing: '0.5px' },
    button: { fontSize: '14px', fontWeight: 600, lineHeight: 1.5, textTransform: 'none' as const, letterSpacing: '0.15px' },
    subtitle1: { fontSize: '16px', fontWeight: 500, lineHeight: 1.5 },
    subtitle2: { fontSize: '14px', fontWeight: 500, lineHeight: 1.5 },
    overline: { fontSize: '12px', fontWeight: 600, lineHeight: 1, letterSpacing: '0.5px', textTransform: 'uppercase' as const },
  },
  shape: { borderRadius: 8 },
  shadows: [
    'none',
    '0 1px 2px 0 rgba(0,0,0,0.05)',
    '0 4px 6px -1px rgba(0,0,0,0.1)',
    '0 10px 15px -3px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
  ] as any,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          minHeight: '40px',
          padding: '8px 16px',
          fontWeight: 600,
          fontSize: '14px',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        contained: { boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: '#FFFFFF',
            '& fieldset': { borderColor: '#ccc3d8' },
            '&:hover fieldset': { borderColor: '#7b7487' },
            '&.Mui-focused fieldset': { borderColor: '#7C3AED', borderWidth: '2px' },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: '12px' },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '14px' },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#ccc3d8',
          '&.Mui-checked': { color: '#7C3AED' },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: { borderRadius: '8px' },
      },
    },
  },
  custom: {
    sidebar: { width: 240 },
    header: { height: 64 },
  },
});

export default theme;
