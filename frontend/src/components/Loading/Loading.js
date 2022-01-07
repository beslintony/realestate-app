import React from 'react';

import { Backdrop, CircularProgress } from '@material-ui/core';

import useStyles from './styles';

// loading animation spinner
const Loading = ({ start }) => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Backdrop className={classes.backdrop} open={start}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Loading;
