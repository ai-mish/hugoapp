import React, { Component, Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/DeleteSharp';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/Warning';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useSnackbar } from 'notistack';


let OBJ_DET_SERVER_URL = 'http://localhost:8080';

if (process.env.REACT_APP_OBJ_DET_SERVER_URL !== "") {
  OBJ_DET_SERVER_URL=process.env.REACT_APP_OBJ_DET_SERVER_URL
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



const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const HealthNotifications = props => {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const classes = useStyles();
    const FETCH_TIMEOUT = 2000 //ms
    let api_snackbar_key = null
    let esp_snackbar_key = null
    const Icon = variantIcon["info"];

    function onClose(key){
      console.log('onclose');
      closeSnackbar(key);
    }
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
        api_snackbar_key = enqueueSnackbar('API is online',
                                          { variant: 'success',
                                            autoHideDuration:1000,
                                            persist: false,
                                            action
                                          });
      }).catch(function(error) {
        api_snackbar_key = enqueueSnackbar('API is offline',
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
          esp_snackbar_key = enqueueSnackbar('ESP is online',
                                            { variant: 'success',
                                              persist: false,
                                              action
                                            });
        } else{
          esp_snackbar_key = enqueueSnackbar('ESP is offline',
                                            { variant: 'error',
                                              persist: true,
                                              action
                                            });
        }
      }).catch(function(error) {
          esp_snackbar_key = enqueueSnackbar('ESP is offline',
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
