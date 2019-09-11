import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import NavBar from './client/NavBar'
import MainPage from './client/MainPage'

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
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
