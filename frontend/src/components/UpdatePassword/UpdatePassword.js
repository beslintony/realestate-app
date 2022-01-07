import { useState } from 'react';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core/';

import { Loading } from '..';
import { userStore } from '../../store';
import useStyles from './styles';

// updates the password
const UpdatePass = () => {
  const loginLoading = userStore((state) => state.loginLoading);
  const loginStatus = userStore((state) => state.loginStatus);
  const setPassword = userStore((state) => state.setPassword);

  const initialValues = {
    // username: '',
    password: '',
    retypePassword: '',
  };

  const [val, setVal] = useState(false);
  const history = useHistory();
  // validation
  const validationSchema = yup.object({
    password: yup
      .string()
      .min(8, 'minimum 8 charachers required')
      .required('required'),
    retypePassword: yup
      .string()
      .oneOf([yup.ref('password')], "password don't match")
      .required('required'),
  });

  const CallDialog = () => {
    const handleClose = () => {
      setVal(false);
      setTimeout(() => history.push('/signout'), 500);
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
            You have updated password successfully
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You have successfully updated your password. Please login to access
              your profile page. You will be redireced to the signin page
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

  const onSubmit = (values, props) => {
    // password to be sent to the api
    const user = {
      password: values.password,
    };
    setPassword(user);
    props.setSubmitting();
    props.resetForm();
    loginLoading ? <Loading start={loginLoading} /> : setVal(true);
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Update Password
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
                name="password"
                label="New Password"
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
                label="Retype New Password"
                type="password"
                id="retypePassword"
                autoComplete="current-password"
                error={
                  props.touched.retypePassword && props.errors.retypePassword
                }
                helperText={<ErrorMessage name="retypePassword" />}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={props.isSubmitting}
                className={classes.submit}
              >
                {props.isSubmitting ? (
                  <Loading start={loginLoading} />
                ) : (
                  'Confirm'
                )}
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

export default UpdatePass;
