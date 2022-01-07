import { makeStyles } from '@material-ui/core/styles';
import { SubtlePrism } from '../../../assets';

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
    backgroundImage: `url(${SubtlePrism})`,
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
    height: 150,
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
