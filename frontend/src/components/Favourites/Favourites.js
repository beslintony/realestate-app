import { Grid, Typography } from '@material-ui/core';
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import Favourite from './Favourite/Favourite';
import api from '../../api/api';
import useStyles from './styles';
import { withRouter } from 'react-router';

const Favourites = () => {
  const classes = useStyles();
  const [properties, setProperties] = useState(null);

  // is executed when the side loads
  useEffect(() => {
    //get all favourites from this user
    api.getFavourites()
      .then(res => {
        //save favourites in state 
        setProperties(res.data);
      });
  }, []);

  //if the user has no favourites
  if (!properties?.length) return <p className={classes.content}>No favourites found</p>;
  return (
    <>
      <main className={classes.mainContent}>
        <Typography variant="h5" component="h2">
          Favourites
        </Typography>
        <div className={classes.toolbar} />
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="baseline"
          spacing={3}
        >
          {properties?.map((property) => (
            <Grid item key={property.Id} xs={12} sm={6} md={4} lg={3}>
              <Favourite property={property} />
            </Grid>
          ))}
        </Grid>
      </main>
    </>
  );
};

export default withRouter(Favourites);
