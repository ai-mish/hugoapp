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
}));

export default function ErrorPage() {
  const classes = useStyles();

  return (
    <div>
        <Typography variant="h5" component="h3">
          Oops...
        </Typography>
        <Typography component="p">
          Looks like API server is offline..
        </Typography>
    </div>
  );
}
