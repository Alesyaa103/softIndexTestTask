import React, { useState } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { FormControlLabel, Switch } from '@material-ui/core';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    phoneInput: {
      bg: string;
      text: string;
    }
  }
  interface ThemeOptions {
    phoneInput: {
      bg: string;
      text: string;
    }
  }
}

const ThemeProvider: React.FC = ({ children }) => {

  const [theme, setTheme] = useState<boolean>(localStorage.getItem('theme') !== 'false');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('theme', String(event.target.checked));
    setTheme(event.target.checked);
  }

  const lightTheme = createMuiTheme({
    palette: {
      type: 'light'
    },
    phoneInput: {
      bg: '#fafafa !important',
      text: '#ccc'
    }
  });

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark'
    },
    phoneInput: {
      bg: '#424242 !important',
      text: '#fff'
    }
  });

  return (
    <MuiThemeProvider theme={theme ? lightTheme : darkTheme}>
      <FormControlLabel
        control={
          <Switch
            checked={theme}
            onChange={handleChange}
            name="theme"
            color="secondary"
          />
        }
        label={theme ? 'Dark theme' : 'Light theme'}
      />
      {children}
    </MuiThemeProvider>
  )
}

export default ThemeProvider