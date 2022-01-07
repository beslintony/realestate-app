import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    display: 'flex',
    color: theme.palette.text.primary,
    justifyContent: 'center',
    minHeight: `calc(100vh - 210px) !important`,
    maxWidth: 'calc(100vw - 29px)',
    textDecoration: 'none',
    flexGrow: 1,
  },
  topPictureGrid: {
    padding: theme.spacing(3),
    marginLeft: theme.spacing(13),
    marginRight: theme.spacing(13),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      display: `block`,
    },
  },
  picture: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      width: '100%',
    },
  },
  carousel: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  propertyTitle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  propertyPosted: {
    margin: theme.spacing(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  postedBy: {
    display: 'flex',
    flexDirection: 'row',
  },
  topGrid: {
    padding: theme.spacing(6),
    margin: theme.spacing(6),
    justifyItems: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    justifyItems: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    maxWidth: 500,
    minWidth: 310,
    textDecoration: 'none',
    transition: 'transform 0.15s ease-in-out',
    '&:hover,&:active': {
      transform: 'scale3d(1.05, 1.05, 1)',
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: '310',
    },
  },
  avatar: {
    width: theme.spacing(11),
    height: theme.spacing(11),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buton: {
    display: 'inline-block',
    padding: `0.35em 1.2em`,
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      margin: `0.2em auto`,
    },
  },
  agentDetails: {
    padding: theme.spacing(3),
  },
  cardBottom: {
    padding: theme.spacing(3),
  },
  address: {
    alignItems: 'center',
    justify: 'center',
    justifyContent: 'center',
  },
  description: {
    margin: theme.spacing(3),
  },
  middlecards: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      minWidth: '410px',
    },
  },
  middlecardext: {
    [theme.breakpoints.down('sm')]: {
      fontWeight: '200 px',
    },
  },
}));
