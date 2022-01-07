import { FormGroup, FormLabel, Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import { filterStore } from '../../store';

import useStyles from './styles';

// slider for the filter
const SliderRange = () => {
  const classes = useStyles();
  const price = filterStore((state) => state.price);
  const setPrice = filterStore((state) => state.setPrice);
  const area = filterStore((state) => state.area);
  const setArea = filterStore((state) => state.setArea);
  const offerMethod = filterStore((state) => state.offerMethod);

  const handlePrice = (event, newPrice) => {
    setPrice(newPrice);
  };
  const handleArea = (event, newArea) => {
    setArea(newArea);
  };
  let maxPrice = 1000000;
  if (offerMethod === 'rent') {
    maxPrice = 10000;
  }
  return (
    <>
      <div className={classes.root}>
        <FormLabel component="legend">Price</FormLabel>
        <FormGroup>
          <>
            <Slider
              value={price}
              onChange={handlePrice}
              valueLabelDisplay="off"
              aria-labelledby="range-slider"
              max={maxPrice}
              min={0}
              color="secondary"
            />
            <div className={classes.label}>
              <Typography className={classes.text} variant="subtitle2">
                <span>€ {price[0]}</span>
              </Typography>
              <Typography className={classes.text} variant="subtitle2">
                <span>€ {price[1]}</span>
              </Typography>
            </div>
          </>
        </FormGroup>
      </div>
      <br></br>
      <div className={classes.root}>
        <FormLabel component="legend">Area</FormLabel>
        <FormGroup>
          <Slider
            value={area}
            onChange={handleArea}
            valueLabelDisplay="off"
            aria-labelledby="range-slider"
            max={2500}
            min={0}
            color="secondary"
          />
          <div className={classes.label}>
            <Typography className={classes.text} variant="subtitle2">
              <span>{area[0]} sq.m.</span>
            </Typography>
            <Typography className={classes.text} variant="subtitle2">
              <span>{area[1]} sq.m.</span>
            </Typography>
          </div>
        </FormGroup>
      </div>
    </>
  );
};

export default SliderRange;
