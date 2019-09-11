import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 800,
  },
  h5: {
    margin: 'auto'
  },
}));

export default function ErrorPage() {
  const classes = useStyles();

  return (
    <div>
        <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
          Looks like API server is offline..
        </Typography>
    </div>
  );
}
