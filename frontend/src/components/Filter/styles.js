import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  filter: {
    width: '100%',
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
  },
  filterD: {
    width: '100%',
    display: 'flex',
    displayDirection: 'column',
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
  },
  formControl: {
    margin: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
  },
  formControlSlider: {
    // margin: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
  },
  accordianSummary: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
}));
