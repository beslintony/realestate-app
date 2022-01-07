import 'react-responsive-carousel/lib/styles/carousel.min.css';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { agentFeedbackStore, userStore } from '../../store';

import { Carousel } from 'react-responsive-carousel';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';
import { Loading } from '../';
import Rating from '@material-ui/lab/Rating';
import api from './../../api/api';
import house from '../../assets/fallback/defaultHouse.svg';
import useStyles from './styles';

// single property page
const PropertyPage = ({ realestate, contactAgent, loading, button }) => {
  const classes = useStyles();
  const property = realestate;

  const [favourite, setFavourite] = useState(false);

  // check if the property is already saved as a favourite
  useEffect(() => {
    if (property) {
      api.checkFavourite(property?.Id)
        .then(res => {
          if (res.data[0].isFavourite === 1) {
            setFavourite(true)
          } else {
            setFavourite(false)
          }
        })
    }
  }, [property])

  // yes no func
  const yesNo = (val) => {
    if (val === 1) return <DoneIcon />;
    else if (val === 0) return <ClearIcon />;
  };
  // disable button false =!false and true =!true(false)
  let buttonValue = false;
  if (
    userStore.getState().currentAccessToken &&
    userStore.getState().role?.role === 'Administrator'
  ) {
    buttonValue = true;
  }
  const setAgentData = agentFeedbackStore((state) => state.setAgentData);
  const agentData = agentFeedbackStore((state) => state.agentData);
  const agentDataLoading = agentFeedbackStore((state) => state.loading);

  useEffect(() => {
    if (property) {
      setAgentData(property.Agent_Id)
    }
  }, [property, setAgentData])

  let isCustomer = false;
  if (
    userStore.getState().currentAccessToken &&
    userStore.getState().role?.role === 'Customer'
  ) {
    isCustomer = true;
  }

  //add as favourite or remove favourtie
  const changeFavourite = async () => {
    if (favourite === true) {
      //remove favourite
      setFavourite(false);
      api.deleteFavourite(property?.Id);

    } else {
      //add favourite 
      setFavourite(true);
      api.createFavourite(property?.Id);
    }
  }


  // images
  const images = property?.Images;
  const agentPicture = property?.AgentPicture ? ('/images/' + property?.AgentPicture) : null;

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      spacing={1}
      className={classes.paper}
    ><>
        {(agentDataLoading) ? <Loading start={agentDataLoading} /> : <Loading start={false} />}
        {loading ? (
          <Loading start={loading} />
        ) : (
          <>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              spacing={3}
              className={classes.topPictureGrid}
            >
              <Grid item xs={12} sm={8} className={classes.picture}>
                {images?.length ? (
                  <Carousel
                    autoPlay
                    showArrows
                    infiniteLoop
                    className={classes.carousel}
                  >
                    {/* Carousel images */}
                    {images.map((image) => (
                      <div>
                        <img
                          alt=""
                          src={images?.length ? '/images/' + image : house}
                        />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <Carousel autoPlay showArrows className={classes.carousel}>
                    <div>
                      <img alt="fallback" src={house} />
                    </div>
                  </Carousel>
                )}
              </Grid>
              <Grid item xs={12} sm={4} className={classes.picture}>
                <Typography
                  gutterBottom
                  align="center"
                  variant="h3"
                  component="h2"
                >
                  {property?.Title}
                </Typography>
                {/* agent box */}
                <Grid
                  container
                  direction="column"
                  justifyContent="space-between"
                  alignItems="center"
                  className={classes.carousel}
                >
                  <Grid item>
                    <Card className={classes.cardContent}>
                      <CardContent>
                        <Grid container justify="space-between">
                          <Grid item>
                            <Typography variant="body2" component="h5">
                              Posted By
                            </Typography>
                          </Grid>
                          {isCustomer ? (
                            <Grid item>
                              <IconButton
                                aria-label="add to favorites"
                                color={favourite ? 'primary' : 'default'}
                                onClick={() => { changeFavourite() }}
                              >
                                <FavoriteIcon />
                              </IconButton>
                            </Grid>
                          ) : null}

                        </Grid>
                        <Grid container alignItems="center" justify="center" >
                          <Grid item className={classes.avatar}>
                            <Link className={classes.links} to={`/agents/${property?.Agent_Id}`}>
                              <Avatar className={classes.avatar} src={agentPicture} alt="" />
                            </Link>
                          </Grid>
                          <Grid item className={classes.agentDetails}>
                            <Typography variant="h5" component="h5">
                              <Link className={classes.links} to={`/agents/${property?.Agent_Id}`}>
                                {property?.Agent}
                              </Link>
                            </Typography>
                            <Typography variant="h5" component="h5">
                              <Link className={classes.links} to={`/companies/${property?.CompanyId}`}>
                                {property?.CompanyName}
                              </Link>
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          justify="center"
                          alignItems="center"
                          className={classes.cardBottom}
                        >
                          <Grid item>
                            <Box
                              component="fieldset"
                              md={3}
                              borderColor="transparent"
                            >
                              <Typography color="primary" component="legend" variant="body2">Agent Rating</Typography>
                              <Rating
                                name="simple-controlled"
                                precision={0.5}
                                readOnly
                                value={
                                  agentData && Number(agentData[0]?.Average_Rating)
                                }
                              />
                            </Box>
                          </Grid>
                          <Grid item>
                            <Button
                              variant="outlined"
                              color="primary"
                              disabled={buttonValue}
                              onClick={contactAgent}
                            >
                              Contact Agent
                            </Button>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              <div className={classes.toolbar} />
              <Grid
                container
                alignItems="center"
                jusify="space-between"
                spacing={3}
                className={classes.middlecards}
              // xs={4}
              // sm={2}
              >
                <Grid item sm={4} md={2} className={classes.items}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Address
                      </Typography>
                      <Typography
                        className={classes.middlecardext}
                        variant="body1"
                        component="h6"
                      >
                        {property?.Street} {property?.House_Number}
                      </Typography>
                      <Typography
                        className={classes.middlecardext}
                        variant="body2"
                        color="textSecondary"
                      >
                        {property?.Postcode} {property?.City}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm={4} md={2} className={classes.items}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Offer
                      </Typography>
                      <Typography
                        className={classes.middlecardext}
                        variant="h4"
                        component="h2"
                      >
                        {property?.Offer_Method === 1
                          ? 'For Sale'
                          : 'For Rent'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm={4} md={2} className={classes.items}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Price
                      </Typography>
                      <Typography
                        className={classes.middlecardext}
                        variant="h4"
                        component="h2"
                      >
                        € {property?.Price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm={4} md={2} className={classes.items}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Rooms
                      </Typography>
                      <Typography
                        className={classes.middlecardext}
                        variant="h4"
                        component="h2"
                      >
                        {property?.Room_Number} Rooms
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm={4} md={2} className={classes.items}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Area
                      </Typography>
                      <Typography
                        className={classes.middlecardext}
                        variant="h4"
                        component="h2"
                      >
                        {property?.Size} <span>Sq.m.</span>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm={4} md={2} className={classes.items}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Internet Speed
                      </Typography>
                      <Typography
                        className={classes.middlecardext}
                        variant="h4"
                        component="h2"
                      >
                        {property?.Internet_Speed}
                        <span> Mbps</span>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="stretch"
                className={classes.description}
              >
                <Grid item xs={2} />
                <Grid item xs={8}>
                  <Typography gutterBottom variant="h4" component="h2">
                    Description
                  </Typography>
                  <Typography gutterBottom variant="body1" component="h5">
                    {property?.Description}
                  </Typography>
                </Grid>
                <Grid item xs={2} />
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="stretch"
                className={classes.description}
              >
                <Grid item>
                  <Typography gutterBottom variant="h4" component="h2">
                    Other Features
                  </Typography>
                  <Grid container>
                    <Grid item>
                      <Typography gutterBottom variant="h6" component="h2">
                        Balcony :{yesNo(property?.Balcony)}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h2">
                        Garden :{yesNo(property?.Garden)}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h2">
                        Garage :{yesNo(property?.Garage)}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h2">
                        Furnished :{yesNo(property?.Furnished)}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h2">
                        Internet Service :
                        {yesNo(property?.Internet_Service)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}</>
    </Grid>
  );
};

export default PropertyPage;
