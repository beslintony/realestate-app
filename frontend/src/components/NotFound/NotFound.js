import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import { Button, Grid } from '@material-ui/core';

import useStyles from './styles';

// not found page
const NotFound = () => {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.content}
    >
      <Grid item>
        <h1>404</h1>
        <h2>UH OH! You&apos;re lost.</h2>
        <p>
          The page you are looking <code>{pathname}</code> does not exist. How
          you got here is a mystery. But you can click the button below to go
          back to the homepage.
        </p>
      </Grid>
      <Grid item>
        <Button className={classes.button}>
          <Link to="/">Go back to Homepage </Link>
        </Button>
      </Grid>
    </Grid>
  );
};

export default NotFound;
