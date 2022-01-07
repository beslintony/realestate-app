import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { Loading, NotFound, SellProperty } from '../';
import { messagesStore, realestatesStore, userStore } from '../../store';
import { useEffect, useRef, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';

import Alert from '@material-ui/lab/Alert';
import ChatBox from './ChatBox';
import ChatList from './ChatList';
import socket from '../../Socket';
import useStyles from './styles';
import axios from 'axios';

// message components
const Messages = () => {
  const userRole = userStore((state) => state.role);
  const { role } = useParams();
  const classes = useStyles();
  const setContexts = messagesStore((state) => state.setAllcontexts);
  const allContexts = messagesStore((state) => state.allContexts);
  const currentContext = messagesStore((state) => state.currentContext);
  const setCurrentContext = messagesStore((state) => state.setCurrentContext);
  const sendMessages = messagesStore((state) => state.setSendMessage);
  const getProperty = realestatesStore((state) => state.getProperty);
  const propertyStatus = realestatesStore((state) => state.propertyStatus);
  const properties = realestatesStore((state) => state.property);
  const sellProperty = realestatesStore((state) => state.sellProperty);

  const newMessage = messagesStore((state) => state.newMessage);
  const setNewMessage = messagesStore((state) => state.setNewMessage);

  const loading = realestatesStore((state) => state.isloading);
  const scroll = useRef();
  const [val, setVal] = useState(false);
  const [Status, setStatus] = useState();

  const [messageList, setMessageList] = useState([]);

  // checks for role in url
  let currentUserRole = null;
  // grants no access to admin
  if (
    userRole?.role.toLowerCase() === role.toLowerCase() &&
    userRole?.role.toLowerCase() !== 'administrator'
  ) {
    currentUserRole = role;
  }
  // loads socket "message"
  useEffect(() => {
    sendMessages &&
      socket.on('message', (message) => {
        if (currentContext && currentContext.Id === message.ContextId) {
          setNewMessage(false);
          setMessageList((messageList) => [...messageList, message]);
        }
      });

    return () => {
      socket.off('message');
    };
  }, [sendMessages, setNewMessage, currentContext, newMessage]);

  // loads setcontexts
  useEffect(() => {
    setContexts();

    return () => {
      setCurrentContext(null);
    };
  }, [setContexts, setCurrentContext]);

  // loads propertylists
  useEffect(() => {
    propertyStatus && getProperty(currentContext?.Real_Estate_Id);
    setStatus(propertyStatus);

  }, [currentContext?.Real_Estate_Id, getProperty, propertyStatus]);

  // scroll into the current message
  useEffect(() => {
    scroll.current?.scrollIntoView({
      behavior: 'instant',
      block: 'end',
    });
  }, [messageList, currentContext]);

  // profile data
  const getProfile = userStore((state) => state.getProfile);
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getProfileData = async () => {
      let profile = await getProfile();
      setUsername(profile.data.Name);
      setImage(profile.data.Picture);
    }
    getProfileData();
  }, [getProfile]);

  // initial form values
  const initialValues = {
    chatInput: '',
    submitBttn: '',
  };
  // sender and reciever of the message
  let sender = null;
  let receiver = null;

  if (userRole?.role.toLowerCase() === 'customer') {
    sender = currentContext?.Customer_Id;
    receiver = currentContext?.Agent_Id;
  } else if (userRole?.role.toLowerCase() === 'agent') {
    sender = currentContext?.Agent_Id;
    receiver = currentContext?.Customer_Id;
  }
  // Pop up for selling the property
  const CallDialog = () => {
    const handleClose = () => {
      setVal(false);
    };

    const sellDialog = (
      <div>
        <DialogTitle id="alert-sellDialog">
          Sell / Rent {currentContext?.Realestate} to{' '}
          {currentContext?.CommPartner}{' '}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <SellProperty currentContext={currentContext} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
          <Button
            onClick={() => {
              const price = {
                payment: Number(
                  properties[0]?.Price + properties[0]?.Additional_Costs,
                ),
              };
              sellProperty(currentContext?.Id, price);
              const msg = `This property has been sold to you by Agent, ${username} \n - HRE Team`;
              const message = {
                Content: msg,
                SenderId: sender,
                Sender: username,
                ReceiverId: receiver,
                ContextId: currentContext?.Id,
              };
              sendMessages(
                messagesStore.getState()?.currentContext?.Id,
                message,
              );
              setMessageList((messageList) => [...messageList, message]);
              getProperty(currentContext?.Real_Estate_Id);
              setCurrentContext(currentContext);
              setStatus(404);
              setVal(false);
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </div>
    );

    return (
      <div>
        <Dialog
          open={val}
          onClose={handleClose}
          aria-labelledby="alert-sellDialog"
          aria-describedby="alert-sellDialog-description"
        >
          {sellDialog}
        </Dialog>
      </div>
    );
  };
  // form submission
  const onSubmit = (values, props) => {
    props.resetForm();
    if (values.submitBttn === 'type1') {
      getProperty(currentContext?.Real_Estate_Id);

      loading === false ? setVal(true) : <Loading start={loading} />;
    }

    if (values.submitBttn === 'type2') {
      const message = {
        Content: values.chatInput,
        SenderId: sender,
        Sender: username,
        ReceiverId: receiver,
        ContextId: currentContext?.Id,
      };
      sendMessages(messagesStore.getState()?.currentContext?.Id, message);
      setMessageList((messageList) => [...messageList, message]);

      socket.emit('message', message);
    }
  };

  return (
    <>
      {/* if there exits a user */}
      {currentUserRole !== null ? (
        <>
          <div className={classes.chatApp}>
            <Grid container>
              <Grid item xs={4} className={classes.chatMenu}>
                <div className={classes.menuWrapper}>
                  <Typography variant="h5" component="h2">
                    Chats
                  </Typography>
                  <div className={classes.menuScroll}>
                    {allContexts?.map((context, index) => (
                      <div className={classes.chatListSpace}>
                        <ChatList
                          key={index}
                          context={context}
                          setMessageList={setMessageList}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Grid>
              <Grid item xs={8} className={classes.chatBox}>
                <Grid container className={classes.chatWrapper}>
                  {Status === 404 ? (
                    <Alert
                      style={{
                        width: '100%',
                        textAlign: 'center',
                        justifyContent: 'center',
                      }}
                      variant="filled"
                      severity="warning"
                    >
                      This real esatate has been removed from the market!
                    </Alert>
                  ) : null}
                  <Grid item xs={12} className={classes.chatMessageTop}>
                    {messageList.map((message) => (
                      <>
                        <div key={message.Id} ref={scroll}>
                          <ChatBox
                            key={message.Id}
                            message={message}
                            own={message.Sender === username}
                            ownPicture={image}
                            commPicture={allContexts?.find(element => element.Id === currentContext?.Id)?.CommPicture}
                          />
                        </div>
                      </>
                    ))}
                  </Grid>
                </Grid>
                {currentContext === null ? null : (
                  <div>
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                      {(props) => (
                        <Form>
                          <Grid
                            container
                            className={classes.chatBottomBox}
                            justify="space-between"
                            alignItems="center"
                          >
                            <Grid item xs={10}>
                              <Field
                                as={TextField}
                                className={classes.chatBottomInput}
                                variant="outlined"
                                margin="normal"
                                multiline
                                rows={2}
                                fullWidth
                                name="chatInput"
                                id="chatInput"
                              />
                            </Grid>
                            <Grid
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                              item
                              xs={2}
                            >
                              {currentUserRole === 'agent' &&
                                properties[0]?.Status_Id === 3 &&
                                Status !== 404 ? (
                                <>
                                  <Button
                                    className={classes.chatBottomSubmit}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                      props.setFieldValue(
                                        'submitBttn',
                                        'type1',
                                      );
                                    }}
                                  >
                                    Sell
                                  </Button>
                                  <div
                                    style={{
                                      paddingBottom: '4px',
                                    }}
                                  ></div>
                                </>
                              ) : null}
                              <Button
                                className={classes.chatBottomSubmit}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  props.setFieldValue('submitBttn', 'type2');
                                }}
                              >
                                send
                              </Button>
                            </Grid>
                          </Grid>
                        </Form>
                      )}
                    </Formik>
                  </div>
                )}
              </Grid>
            </Grid>
          </div>
        </>
      ) : (
        <NotFound /> // if there is no user / not loged in
      )}
      {/* calls the popup dialog */}
      <CallDialog />
    </>
  );
};

export default withRouter(Messages);
