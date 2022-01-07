import { useHistory } from 'react-router';

import { Grid, Paper, Typography } from '@material-ui/core';

import { FilterRealEstates, SearchBox } from '../../components';
import { realestatesStore } from '../../store';
import useStyles from './styles';

// home page
const Home = () => {
  const realEstates = realestatesStore((state) => state.realEstates);
  const classes = useStyles();

  const history = useHistory();

  return (
    <div className={classes.paper}>
      <Grid
        className={classes.wrapper}
        container
        spacing={5}
        alignItems="center"
        justify="center"
        direction="column"
      >
        <Paper className={classes.paperbkg}>
          <Typography gutterBottom component="h6" variant="h3">
            Search
          </Typography>
          <Grid item>
            <SearchBox />
          </Grid>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <FilterRealEstates />
          </div>
        </Paper>
        <Grid container justify="center">
          {realEstates.data === undefined ? (
            <Typography
              align="center"
              component="h2"
              variant="h4"
              className={classes.tagline}
            >
              Let&apos;s Search For The Dream Home Together!
            </Typography>
          ) : (
            history.push('/realestates')
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
