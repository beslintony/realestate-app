import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  card: {
    minWidth: "350",
    position: 'relative',
    textDecoration: 'none',
    margin: theme.spacing(2, 2),
    [theme.breakpoints.up('sm')]: {
      minWidth: '100%',
    },
  },
  overlayFavourite: {
    position: 'absolute',
    top: '0px',
    left: '5px',
  },
  area: {
    display: 'flex',
    position: 'absolute',
    bottom: '32px',
    right: '35px',
  },
  overlay: {
    position: 'absolute',
    top: '10px',
    right: '20px',
    color: 'dark blue',
    backgroundColor: 'yellow',
    padding: theme.spacing(.5),
    fontWeight: 600,
  },
  overlayPrice: {
    position: 'absolute',
    bottom: '120px',
    right: '20px',
    color: 'dark',
    fontWeight: 600,
  },
  address: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  title: {
    display: 'flex',
    position: 'relative',
    maxWidth: `100%`,
    overflow: 'hidden',
    textDecoration: 'none',
    color: "inherit",
    cursor: 'pointer',
  },
  price: {
    minWidth: 160,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'darkblue',
    marginRight: '-20px',
    marginBottom: '-8px',
    borderTopLeftRadius: '60px',
    paddingLeft: '1.5rem',
  },
}));
