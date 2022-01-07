import React from 'react';

import { Link } from 'react-router-dom';

import { Button, Grid } from '@material-ui/core';

import useStyles from './styles';

// internal Error page
const InternalError = () => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.content}
      >
        <Grid item>
          <h1>500</h1>
          <h2>OH NO! Something Went Wrong.</h2>
          <p>Something went wrong at our side. We will fix this shortly!</p>
        </Grid>
        <Grid item>
          <Button className={classes.button}>
            <Link to="/">Go back to Homepage </Link>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default InternalError;
