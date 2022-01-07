import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  chatApp: {
    minHeight: `calc(100vh - 210px)`,
    display: 'flex',
  },

  chatMenu: {
    flex: 4.5,
    whiteSpace: 'nowrap',
  },
  chatBox: {
    flex: 7.5,
  },
  menuWrapper: {
    padding: '10px',
    height: '75vh',
  },
  chatWrapper: {
    padding: '10px',
    height: '60vh',
  },
  chatMessageTop: {
    padding: '10px',
    height: `95%`,
    overflowY: 'scroll',
    paddingRight: '10px',
    position: 'relative',
  },
  search: {
    width: '98%',
    padding: '10px 0',
  },
  chatList: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    cursor: 'pointer',
    '&:hover,&:focus': {
      backgroundColor: '#e6e6e6',
      borderRadius: theme.shape.borderRadius,
    },
  },
  selected: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    cursor: 'pointer',
    backgroundColor: '#e6e6e6',
    borderRadius: theme.shape.borderRadius,
  },
  chatImage: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  details: {
    paddingTop: theme.spacing(0.5),
    marginLeft: theme.spacing(5),
  },
  agentName: {
    fontWeight: '700',
  },

  propertyName: {},

  chat: {
    padding: theme.spacing(1),
    justify: 'flex-end',
    alignItems: 'flex-start',
  },

  own: {
    justify: 'flex-sart',
    alignItems: 'flex-end',
  },

  chatTop: {
    display: 'flex',
    alignItems: 'center',
  },

  userImage: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    margin: theme.spacing(0.5),
  },

  text: {
    backgroundColor: '#e6e6e6',
    color: 'inherit',
    display: 'flex',
    direction: 'column',
    padding: theme.spacing(0.5),
    borderRadius: '25px',
    maxWidth: '450px',
    paddingLeft: '2px',
  },

  ownText: {
    display: 'flex',
    direction: 'column',
    padding: theme.spacing(0.5),
    borderRadius: '25px',
    backgroundColor: '#1877f2',
    color: 'white',
    maxWidth: '450px',
    paddingLeft: '2px',
  },

  textInner: {
    margin: theme.spacing(1.5),
  },

  chatBottom: {
    display: 'flex',
  },

  chatTime: {
    fontSize: '12px',
  },

  chatBottomBox: {
    // marginTop: "-225px",
    display: 'flex',
    alignItems: 'center',
    jusifyContent: 'space-between',
    paddingRight: theme.spacing(2),
  },
  chatBottomInput: {
    width: '95%',
    height: '100px',
  },
  chatBottomSubmit: {
    // width: "50%",
    // height: "40px",
    cursor: 'pointer',
  },
  menuScroll: {
    padding: '10px',
    height: `90%`,
    overflowY: 'scroll',
    overflowX: 'hidden',
    paddingRight: '10px',
    position: 'relative',
  },
  chatListSpace: {
    paddingBottom: '4px',
  }
}));
