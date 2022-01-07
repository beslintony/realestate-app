import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import { filterStore } from '../../../store';
import { house } from '../../../assets/';
import useStyles from './styles';
import { useWindowWidth } from '../../../hooks';

// single property card
const Property = ({ property }) => {
  const classes = useStyles();
  const element = filterStore((state) => state.element);
  const widthRef = useRef();
  const [divWidth, setDivWidth] = useState(0);
  const screenWidth = useWindowWidth();

  useEffect(() => {
    widthRef && screenWidth && setDivWidth(widthRef?.current?.clientWidth)
  }, [divWidth, screenWidth])

  const image = 'images/' + property?.Images[0] ?? house;

  const chooseElement = () => {
    switch (element) {
      case 1: return property.Room_Number + ' rooms';
      case 2: return property.Internet_Speed + ' Mbps';
      case 3: return (property.Garden ? 'Garden' : 'No Garden');
      case 4: return (property.Balcony ? 'Balcony' : 'No Balcony');
      case 5: return (property.Garage ? 'Garage' : 'No Garage');
      default: return;
    }
  }

  const titleFunc = () => {
    const titleWidth = divWidth - 16 - 16 - 44; // clientWidth, paddingLeft, paddingRight, areawidth
    const pixelPerWord = 9.6; // pixel per word for the title
    const length = (titleWidth / pixelPerWord) - pixelPerWord + 3;
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
          image={property?.Images[0] ? image : house}
          title={property.Title}
        />
      </Link>
      <div className={classes.overlay}>
        {property.Offer_Method === 1 ? (
          <div> FOR SALE </div>
        ) : (
          <div> FOR RENT </div>
        )}
      </div>
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
            <div className={classes.area2}>
              <Typography variant="h6" color="inherit">
                {property.Size} m<sup>2</sup>
              </Typography>
            </div>
            {element !== 0 ? (
              <Typography
                className={classes.element}
                variant="h6"
                color="inherit"
              >
                {chooseElement()}
              </Typography>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card >
  );
};

export default Property;
