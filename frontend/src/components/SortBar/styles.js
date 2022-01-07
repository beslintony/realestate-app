import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  sortBar: {
    backgroundColor: 'white',
    color: 'black',
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.up('sm')]: {
      width: `100%`,
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      display: `block`,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
  },
  checkbox: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      display: `block`,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  dropdown: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  }
}));
