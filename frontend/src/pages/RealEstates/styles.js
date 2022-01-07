import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    justifyContent: 'center',
    // backgroundImage: `url(${backgroundImage})`,
    // backgroundSize: "cover",
    // height: `100vh`,
    minHeight: `calc(100vh - 210px)`,
    position: 'relative',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    flexGrow: 1,
    paddingBottom: theme.spacing(10),
  },
  cardContent: {
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
  },
  card: {
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
  },
  button: {
    display: 'inline-block',
    padding: `0.35em 1.2em`,
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      margin: `0.2em auto`,
    },
  },
  filter: {
    padding: theme.spacing(5, 2),
    boxShadow: '-2px',
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(2),
  },
  // search: {
  //   [theme.breakpoints.up('sm')]: {
  //     //marginLeft: theme.spacing(0),
  //     // width: "auto",
  //     borderRadius: theme.shape.borderRadius,
  //   },
  // },
  accordianSummary: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  inputRoot: {
    width: '575px',
    color: 'transparent',
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid #dcdcdc`,
    '&:hover': {
      boxShadow: ` 1px 1px 8px 1px #dcdcdc`,
    },
    '&:focus': {
      boxShadow: ` 1px 1px 8px 1px #dcdcdc`,
      outline: 'none',
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
  },
}));

// .bar{
//   margin:0 auto;
//   width:575px;
//   border-radius:30px;
//   border:1px solid #dcdcdc;
// }
// .bar:hover{
//   box-shadow: 1px 1px 8px 1px #dcdcdc;
// }
// .bar:focus-within{
//   box-shadow: 1px 1px 8px 1px #dcdcdc;
//   outline:none;
// }
// .searchbar{
//   height:45px;
//   border:none;
//   width:500px;
//   font-size:16px;
//   outline: none;

// }
