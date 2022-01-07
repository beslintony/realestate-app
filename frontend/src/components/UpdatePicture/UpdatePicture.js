import { useState } from 'react';

import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core/';

import { Loading, ProfilePicture } from '..';
import { imageStore, userStore } from '../../store';
import useStyles from './styles';

// update porfile picture
const UpdatePicture = () => {
  const loginLoading = userStore((state) => state.loginLoading);
  const loginStatus = userStore((state) => state.loginStatus);
  const setPicture = userStore((state) => state.setPicture);

  const images = imageStore((state) => state.files);

  const [val, setVal] = useState(false);
  const history = useHistory();

  const initialValues = {
    box: ''
  };

  const CallDialog = () => {
    const handleClose = () => {
      setVal(false);
      window.location.reload();
    };

    const handleError = () => {
      setVal(false);
      setTimeout(() => history.push('/signout'), 500);
    };

    let Success;

    if (loginStatus === 200) {
      Success = (
        <div>
          <DialogTitle id="alert-signup">
            You have updated the profile picture successfully
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </div>
      );
    } else if (loginStatus === 500) {
      Success = (
        <div>
          <DialogTitle id="alert-signup">Something Went Wrong</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Something went wrong on our side. Please try again or come back
              later.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleError} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </div>
      );
    }

    return (
      <div>
        <Dialog
          open={val}
          onClose={handleClose}
          aria-labelledby="alert-signup"
          aria-describedby="alert-signup-description"
        >
          {Success}
        </Dialog>
      </div>
    );
  };

  const onSubmit = () => {
    const data = new FormData();
    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i]);
    }
    setPicture(data);
    loginLoading ? <Loading start={loginLoading} /> : setVal(true);
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Update Profile Picture
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <Box name="box">
                <Grid container jusify="center" alignItems="center">
                  <Grid item xs={12}>
                    <ProfilePicture />
                  </Grid>
                </Grid>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Confirm
              </Button>
            </Form>
          )}
        </Formik>
        {loginLoading !== false ? (
          <Loading start={loginLoading} />
        ) : (
          <CallDialog />
        )}
      </div>
    </Container>
  );
};

export default UpdatePicture;
