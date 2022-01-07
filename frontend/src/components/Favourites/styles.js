import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    minHeight: `calc(100vh - 210px) !important`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    flexGrow: 1,
  },

  mainContent: {
    minHeight: `calc(100vh - 210px) !important`,
    padding: theme.spacing(2),
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },

}));
