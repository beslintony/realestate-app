import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    margin: theme.spacing(8),
    paddingBottom: theme.spacing(1),
    height: '100%',
    borderRadius: '12px',
  },
  paper: {
    minHeight: `calc(100vh - 250px) !important`,
  },
  header: {
    marginTop: theme.spacing(5),
  },
  noElements: {
    textAlign: 'center',
    margin: theme.spacing(8),
    paddingBottom: theme.spacing(1),
    height: '100%'
  },
  container: {
    maxHeight: '100%',
  },

  button: {
    margin: theme.spacing(1),
  },
}));
