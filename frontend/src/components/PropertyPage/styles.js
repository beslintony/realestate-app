import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    display: 'flex',
    color: theme.palette.text.primary,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: `calc(100vh - 210px) !important`,
    maxWidth: `calc(100vw - 140px)`,
    textDecoration: 'none',
    flexGrow: 1,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
    marginRight: theme.spacing(8),
    marginLeft: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  topPictureGrid: {
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyItems: 'center',
      justifyContent: 'center',
    },
  },
  picture: {
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      width: '100%',
      alignItems: 'center',
      justifyItems: 'center',
      justifyContent: 'center',
    },
  },
  carousel: {
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      width: '75vw',
    },
  },
  card: {
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(5),
      margin: theme.spacing(-3),
    },
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyItems: 'center',
      justifyContent: 'center',
      margin: theme.spacing(-3),
    },
  },
  postedBy: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardContent: {
    justifyItems: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 500,
    textDecoration: 'none',
    [theme.breakpoints.up('sm')]: {
      fontSize: 'auto',
    },
  },
  avatar: {
    width: theme.spacing(11),
    height: theme.spacing(11),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  agentDetails: {
    padding: theme.spacing(3),
  },
  cardBottom: {
    padding: theme.spacing(3),
  },
  description: {
    margin: theme.spacing(3),
  },
  middlecards: {
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      fontSize: 'auto',
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  items: {
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    minWidth: '100%',
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      minWidth: 'auto',
      minHeight: 'auto',
    },
  },
  middlecardext: {
    alignItems: 'center',
    alignText: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      alignText: 'center',
      fontWeight: '300',
      fontSize: 18,
    },
    [theme.breakpoints.down('sm')]: {
      fontWeight: '500',
      fontSize: 21,
    },
    [theme.breakpoints.down('xs')]: {
      fontWeight: '500',
      fontSize: 16,
    },
  },
  root: {
    display: 'flexBox',
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    minWidth: '160px',
    minHeight: '160px',
    [theme.breakpoints.down('md')]: {
      minWidth: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
      fontWeight: '500',
      minWidth: '150',
      minHeight: 'auto',
    },
  },
  toolbar: theme.mixins.toolbar,
  links: {
    textDecoration: 'none',
  },
}));
