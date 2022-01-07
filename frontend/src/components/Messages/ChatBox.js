import { format } from 'timeago.js';

import { Avatar, Grid } from '@material-ui/core';

import useStyles from './styles';

// displays individual messages
const ChatBox = ({ message, own, ownPicture, commPicture }) => {
  const classes = useStyles();

  const image = own ? (ownPicture ? ('/images/' + ownPicture) : null) : (commPicture ? ('/images/' + commPicture) : null);

  return (
    <>
      <Grid
        container
        direction="column"
        className={own ? classes.own : classes.chat}
      >
        <Grid item xs={12} className={classes.chatTop}>
          <Avatar className={classes.userImage} src={image} />

          <div className={own ? classes.ownText : classes.text}>
            <p className={classes.textInner}>{message.Content}</p>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.chatBottom}>
          {/* converts the time  */}
          <span className={classes.chatTime}>{format(message.Datetime)}</span>
        </Grid>
      </Grid>
    </>
  );
};

export default ChatBox;
