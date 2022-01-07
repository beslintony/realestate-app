import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginRight: theme.spacing(1),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    justifyContent: 'center',
    position: 'relative',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    flexGrow: 1,
    paddingTop: theme.spacing(5),
    paddingBotom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      paddingTop: theme.spacing(5),
      paddingBotom: theme.spacing(5),
      // margin: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      display: `block`,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      paddingTop: theme.spacing(5),
      paddingBotom: theme.spacing(5),
      // margin: theme.spacing(2),
    },
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    justifyContent: 'center',
    position: 'relative',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    flexGrow: 1,
  },
  button: {
    paddingBottom: theme.spacing(15),
  },
}));
