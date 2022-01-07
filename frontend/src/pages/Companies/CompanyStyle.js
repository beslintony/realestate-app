import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      fontWeight: '790',
    },
  },
  paper: {
    display: 'flex-box',
    padding: theme.spacing(3),
    textDecoration: 'none',
    justifyContent: 'center',
    backgroundSize: 'cover',
    minHeight: `calc(100vh - 210px) !important`,
  },
  icon: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: `center`,
    justifyContent: `center`,
  },
  card: {
    maxWidth: 445,
  },
  cardContent: {
    alignContent: 'center',
    marginTop: `-20px`,
    justifyContent: `center`,
    textAlign: `center`,
    padding: theme.spacing(1),
  },
  top: {
    height: 130,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    background: `linear-gradient(to right bottom, #430089, #917f5e)`,
  },
  avatar: {
    justifyContent: `center`,
    display: `flex`,
  },
  xxl: {
    marginTop: `-120px`,
    width: theme.spacing(25),
    height: theme.spacing(25),
    borderStyle: `solid`,
    borderColor: `white`,
    borderWidth: `4px`,
  },
}));
