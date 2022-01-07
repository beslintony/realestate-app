import { useEffect, useState } from 'react';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@material-ui/core/';

import StarBorderIcon from '@material-ui/icons/StarBorder';

import { Loading } from '../';
import { agentFeedbackStore } from '../../store';
import useStyles from './AgentFeedbackStyles';
import Rating from '@material-ui/lab/Rating';

const AgentFeedback = ({ setAgentDialog, agentDialog, setHide, hide }) => {
  const { id } = useParams();

  const loading = agentFeedbackStore((state) => state.loading);
  const setUserFeedback = agentFeedbackStore((state) => state.setUserFeedback);
  const userFeedback = agentFeedbackStore((state) => state.userFeedback);
  const setFeedback = agentFeedbackStore((state) => state.setFeedback);
  const updateFeedback = agentFeedbackStore((state) => state.updateFeedback);
  const setAgentFeedbacks = agentFeedbackStore((state) => state.setAgentFeedbacks);

  const [rate, setRate] = useState(null);

  useEffect(() => {
    if (agentDialog === false) {
      setUserFeedback(id);
      setHide(true);
    }
  }, [agentDialog, id, setAgentFeedbacks, setHide, setUserFeedback, hide]);

  useEffect(() => {
    if (agentDialog === false) {
      setAgentFeedbacks(id);
    }
  }, [id, setAgentFeedbacks, agentDialog]);

  const initialValues = {
    feedback: userFeedback[0]?.Comment ? userFeedback[0]?.Comment : '',
    rate: Number(userFeedback[0]?.Rating) ? Number(userFeedback[0]?.Rating) : 0,
  };

  // validation
  const validationSchema = yup.object({
    feedback: yup
      .string()
      .max(100, 'Sorry! Characters out of range')
      .required('required'),
    rate: yup.number().required('required'),
  });


  const onSubmit = (values, props) => {
    // feedback to be sent to the api
    const feedbackUpdate = {
      comment: values.feedback,
      rating: rate ? rate : values.rate,
    };
    const feedback = {
      comment: values.feedback,
      rating: rate ? rate : values.rate,
      agentId: id,
    };
    console.log(feedbackUpdate);
    if (userFeedback?.length) {
      updateFeedback(userFeedback[0]?.Id, feedbackUpdate);
      setAgentDialog(false);
      setHide(false);
      props.setSubmitting();
      window.location.reload();
    } else {
      setFeedback(feedback);
      setAgentDialog(false);
      setHide(false);
      props.setSubmitting();
      window.location.reload();
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Feedback
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <Box component="fieldset" borderColor="transparent">
                <Typography component="legend" variant="body2">
                  Rating
                </Typography>
                <Rating
                  id="rate"
                  name="rate"
                  defaultValue={props.initialValues.rate}
                  onChange={(e) => setRate(e.target.value)}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                />
              </Box>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                multiline
                rows={3}
                rowsMax={6}
                fullWidth
                name="feedback"
                label="Add Feedback"
                id="feedback"
                helperText={<ErrorMessage name="feedback" />}
                error={props.touched.feedback && props.errors.feedback}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={props.isSubmitting}
                className={classes.submit}
              >
                {props.isSubmitting ? <Loading start={loading} /> : 'Confirm'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default AgentFeedback;
