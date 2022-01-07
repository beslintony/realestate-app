import Grid from '@material-ui/core/Grid';
import Property from './Property/Property';
import SortBar from '../SortBar/SortBar';
import useStyles from './styles';

//lists all the properties from the api
const Properties = ({ properties }) => {
  const classes = useStyles();

  if (!properties?.length) return <p>No Match Found!</p>;
  return (
    <>
      <SortBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="baseline"
          spacing={3}
        >
          {properties.map((property) => (
            <Grid item key={property.Id} xs={12} sm={6} md={4} lg={3}>
              <Property property={property} />
            </Grid>
          ))}
        </Grid>
      </main>
    </>
  );
};

export default Properties;
