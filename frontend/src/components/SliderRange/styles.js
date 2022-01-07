import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '25vw',
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
    },
  },
  label: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '8px',
  },
  text: {
    fontSize: '12px',
  },
}));
