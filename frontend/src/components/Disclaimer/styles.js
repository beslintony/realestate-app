import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  disclaimer: {
    justifyContent: 'center',
    width: `100%`,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: '45px',
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      height: 'auto',
    },
  },
  text: {
    justifyContent: 'center',
    width: `100%`,
    textAlign: 'center',
  },
}));
