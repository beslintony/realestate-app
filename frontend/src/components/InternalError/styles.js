import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  // paper: {
  //   //minHeight: `clac(100vh-210px)`,
  // },
  content: {
    minHeight: '100vh',
    dislplay: 'flex',
    flexDirection: 'column',
  },
  button: {
    display: 'inline-block',
    padding: `0.35em 1.2em`,
    margin: theme.spacing(1),
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      margin: `0.2em auto`,
    },
  },
}));
