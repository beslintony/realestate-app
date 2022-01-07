import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.primary,
    justifyContent: 'center',
    backgroundSize: 'cover',
    // height: `100vh`,
    minHeight: `calc(100vh - 210px)`,
    maxWidth: '100vw',
    position: 'relative',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    flexGrow: 1,
    // paddingBottom: theme.spacing(10),
  },
  paperbkg: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    flexDirection: 'column',
    padding: theme.spacing(6, 2),
    boxShadow: '1px 1px 8px 1px',
  },
  wrapper: {},
  search: {},
  // filter: {
  //   display: "flex",
  // },
  tagline: {
    color: 'white',
    display: 'block',
    paddingTop: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      fontWeight: 'auto',
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
