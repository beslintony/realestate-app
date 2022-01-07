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
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { ProfilePicture, Loading } from '../';
import { imageStore, registrationStore } from '../../store';
import useStyles from './styles';

// registration page for the agent
const RegisterAgent = () => {
  const isRegisterLoading = registrationStore((state) => state.registerLoading);
  const registerStatus = registrationStore((state) => state.registerStatus);
  const setRegisterAgent = registrationStore((state) => state.setRegisterAgent);
  const images = imageStore((state) => state.files);

  // intial values
  const initialValues = {
    username: '',
    password: '',
    retypePassword: '',
    company: 1,
    verification: null,
    terms: 'false',
  };

  const [val, setVal] = useState(false);
  const history = useHistory();

  // validation schema for the form
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
    company: yup
      .string()
      .required('required')
      .matches(/^[0-9]+$/, 'please select a company'),
    verification: yup
      .string()
      .required('required')
      .matches(/^[0-9]+$/, 'must contain only digits'),
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
    // success
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
      // already exits username or password
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
    }
    else if (registerStatus === 401) {
      // verification code is not correct
      Success = (
        <div>
          <DialogTitle id="alert-signup">Verificaton Code incorrect</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The verification code of the company is incorrect!
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
    else if (registerStatus === 500) {
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
  // fire on the submit event of the form
  const onSubmit = (values, props) => {
    const data = new FormData();
    data.append('username', values.username);
    data.append('password', values.password);
    data.append('company', values.company);
    data.append('verification', values.verification);
    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i]);
    }
    setRegisterAgent(data);
    props.setSubmitting();
    props.resetForm();
    isRegisterLoading ? <Loading start={isRegisterLoading} /> : setVal(true);
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
              <Field
                as={TextField}
                variant="outlined"
                select
                margin="normal"
                fullWidth
                name="company"
                label="Company"
                id="company"
                helperText={<ErrorMessage name="company" />}
                error={props.touched.company && props.errors.company}
              >
                <MenuItem value={1}>SF State Homes</MenuItem>
                <MenuItem value={2}>SJ State Realtors</MenuItem>
                <MenuItem value={3}>Fulda RealEstate</MenuItem>
              </Field>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="verification"
                label="Verification Code"
                id="verification"
                helperText={<ErrorMessage name="verification" />}
                error={props.touched.verification && props.errors.verification}
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
              {/*button */}
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
        {/* registration loading */}
        {isRegisterLoading !== false ? (
          <Loading start={isRegisterLoading} />
        ) : (
          // pop up
          <CallDialog />
        )}
      </div>
    </Container>
  );
};

export default RegisterAgent;
