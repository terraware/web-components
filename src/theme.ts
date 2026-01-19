import { createTheme } from '@mui/material/styles';

import TerrawareTheme from './style-dictionary-dist/TerrawareTheme';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['grey'];
    state: {
      5: string;
    };
    accent: {
      1: string;
      2: string;
      3: string;
      4: string;
    };
    blue: {
      600: string;
    };
    red: {
      50: string;
      600: string;
    };
    green: {
      50: string;
      600: string;
    };
    gray: {
      200: string;
      800: string;
    };
  }
  interface PaletteOptions {
    neutral: PaletteOptions['grey'];
    state: {
      5: string;
    };
    accent: {
      1: string;
      2: string;
      3: string;
      4: string;
    };
    blue: {
      600: string;
    };
    red: {
      50: string;
      600: string;
    };
    green: {
      50: string;
      600: string;
    };
    gray: {
      200: string;
      800: string;
    };
  }
}

const defaultTheme = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1400, // custom xl to transition background on Home page
    },
  },
  typography: {
    fontFamily: 'Inter',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*::-webkit-scrollbar': {
          WebkitAppearance: 'none',
          width: '4px',
          height: '7px',
          backgroundColor: '#B2AB9340',
        },
        '*::-webkit-scrollbar-thumb': {
          borderRadius: '4px',
          backgroundColor: '#6C757D',
        },
        body: {
          color: '#3a4445',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#0067C8',
    },
    secondary: {
      main: '#D40002',
    },
    state: {
      5: '#CD5B38',
    },
    accent: {
      1: '#315CAF',
      2: '#EF9644',
      3: '#CD5B38',
      4: '#3F96E6',
    },
    neutral: {
      50: '#F8F9FA',
      100: '#F3F4F6',
      200: '#E9ECEF',
      400: '#CED4DA',
      500: '#ADB5BD',
      600: '#6C757D',
      700: '#495057',
      800: '#343A40',
    },
    blue: {
      600: '#0067C8',
    },
    red: {
      50: '#FFF1F1',
      600: '#D40002',
    },
    green: {
      50: '#D6FDE5',
      600: '#27764E',
    },
    gray: {
      200: '#CAD2D3',
      800: '#3A4445',
    },
    ...TerrawareTheme.palette,
  },
};

export default createTheme(defaultTheme);
