import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.text.primary,
    minHeight: `calc(100vh-210px)`,
    flexGrow: 1,
    textDecoration: 'none',
  },
}));
