import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import deepPurple from '@material-ui/core/colors/deepPurple';
import teal from '@material-ui/core/colors/teal';
import NavBar from './client/NavBar';
import MainPage from './client/MainPage';
//import MainPage from './client/MainPage_BG';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: green,
    background: {
      root: deepPurple[500]
    }
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
