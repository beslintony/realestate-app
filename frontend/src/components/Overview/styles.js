import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    padding: theme.spacing(5),
    margin: theme.spacing(3),
    borderRadius: '25px',
    [theme.breakpoints.up('xs')]: {
      minWidth: '250',
      display: 'block',
    },
  },

  link: { textDecoration: 'none' },

  cardActions: {
    justifyContent: 'center',
  },

  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
  },
  top: {
    minWidth: '50vw',
  },

  div: {
    margin: theme.spacing(15),
  },

  btn: {
    display: 'flex',
    flexDirection: 'row',
  },

  btn1: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn2: {
    [theme.breakpoints.up('sm')]: {
      fontSize: 12,
    },
  },
}));
