import React, { useEffect, useState } from 'react';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Switch } from 'formik-material-ui';
import { useHistory, useParams, withRouter } from 'react-router-dom';
import * as Yup from 'yup';

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from '@material-ui/core';

import { DragNDrop, Loading } from '../';
import { agentOverviewStore, imageStore } from '../../store';
import useStyles from './styles';

// edit property component
const EditProperty = () => {
  const classes = useStyles();
  const [val, setVal] = useState(false);
  const history = useHistory();
  const property = agentOverviewStore((state) => state.property);
  const editRealestate = agentOverviewStore((state) => state.editProperty);
  const getProperty = agentOverviewStore(
    (state) => state.getSingleAgentProperty,
  );
  const status = agentOverviewStore((state) => state.status);
  const loading = agentOverviewStore((state) => state.loading);
  const { id } = useParams();
  const images = imageStore((state) => state.files);
  const setImages = imageStore((state) => state.setFiles);

  //loads the property using api call with id for every change in id
  useEffect(() => {
    getProperty(id);
  }, [id, getProperty]);

  // fires at every change in id and loading state
  useEffect(() => {
    loading && getProperty(id);
  }, [id, getProperty, loading]);

  // destructuring  offfer method to string values
  const initOfferMethod = (val) => {
    if (val === 1) return 'sale';
    if (val === 2) return 'rent';
    else return '';
  };

  // initial values for the form data
  const initialValues = {
    title: property[0]?.Title,
    description: property[0]?.Description,
    street: property[0]?.Street,
    houseNumber: property[0]?.House_Number,
    postcode: property[0]?.Postcode,
    city: property[0]?.City,
    rooms: property[0]?.Room_Number,
    offerMethod: initOfferMethod(property[0]?.Offer_Method),
    price: property[0]?.Price,
    additionalCosts: property[0]?.Additional_Costs,
    internetSpeed: property[0]?.Internet_Speed,
    area: property[0]?.Size,
    balcony: property[0]?.Balcony,
    garden: property[0]?.Garden,
    internetService: property[0]?.Internet_Service,
    garage: property[0]?.Garage,
    furnished: property[0]?.Furnished,
  };
  // validationschema for the form
  const validationSchema = Yup.object({
    title: Yup.string().required('required').max(500),
    description: Yup.string().required('required'),
    street: Yup.string().required('required').max(50),
    houseNumber: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'must be a number')
      .min(1, 'minimum 1 digit'),
    postcode: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'must contain only digits')
      .min(5, 'must be exactly 5 digits')
      .max(5, 'must be exactly 5 digits'),
    city: Yup.string().required('required'),
    rooms: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'must be a number')
      .max(4, 'maximum 4 digits'),
    offerMethod: Yup.string('please select a method').required('required'),
    price: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'must be a number')
      .max(10, 'maximum 10 digits'),
    additionalCosts: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'must be a number')
      .max(6, 'maximum 6 digits'),
    internetSpeed: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'must be a number')
      .max(6, 'maximum 6 digits'),
    area: Yup.string()
      .required()
      .matches(/^\d*[.{1}\d*]\d*$/, 'must be a number')
      .max(6, 'maximum 6 digits'),
    balcony: Yup.bool().required('required'),
    garden: Yup.bool().required('required'),
    internetService: Yup.bool().required('required'),
    garage: Yup.bool().required('required'),
    furnished: Yup.bool().required('required'),
  });

  // fires at the onclick event of the submit button
  const handleSubmit = (values, props) => {
    // datas to be posted to the server
    const data = new FormData();
    data.append('title', values.title);
    data.append('description', values.description);
    data.append('street', values.street);
    data.append('houseNumber', values.houseNumber);
    data.append('postcode', values.postcode);
    data.append('city', values.city);
    data.append('rooms', values.rooms);
    data.append('offerMethod', values.offerMethod);
    data.append('price', values.price);
    data.append('additionalCosts', values.additionalCosts);
    data.append('internetSpeed', values.internetSpeed);
    data.append('area', values.area);
    data.append('balcony', values.balcony);
    data.append('garden', values.garden);
    data.append('internetService', values.internetService);
    data.append('garage', values.garage);
    data.append('furnished', values.furnished);
    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i]);
    }

    editRealestate(id, data);

    loading ? <Loading start={loading} /> : setVal(true);
    props.setSubmitting();
    setImages(null);
  };

  // pop up message for the data
  const CallDialog = () => {
    const handleClose = () => {
      setVal(false);
      history.push('/agent/overview');
    };
    let Success;
    // if success
    if (status === 200) {
      Success = (
        <div>
          <DialogTitle id="alert-signup">Property Edited</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You have updated the real estate successfully! It will be sent to
              Administrator for further review.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setVal(false);
                history.push('/agent/overview');
              }}
              color="primary"
              autoFocus
            >
              Overview
            </Button>
            <Button
              onClick={() => {
                setVal(false);
                history.push('/agent/dashboard');
              }}
              color="primary"
            >
              DashBoard
            </Button>
          </DialogActions>
        </div>
      );
    } // server error occured
    else if (status === 500) {
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
            <Button
              onClick={() => {
                setVal(false);
                history.push('/agent/dashboard');
              }}
              color="primary"
              autoFocus
            >
              DashBoard
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

  return (
    <Container component="main" maxWidth="lg">
      <br></br>
      <Typography variant="h4">Edit Property</Typography>
      <br></br>
      <Grid container justify="space-between" spacing={2}>
        {loading !== false ? (
          <Loading start={loading} />
        ) : (
          <>
            <Grid item xs={12}>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {(props) => (
                  <Form>
                    {/* Form fields for the edit proprerty */}
                    <Grid container justify="space-between" spacing={2}>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="title"
                          label="Add Title"
                          name="title"
                          autoFocus
                          helperText={<ErrorMessage name="title" />}
                          error={props.touched.title && props.errors.title}
                        />
                        <Field
                          as={TextField}
                          variant="outlined"
                          margin="normal"
                          multiline
                          rows={8}
                          rowsMax={45}
                          fullWidth
                          name="description"
                          label="Add Description"
                          id="description"
                          helperText={<ErrorMessage name="description" />}
                          error={
                            props.touched.description &&
                            props.errors.description
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          as={TextField}
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          name="street"
                          label="Add Street Name"
                          id="street"
                          helperText={<ErrorMessage name="street" />}
                          error={props.touched.street && props.errors.street}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          as={TextField}
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          name="houseNumber"
                          label="Add House Number"
                          id="houseNumber"
                          helperText={<ErrorMessage name="houseNumber" />}
                          error={
                            props.touched.houseNumber &&
                            props.errors.houseNumber
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          as={TextField}
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          name="postcode"
                          label="Add Post Code"
                          id="postcode"
                          error={
                            props.touched.postcode && props.errors.postcode
                          }
                        />
                        <FormHelperText style={{ color: '#FF0000' }}>
                          <ErrorMessage name="postcode" />
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          as={TextField}
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          name="city"
                          label="Add City"
                          id="city"
                          helperText={<ErrorMessage name="city" />}
                          error={props.touched.city && props.errors.city}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          as={TextField}
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          name="rooms"
                          label="Add Number of Rooms"
                          id="rooms"
                          helperText={<ErrorMessage name="rooms" />}
                          error={props.touched.rooms && props.errors.rooms}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          as={TextField}
                          variant="outlined"
                          select
                          margin="normal"
                          fullWidth
                          name="offerMethod"
                          label="Property For Sale or For Rent"
                          id="offerMethod"
                          helperText={<ErrorMessage name="offerMethod" />}
                          error={
                            props.touched.offerMethod &&
                            props.errors.offerMethod
                          }
                        >
                          <MenuItem value={'rent'}>For Rent</MenuItem>
                          <MenuItem value={'sale'}>For Sale</MenuItem>
                        </Field>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl
                          fullWidth
                          margin="normal"
                          variant="outlined"
                        >
                          <InputLabel htmlFor="price">Price</InputLabel>
                          <Field
                            as={OutlinedInput}
                            id="price"
                            name="price"
                            error={props.touched.price && props.errors.price}
                            startAdornment={
                              <InputAdornment position="start">
                                €
                              </InputAdornment>
                            }
                            labelWidth={40}
                          />
                        </FormControl>
                        <FormHelperText style={{ color: '#FF0000' }}>
                          <ErrorMessage name="price" />
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl
                          fullWidth
                          margin="normal"
                          variant="outlined"
                        >
                          <InputLabel htmlFor="additionalCosts">
                            Additional Costs
                          </InputLabel>
                          <Field
                            as={OutlinedInput}
                            id="additionalCosts"
                            name="additionalCosts"
                            error={
                              props.touched.additionalCosts &&
                              props.errors.additionalCosts
                            }
                            startAdornment={
                              <InputAdornment position="start">
                                €
                              </InputAdornment>
                            }
                            labelWidth={120}
                          />
                        </FormControl>
                        <FormHelperText style={{ color: '#FF0000' }}>
                          <ErrorMessage name="additionalCosts" />
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel htmlFor="internetSpeed">
                            Internet Speed
                          </InputLabel>
                          <Field
                            as={OutlinedInput}
                            id="internetSpeed"
                            name="internetSpeed"
                            error={
                              props.touched.internetSpeed &&
                              props.errors.internetSpeed
                            }
                            startAdornment={
                              <InputAdornment position="end">
                                {' '}
                                Mbps{' '}
                              </InputAdornment>
                            }
                            labelWidth={120}
                          />
                        </FormControl>
                        <FormHelperText style={{ color: '#FF0000' }}>
                          <ErrorMessage name="internetSpeed" />
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel htmlFor="area">
                            Area of the Property
                          </InputLabel>
                          <Field
                            as={OutlinedInput}
                            id="area"
                            name="area"
                            error={props.touched.area && props.errors.area}
                            startAdornment={
                              <InputAdornment position="end">
                                Sq.M.
                              </InputAdornment>
                            }
                            labelWidth={155}
                          />
                        </FormControl>
                        <FormHelperText style={{ color: '#FF0000' }}>
                          <ErrorMessage name="area" />
                        </FormHelperText>
                      </Grid>
                      <Grid container className={classes.bottom}>
                        <Box>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="body"
                          >
                            ADDITIONAL FEATURES
                          </Typography>
                          <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="flex-start"
                            spacing={3}
                          >
                            <Grid item>
                              <FormControlLabel
                                control={
                                  <Field
                                    type="checkbox"
                                    component={Switch}
                                    name="balcony"
                                    color="primary"
                                  />
                                }
                                label="Balcony"
                              />
                            </Grid>
                            <Grid item>
                              <FormControlLabel
                                control={
                                  <Field
                                    type="checkbox"
                                    component={Switch}
                                    name="garden"
                                    color="primary"
                                  />
                                }
                                label="Garden"
                              />
                            </Grid>
                            <Grid item>
                              <FormControlLabel
                                control={
                                  <Field
                                    type="checkbox"
                                    component={Switch}
                                    name="internetService"
                                    color="primary"
                                  />
                                }
                                label="Internet Service"
                              />
                            </Grid>
                            <Grid item>
                              <FormControlLabel
                                control={
                                  <Field
                                    type="checkbox"
                                    component={Switch}
                                    name="garage"
                                    color="primary"
                                  />
                                }
                                label="Garage"
                              />
                            </Grid>
                            <Grid item>
                              <FormControlLabel
                                control={
                                  <Field
                                    name="furnished"
                                    component={Switch}
                                    type="checkbox"
                                    color="primary"
                                  />
                                }
                                label="Furnished"
                              />
                            </Grid>
                          </Grid>
                        </Box>
                        <br></br>
                        {/* Image upload */}
                        <Box>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="body"
                          >
                            ADD IMAGES
                          </Typography>
                          <Grid container jusify="center" alignItems="center">
                            <Grid item xs={12}>
                              <DragNDrop />
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                      <Grid container justify="center">
                        <Grid className={classes.button} item xs={3} lg={6}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={props.isSubmitting}
                          >
                            Save
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
            {/* calls the popup */}
            <CallDialog />
          </>
        )}
      </Grid>
    </Container>
  );
};
export default withRouter(EditProperty);
