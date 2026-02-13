import { createTheme, ThemeOptions } from '@mui/material';

interface CustomThemeVars {
  appPadding: {
    x: number;
    y: number;
  };
  toolMenu: {
    height: number;
  };
  customPalette: {
    [key in string]: string;
  };
}

declare module '@mui/material/styles' {
  interface Theme {
    customVars: CustomThemeVars;
  }

  interface ThemeOptions {
    customVars: CustomThemeVars;
  }
}

export const customVars: CustomThemeVars = {
  appPadding: {
    x: 40,
    y: 40
  },
  toolMenu: {
    height: 40
  },
  customPalette: {
    diagramBg: '#161e2d', // AWS Canvas Dark
    defaultColor: '#ffffff'
  }
};

const createShadows = () => {
  const shadows = Array(25)
    .fill('none')
    .map((shadow, i) => {
      if (i === 0) return 'none';

      return `0px 10px 20px ${i - 10}px rgba(0,0,0,0.25)`;
    }) as Required<ThemeOptions>['shadows'];

  return shadows;
};

export const themeConfig: ThemeOptions = {
  customVars,
  shadows: createShadows(),
  transitions: {
    duration: {
      shortest: 50,
      shorter: 100,
      short: 150,
      standard: 200,
      complex: 250,
      enteringScreen: 150,
      leavingScreen: 100
    }
  },
  typography: {
    fontFamily: [
      '"Amazon Ember"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    h2: {
      fontSize: '4em',
      fontWeight: 700,
      lineHeight: 1.2
    },
    h5: {
      fontSize: '1.3em',
      lineHeight: 1.2,
      fontWeight: 600
    },
    body1: {
      fontSize: '0.85em',
      lineHeight: 1.2
    },
    body2: {
      fontSize: '0.75em',
      lineHeight: 1.2
    }
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#0f1b2a', // AWS Global Background
      paper: '#232f3e'    // AWS Panel/Top Bar
    },
    text: {
      primary: '#ffffff',
      secondary: '#d1d5db'
    },
    primary: {
      main: '#FF9900' // AWS Orange
    },
    secondary: {
      main: '#FF9900'
    },
    divider: '#3b4b5c'
  },
  components: {
    MuiCard: {
      defaultProps: {
        elevation: 0,
        variant: 'outlined'
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: '#232f3e',
          color: '#ffffff'
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained',
        disableRipple: true,
        disableTouchRipple: true
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600
        }
      }
    },
    MuiSvgIcon: {
      defaultProps: {
        color: 'inherit'
      },
      styleOverrides: {
        root: {
          width: 20,
          height: 20
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined'
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#161e2d',
            '& fieldset': {
              borderColor: '#414750'
            },
            '&:hover fieldset': {
              borderColor: '#949494'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF9900'
            }
          }
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#ffffff'
        }
      }
    }
  }
};

export const theme = createTheme(themeConfig);
