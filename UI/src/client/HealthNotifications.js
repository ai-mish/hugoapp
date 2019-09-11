import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/DeleteSharp';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';


let OBJ_DET_SERVER_URL = 'http://localhost:8080';

if (process.env.REACT_APP_API_SERVER_URL !== "") {
  OBJ_DET_SERVER_URL=process.env.REACT_APP_API_SERVER_URL
} else{
  OBJ_DET_SERVER_URL='http://localhost:8080'
}

const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
      display: 'flex',
      margin: 16,
      justifyContent: 'center',
      alignItems: 'middle',
  },
  button: {
      margin: 8,
      color: '#fff',
      backgroundColor: '#313131',
  },
  success: {
      backgroundColor: '#43a047',
  },
  error: {
      backgroundColor: '#d32f2f',
  },
  info: {
      backgroundColor: '#2979ff',
  },
  warning: {
      backgroundColor: '#ffa000',
  },
  icon: {
    fontSize: 20,
  },
}));



const HealthNotifications = props => {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const classes = useStyles();
    const FETCH_TIMEOUT = 2000 //ms

    //onClick={onClose(key)}
    function action(key) {
      //console.log(key)
      return (
        <IconButton key="close" aria-label="close" color="inherit" onClick={() => closeSnackbar(key)} >
         <DeleteIcon className={classes.icon} />
       </IconButton>
      )
    }

    function timeoutPromise(ms, promise) {
      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error("promise timeout"))
        }, ms);
        promise.then(
          (res) => {
            clearTimeout(timeoutId);
            resolve(res);
          },
          (err) => {
            clearTimeout(timeoutId);
            reject(err);
          }
        );
      })
    }

    function checkAPIHealth() {

      timeoutPromise(FETCH_TIMEOUT, fetch(OBJ_DET_SERVER_URL+'/customer/initial')).then(function(response) {
        enqueueSnackbar('API is online',
                                          { variant: 'success',
                                            autoHideDuration:1000,
                                            persist: false,
                                            action
                                          });
      }).catch(function(error) {
        enqueueSnackbar('API is offline',
                                          { variant: 'error',
                                            persist: true,
                                            action
                                          });
      });
    }

    function checkESPHealth() {
      timeoutPromise(FETCH_TIMEOUT, fetch(OBJ_DET_SERVER_URL+'/esp'))
      .then(response => response.json())
      .then(function(response) {
        if(response['esphealth'].toUpperCase === 'UP'){
          enqueueSnackbar('ESP is online',
                                            { variant: 'success',
                                              persist: false,
                                              autoHideDuration:1000,
                                              action
                                            });
        } else{
          enqueueSnackbar('ESP is offline',
                                            { variant: 'error',
                                              persist: true,
                                              action
                                            });
        }
      }).catch(function(error) {
          enqueueSnackbar('ESP is offline',
                                            { variant: 'error',
                                              persist: true,
                                              action
                                            });
      });
    }


    useEffect(() => {
      checkAPIHealth();
      checkESPHealth();
    },[]);


    return (
        <div/>
    );

}

HealthNotifications.propTypes = {
    classes: PropTypes.object.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
};

export default HealthNotifications;
