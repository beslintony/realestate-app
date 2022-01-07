import { useState } from 'react';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { ProfilePicture, Loading } from '../';
import { imageStore, registrationStore } from '../../store';
import useStyles from './styles';

// user registration form
const RegisterUser = () => {
  const isRegisterLoading = registrationStore((state) => state.registerLoading);
  const registerStatus = registrationStore((state) => state.registerStatus);
  const setRegister = registrationStore((state) => state.setRegister);
  const images = imageStore((state) => state.files);

  // inital values for the from
  const initialValues = {
    username: '',
    password: '',
    retypePassword: '',
    terms: 'false',
  };

  const [val, setVal] = useState(false);
  const history = useHistory();

  // validation of the form
  const validationSchema = yup.object({
    username: yup
      .string()
      .min(5, 'minimum 5 charachers required')
      .required('required'),
    password: yup
      .string()
      .min(8, 'minimum 8 charachers required')
      .required('required'),
    retypePassword: yup
      .string()
      .oneOf([yup.ref('password')], "password don't match")
      .required('required'),
    terms: yup
      .string()
      .oneOf(['true'], 'Please accept our terms and conditions before Sign Up')
      .required('required'),
  });

  // pop up message
  const CallDialog = () => {
    const handleClose = () => {
      setVal(false);
      setTimeout(() => history.push('/signin'), 500);
    };

    const handleError = () => {
      setVal(false);
      setTimeout(() => history.push('/'), 500);
    };

    const handle409 = () => {
      setVal(false);
      setTimeout(() => history.push('/signin'), 500);
    };
    let Success;
    // ok?
    if (registerStatus === 200) {
      Success = (
        <div>
          <DialogTitle id="alert-signup">
            You have Signed Up Successfully
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your account has been created successfully. Please login to access
              your profile page.You will be redireced to the signin page
              shortly!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </div>
      );
    } else if (registerStatus === 409) {
      // already exits
      Success = (
        <div>
          <DialogTitle id="alert-signup">The User Exits Already</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              There exists already a user. Please login to access your profile
              page.You will be redireced to the signin page shortly!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handle409} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </div>
      );
    } else if (registerStatus === 500) {
      // server error
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

  const onSubmit = (values, props) => {
    const data = new FormData();
    data.append('username', values.username);
    data.append('password', values.password);
    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i]);
    }

    setRegister(data);
    props.setSubmitting();
    props.resetForm();
    if (isRegisterLoading) return <Loading start={isRegisterLoading} />;
    else setVal(true);
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                helperText={<ErrorMessage name="username" />}
                error={props.touched.username && props.errors.username}
              />
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={props.touched.password && props.errors.password}
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="retypePassword"
                label="Retype password"
                type="password"
                id="retypePassword"
                autoComplete="current-password"
                error={
                  props.touched.retypePassword && props.errors.retypePassword
                }
                helperText={<ErrorMessage name="retypePassword" />}
              />
              <Box>
                <Grid container jusify="center" alignItems="center">
                  <Grid item xs={12}>
                    <ProfilePicture />
                  </Grid>
                </Grid>
              </Box>
              <FormControlLabel
                control={<Field as={Checkbox} name="terms" color="primary" />}
                label="I agree to the terms and conditions"
              />
              <FormHelperText style={{ color: 'red' }}>
                <ErrorMessage name="terms" />
              </FormHelperText>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={props.isSubmitting}
                className={classes.submit}
              >
                {props.isSubmitting ? (
                  <Loading start={isRegisterLoading} />
                ) : (
                  'Sign up'
                )}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/signin">Sign in</Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        {/*loading */}
        {isRegisterLoading !== false ? (
          <Loading start={isRegisterLoading} />
        ) : (
          <CallDialog />
        )}
      </div>
    </Container>
  );
};

export default RegisterUser;
