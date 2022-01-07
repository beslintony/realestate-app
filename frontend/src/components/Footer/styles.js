import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  footer: {
    width: `100%`,
    color: 'white',
    overflow: 'hidden',
    zIndex: 1302,
    height: '100px',
    alignItems: 'center',
    backgroundColor: `#222`,
    // backgroundImage: `linear-gradient(215deg, #2f4353 0%, #d2ccc4 74%)`,
    paddingTop: theme.spacing(2),
  },
}));
