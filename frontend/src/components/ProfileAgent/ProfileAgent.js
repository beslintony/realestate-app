import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  Typography,
} from '@material-ui/core';
import { agentFeedbackStore, userStore } from '../../store';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useHistory, useParams, withRouter } from 'react-router-dom';

import AgentFeedback from './AgentFeedback';
import Loading from '../Loading/Loading';
import NotFound from '../NotFound/NotFound';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';

// default profile page for the user
const ProfileAgent = () => {
  const classes = useStyles();
  const userRole = userStore((state) => state.role);
  const { id } = useParams();
  const setAgentFeedbacks = agentFeedbackStore(
    (state) => state.setAgentFeedbacks,
  );
  const agentFeedbacks = agentFeedbackStore((state) => state.agentFeedbacks);
  const setAgentData = agentFeedbackStore((state) => state.setAgentData);
  const agentData = agentFeedbackStore((state) => state.agentData);
  const setUserFeedback = agentFeedbackStore((state) => state.setUserFeedback);
  const userFeedback = agentFeedbackStore((state) => state.userFeedback);
  const deleteFeedback = agentFeedbackStore((state) => state.deleteFeedback);
  const deleteEverything = agentFeedbackStore((state) => state.deleteEverything);

  const loading = agentFeedbackStore((state) => state.loading);

  const [val, setVal] = useState(false);
  const [hide, setHide] = useState(false);
  const [disable, setDisable] = useState(false);
  const [deleteFeed, setDeleteFeed] = useState(false);

  const history = useHistory();

  useEffect(() => {
    deleteEverything()
  }, [])

  useLayoutEffect(() => {
    setAgentData(id);
    setAgentFeedbacks(id);
    if (userStore.getState().currentAccessToken && (userRole?.role === "Customer")) {
      setUserFeedback(id);
      setDisable(false);
    }
    else {
      setDisable(true)
    }
    userFeedback?.length ? setHide(false) : setHide(true);
  }, [id, userRole?.role, hide, setAgentData, setAgentFeedbacks, setUserFeedback, userFeedback?.length]);

  useLayoutEffect(() => {
    if (!hide) {
      setAgentFeedbacks(id);
      setAgentData(id);
    }
  }, [hide, id, setAgentData, setAgentFeedbacks, val]);

  const deleteFeedFn = useCallback(() => {
    deleteFeed && deleteFeedback(userFeedback[0]?.Id);
    setHide(true);
  }, [deleteFeed, deleteFeedback, userFeedback]);

  useLayoutEffect(() => {
    deleteFeedFn()
  }, [deleteFeed])


  const CallDialog = () => {
    const handleClose = () => {
      setVal(false);
    };

    const Upload = (
      <div>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <AgentFeedback
              setAgentDialog={setVal}
              agentDialog={val}
              setHide={setHide}
              hide={hide}
            />
          </DialogContentText>
        </DialogContent>
      </div>
    );
    return (
      <div>
        <Dialog
          open={val}
          onClose={handleClose}
          aria-labelledby="alert-upload"
          aria-describedby="alert-upload-description"
        >
          {Upload}
        </Dialog>
      </div>
    );
  };

  // feedback pop up
  const updateFeedback = () => {
    setVal(true);
  };

  if (!loading && agentData.length === 0) {
    return <NotFound />;
  }

  return (
    <div className={classes.paper}>
      {loading ? (
        <Loading start={loading} />
      ) : (
        <>
          <Grid container direction="column">
            <Typography
              className={classes.topTitle}
              gutterBottom
              variant="h4"
              align="center"
              component="h5"
            >
              Profile of {agentData[0]?.Name}
            </Typography>
          </Grid>
          <Grid container direction="row">
            <Grid item xs={12} sm={5}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Grid item xs={12}>
                    <div className={classes.left}>
                      <Avatar
                        alt={agentData[0]?.Name}
                        src={agentData[0]?.Picture ? '/images/' + agentData[0]?.Picture : null}
                        variant="circular"
                        className={classes.xxl}
                      />
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.title}
                      >
                        {agentData[0]?.Name}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="h5"
                        className={classes.title}
                      >
                        {agentData[0]?.Company_Name}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className={classes.right}>
                      <Box
                        className={classes.rate}
                        component="fieldset"
                        mb={2}
                        borderColor="transparent"
                      >
                        <Typography component="legend">Rating</Typography>
                        <Rating
                          name="simple-controlled"
                          readOnly
                          precision={0.5}
                          value={
                            agentData && Number(agentData[0]?.Average_Rating)
                          }
                        />
                      </Box>
                    </div>
                    <Button
                      className={classes.button}
                      variant="outlined"
                      color="secondary"
                      disabled={disable}
                      onClick={() => {
                        userRole?.role === 'Customer'
                          ? updateFeedback()
                          : history.push('/signin');
                      }}
                    >
                      {!hide ? 'Update ' : 'Write A '}
                      Feedback
                    </Button>
                    {!hide ? (
                      <>
                        <Button
                          className={classes.button}
                          variant="contained"
                          color="secondary"
                          onClick={() => setDeleteFeed(true)}
                        >
                          Delete FeedBack
                        </Button>
                      </>
                    ) : null}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.feedbacks}>
                <Typography align="center" component="h2" variant="h5">
                  Feedbacks
                </Typography>
                <div className={classes.feedbackWrapper}>
                  <div className={classes.mediaComments}>
                    {agentFeedbacks.length && !loading
                      ? agentFeedbacks.map((feedback) => (
                        <div key={feedback?.Id} className={classes.mediaComment}>
                          <div
                            key={feedback?.Id}
                            className={classes.mediaCommentName}
                          >
                            <span>{feedback?.Customer_Name} </span>
                            <Rating
                              className={classes.mediaRate}
                              name="simple-controlled"
                              readOnly
                              precision={0.5}
                              value={Number(feedback?.Rating)}
                            />
                          </div>
                          <div>{feedback?.Comment}</div>
                        </div>
                      ))
                      : 'No Feedbacks Found'}
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          {loading && <Loading start={loading} />}
          <CallDialog />
        </>
      )}
    </div>
  );
};

export default withRouter(ProfileAgent);
