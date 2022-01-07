import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  search: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(0),
      borderRadius: theme.shape.borderRadius,
    },
  },
  inputRoot: {
    width: '575px',
    color: 'transparent',
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid pink`,
    '&:hover': {
      boxShadow: ` 1px 1px 8px 1px #dcdcdc`,
    },
    '&:focus': {
      boxShadow: ` 1px 1px 8px 1px #dcdcdc`,
      outline: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      width: 'auto',
    },
  },
  inputInput: {
    width: '100%',
    marginLeft: theme.spacing(3),
    height: '35px',
    border: 'none',
    fontSize: '18px',
    outline: 'none',
    color: 'black',
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      width: 'auto',
    },
  },
  buttonWrapper: {
    display: 'inline-block',
    marginLeft: `1em`,
  },
  button: {
    display: 'inline-block',
    padding: `0.35em 1.2em`,
    height: '48px',
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      margin: `0.2em auto`,
    },
  },
}));
