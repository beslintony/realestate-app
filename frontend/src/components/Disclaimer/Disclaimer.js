import Alert from '@material-ui/lab/Alert';

import useStyles from './styles';

// disclimer for the website to be displayed at the top
const Disclaimer = () => {
  const classes = useStyles();

  return (
    <div className={classes.disclaimer}>
      <Alert className={classes.text} variant="filled" severity="info">
        Fulda University Software Engineering Summer 2021. For Demonstration
        Purpose Only!
      </Alert>
    </div>
  );
};

export default Disclaimer;
