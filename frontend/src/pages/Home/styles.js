import { blue, cyan, green, purple, red, teal } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

import { background } from '../../assets';

const colors = [purple, red, blue, green, teal, cyan];

export default makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.primary,
    justifyContent: 'center',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    minHeight: `calc(100vh - 210px)`,
    position: 'relative',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      padding: 'auto',
      fontSize: '15px',
    },
  },
  paperbkg: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    flexDirection: 'column',
    padding: theme.spacing(6, 2),
    boxShadow: '1px 1px 8px 1px',
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      padding: 'auto',
      fontSize: '15px',
      width: '75%',
    },
  },
  wrapper: {},
  search: {},
  // filter: {
  //   display: "flex",
  // },
  tagline: {
    color: colors[Math.floor(Math.random() * colors.length)][100],
    display: 'block',
    paddingTop: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      display: `block`,
      fontWeight: 'auto',
      fontSize: '90%',
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
