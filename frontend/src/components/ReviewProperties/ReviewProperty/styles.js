import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    // paddingTop: theme.spacing(8),
    // margin: theme.spacing(8),
    // width: '100%',
    minHeight: `calc(100vh - 271px) !important`,
    borderRadius: '12px',
  },
  header: {
    marginTop: theme.spacing(5),
  },

  container: {
    maxHeight: 440,
  },

  button: {
    margin: theme.spacing(1),
  },

  appBar: {
    position: 'relative',
    backgroundColor: '##FFFFFF',
    boxShadow: ` 0px 0px 2px 0px #dcdcdc`,
  },

  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
