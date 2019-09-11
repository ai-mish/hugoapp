import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import NavBar from './client/NavBar'
import MainPage from './client/MainPage'

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: green,
    background: {
      root: yellow[700]
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
