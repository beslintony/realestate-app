import { Avatar, Grid, Typography } from '@material-ui/core';
import { agentFeedbackStore, messagesStore, realestatesStore } from '../../store';

import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

// lists the communication partner for the user
const ChatList = ({ context, setMessageList }) => {
  const classes = useStyles();

  const setCurrentContext = messagesStore((state) => state.setCurrentContext);
  const currentContext = messagesStore((state) => state.currentContext);
  const getProperty = realestatesStore((state) => state.getProperty);
  const deleteEverything = agentFeedbackStore((state) => state.deleteEverything);

  const history = useHistory();

  const setMessages = async (context) => {
    const messages = await axios.get(`/api/messages/${context.Id}`);
    setMessageList(messages.data.data);
  };

  const image = context?.CommPicture ? ('/images/' + context?.CommPicture) : null;

  return (
    <>
      <div
        onClick={() => {
          // gets the messages and properties from context
          setCurrentContext(context);
          setMessages(context);
          getProperty(context?.Real_Estate_Id);
        }}
        role="button"
      >
        <Grid
          container
          className={
            currentContext?.Id === context.Id
              ? classes.selected
              : classes.chatList
          }
        >
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={2}>
                {
                  context.Agent_Id === context.CommPartnerId ?
                    <Avatar onClick={() => {
                      deleteEverything();
                      history.push(`/agents/${context.Agent_Id}`)
                    }} className={classes.chatImage} src={image} />
                    :
                    <Avatar onClick={() => history.push(`/agents/${context.Agent_Id}`)} className={classes.chatImage} src={image} />
                }
              </Grid>
              <Grid item xs={4}>
                <div className={classes.details}>
                  <Typography
                    className={classes.agentName}
                    component="h5"
                    variant="body1"
                  >
                    {context.CommPartner}
                  </Typography>
                  <Typography
                    className={classes.propertyName}
                    component="h5"
                    variant="body1"
                  >
                    {context.Realestate}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ChatList;
