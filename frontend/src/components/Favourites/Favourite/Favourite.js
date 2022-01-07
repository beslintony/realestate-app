import { Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';

import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';
import api from '../../../api/api';
import { house } from '../../../assets';
import useStyles from './styles';
import { useWindowWidth } from '../../../hooks';

// single property card
const Favourite = ({ property }) => {
  const classes = useStyles();
  const image = '/images/' + property?.Images[0];

  const [favourite, setFavourite] = useState(true);

  const [divWidth, setDivWidth] = useState(0);
  const screenWidth = useWindowWidth();
  const widthRef = useRef();

  useEffect(() => {
    widthRef && screenWidth && setDivWidth(widthRef?.current?.clientWidth)
  }, [screenWidth])

  const changeFavourite = () => {
    if (favourite === true) {
      //remove favourite
      setFavourite(false);
      api.deleteFavourite(property.Id);
    } else {
      //add favourite 
      setFavourite(true);
      api.createFavourite(property.Id);
    }
  }

  const titleFunc = () => {
    const titleWidth = divWidth - 16 - 16; // clientWidth, paddingLeft, paddingRight
    const pixelPerWord = 9.6; // pixel per word for the title
    const length = (titleWidth / pixelPerWord) - pixelPerWord + 3;
    console.log(length)
    if (widthRef?.current && property.Title.length > (length - 3)) {
      return property.Title.substr(0, length) + '\u2026';
    } else {
      return property.Title
    }
  }

  return (
    <Card className={classes.card}>
      <Link to={`/realestates/${property.Id}`}>
        <CardMedia
          className={classes.media}
          // house -> fallback if no image is provided
          image={property?.Images[0] ? image : house}
          title={property.Title}
        />
      </Link>
      <Grid container justify="space-between">
        <Grid item>
          <div className={classes.overlay}>
            {property.Offer_Method === 1 ? (
              <div> FOR SALE </div>
            ) : (
              <div> FOR RENT </div>
            )}
          </div>
        </Grid>
        <Grid item>
          <IconButton
            //clickable favourites icon
            className={classes.overlayFavourite}
            aria-label="remove from favorites"
            color={favourite ? 'primary' : 'default'}
            onClick={() => { changeFavourite() }}
          >
            <FavoriteIcon />
          </IconButton>
        </Grid>
      </Grid>

      <CardContent ref={widthRef} >
        <div className={classes.cardContent}>
          <Typography gutterBottom variant="h5">
            <div className={classes.title}>
              <Link className={classes.title} to={`/realestates/${property.Id}`}>{titleFunc()}</ Link>
            </div>
          </Typography>
          <Typography
            className={classes.overlayPrice}
            gutterBottom
            variant="h5"
            component="h2"
          >
            <div className={classes.price}>
              € {property.Price}
            </div>
          </Typography>
        </div>
        <div className={classes.cardContent}>
          <div className={classes.cardLeft}>
            <Typography
              className={classes.address}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {property.Street} {property.House_Number} <br />
              {property.Postcode} {property.City}
            </Typography>
          </div>
          <div className={classes.cardRight}>
            <div className={classes.area}>
              <Typography variant="h5" color="inherit">
                {property.Size} m<sup>2</sup>
              </Typography>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Favourite;
