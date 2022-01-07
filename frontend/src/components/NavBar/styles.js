import { makeStyles } from '@material-ui/core/styles';
import { purple, red, blue, green, teal, cyan } from '@material-ui/core/colors';

const colors = [purple, red, blue, green, teal, cyan];
export default makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'transparent',
    color: 'darkblue',
    boxShadow: 'none',
    height: '65px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.up('sm')]: {
      width: `auto`,
    },
  },
  title: {
    textDecoration: 'none',
    paddingTop: '15px',
    paddingBottom: '11px',
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    '&:hover,&:focus': {
      textDecoration: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      fontWeight: 'auo',
    },
  },
  image: {
    marginRight: '1px',
  },
  grow: {
    flexGrow: 1,
  },
  displayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  navList: {
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: 'center',
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: 'inherit',
    fontWeight: '500',
    flexGrow: 1,
  },
  sideBarLinkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: 'inherit',
    fontWeight: '500',
    flexGrow: 1,
  },
  sideBar: {
    background: '#053742',
    flexGrow: 1,
    width: 250,
    color: '#E8F0F2',
  },
  list: {
    color: '#E8F0F2',
    borderRadius: '20px',
    padding: '10px',
    fontWeight: 600,
    '&:hover,&:focus': {
      textDecoration: 'none',
      color: '#053742',
      backgroundColor: '#E8F0F2',
    },
  },
  linkText2: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `inherit`,
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center',
    },
  },
  logout: {
    marginLeft: '20px',
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `inherit`,
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  colorful: {
    color: theme.palette.getContrastText(
      colors[Math.floor(Math.random() * colors.length)][500],
    ),
    backgroundColor: colors[Math.floor(Math.random() * colors.length)][500],
  },
}));
