import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    minHeight: `calc(100vh - 274px) !important`,
    marginTop: theme.spacing(8),
  },
  card: {
    maxWidth: 310,
    minWidth: 300,
    textDecoration: 'none',
    [theme.breakpoints.up('sm')]: {
      minWidth: '300',
    },
  },
  cardContent: {
    display: 'flexBox',
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
  },
  title: {
    textAlign: 'center',
    paddingTop: 10,
    textDecoration: 'none',
  },
  content: {
    textAlign: 'center',
    textDecoration: 'none',
  },
  cardGrid: {
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    paddingBottom: theme.spacing(3),
  },
  xxl: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    margin: 'auto',
    '&:hover,&:active': {
      transform: 'scale3d(1.05, 1.05, 1)',
    },
  },
}));
