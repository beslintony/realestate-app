import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    minHeight: `calc(100vh - 210px) !important`,
    [theme.breakpoints.down('sm')]: {
      minWidth: '300',
      margin: "0"
    },
  },
  card: {
    textDecoration: 'none',
    margin: theme.spacing(5),
  },
  topTitle: {
    padding: theme.spacing(5)

  },
  cardContent: {
    display: 'flex',
    width: "100%",
    padding: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      alignItems: 'center',
      justifyItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
    },
  },
  title: {
    textAlign: 'center',
    paddingTop: 10,
    textDecoration: 'none',
  },
  cardGrid: {
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
  },

  xxl: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: 'auto',
    '&:hover,&:active': {
      transform: 'scale3d(1.05, 1.05, 1)',
    },
  },

  left: {
    width: "100%",
  },

  right: {
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    width: "100%",
  },

  rate: {
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    width: "100%",
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    width: "100%",
    padding: "0 10px"
  },

  mediaComments: {
    display: 'flex',
    flexDirection: "column",
    height: `100%`,
    overflowY: 'scroll',
    overflowX: 'hidden',
  },

  mediaComment: {
    display: 'flex',
    flexDirection: "column",
    position: 'relative',
    padding: '1.2rem',
    backgroundColor: 'lightyellow',
    borderRadius: '0.8rem',
    paddingRight: '3rem',
    margin: '0.8rem',
  },

  mediaCommentName: {
    color: '#1D1E22',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'inherit',
    lineHeight: 1.5,
    letterSpacing: '0.0178571em',
    marginRight: '1rem',
  },

  mediaRate: {
    flex: "block",
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'inherit',
    lineHeight: 1.5,
    letterSpacing: '0.0178571em',
    marginRight: '1rem',
  },

  feedbacks: {
    flex: 7.5,
    padding: theme.spacing(5)
  },

  feedbackWrapper: {
    padding: '10px',
    height: '60vh',
  },
  button: {
    margin: "2px  2px",
  }
}));
