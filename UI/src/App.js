import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NavBar from './client/NavBar'
import MainPage from './client/MainPage'

const theme = createMuiTheme({
  palette: {
    primary: {main:"#212121"}
  },
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'avenir-ultralight',
      'Arial',
      'Helvetica',
      'sans-serif'
    ].join(',')
  }
});

function App() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
          <NavBar/>
          <MainPage/>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
