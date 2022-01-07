import { Redirect } from 'react-router-dom';

import { Grid } from '@material-ui/core';

import { FilterRealEstates, Properties, SearchBox } from '../../components';
import { realestatesStore } from '../../store';
import useStyles from './styles';

// lists all the realestates from the search
const RealEstates = () => {
  const realEstates = realestatesStore((state) => state.realEstates);
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item className={classes.search}>
          <SearchBox />
          <FilterRealEstates />
        </Grid>
        <Grid container justify="center">
          {realEstates?.data === undefined ? ( // Redirect to homepage when data is empty
            <Redirect to="/" />
          ) : (
            <Properties properties={realEstates.data} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default RealEstates;
