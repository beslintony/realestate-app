import { useState } from 'react';

import { Field, Form, Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';

import {
  Avatar,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { Loading } from '../../components';
import { userStore } from '../../store';
import useStyles from './styles';

// sign in page
const SignIn = () => {
  const history = useHistory();
  const [val, setVal] = useState(false);

  const isLoginLoading = userStore((state) => state.loginLoading);
  const loginStatus = userStore((state) => state.loginStatus);
  const setLogin = userStore((state) => state.login);
  const setRedirects = userStore((state) => state.setRedirects);

  const classes = useStyles();

  const initialValues = {
    username: '',
    password: '',
  };

  const CallDialog = () => {
    const handleClose = () => {
      setVal(false);
      setTimeout(() => {
        if (userStore.getState().redirect) {
          history.push(userStore.getState().redirect);
          setRedirects(null);
        } else window.location.reload();
      }, 500);
    };

    const handleError = () => {
      setVal(false);
      setTimeout(() => history.push('/'), 500);
    };

    const handle401 = () => {
      setVal(false);
      setTimeout(() => history.push('/signin'), 500);
    };
    let Success;
    if (loginStatus === 200) {
      Success = (
        <div>
          <DialogTitle id="alert-signup">
            You have Signed In Successfully
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You will be redirected to the respective page shortly!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </div>
      );
    } else if (loginStatus === 401) {
      Success = (
        <div>
          <DialogTitle id="alert-signup">
            The Username or Password is Wrong
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please try again!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handle401} color="primary" autoFocus>
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
              Something went wrong on our side.Please try again or come back
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

  const handleSubmit = (values, props) => {
    const user = {
      username: values.username,
      password: values.password,
    };
    setLogin(user);
    isLoginLoading ? <Loading start={isLoginLoading} /> : setVal(true);
    props.setSubmitting();
    props.resetForm();
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(props) => (
            <Form>
              <div className={classes.form}>
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoFocus
                />
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {props.isSubmitting ? (
                    <Loading start={isLoginLoading} />
                  ) : (
                    'Sign In'
                  )}
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to="/signup">
                      Don&apos;t have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </Form>
          )}
        </Formik>
        {isLoginLoading !== false ? (
          <Loading start={isLoginLoading} />
        ) : (
          <CallDialog />
        )}
      </div>
    </Container>
  );
};

export default SignIn;
