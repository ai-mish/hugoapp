import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarProvider, useSnackbar } from 'notistack';
import HealthNotifications from './HealthNotifications';


const useStyles = makeStyles(theme => ({
  snackbarcontent: {
    margin: theme.spacing(1),
  },
}));

export default function ServerStatus() {
    const classes = useStyles();

    return(
        <div className={classes.root}>
        <SnackbarProvider maxSnack={3}>
          <HealthNotifications/>
        </SnackbarProvider>
        </div>
    )
}
