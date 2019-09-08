import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
//import SASIcon from './SASIcon';


const NavBar = () => {
    return(
        <div>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit">
                  Hugo App v1.0
                </Typography>
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default NavBar;
