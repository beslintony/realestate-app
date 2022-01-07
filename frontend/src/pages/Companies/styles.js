import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  topContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(3),
    textDecoration: 'none',
    paddingBottom: theme.spacing(3),
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
  },
  container: {
    minHeight: `calc(100vh - 210px) !important`,
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
      minWidth: '300',
    },
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    boxShadow: '-3px',
  },
  link: {
    textDecoration: 'none',
  },
  divider: {
    margin: theme.spacing(3, 55),
  },
  card: {
    maxWidth: 310,
    minWidth: 300,
    textDecoration: 'none',
    transition: 'transform 0.15s ease-in-out',
    '&:hover,&:active': {
      transform: 'scale3d(1.05, 1.05, 1)',
    },
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
  // container: {
  //   minHeight: `calc(100vh - 210px) !important`,
  //   display: 'flex',
  //   flexDirection: 'column',
  // },
}));
