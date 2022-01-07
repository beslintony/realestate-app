import React from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Typography,
  InputLabel,
  Select,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import filterStore from '../../store/filterStore';
import SliderRange from '../SliderRange/SliderRange';
import useStyles from './styles';

// all filter elements
const FilterRealEstates = () => {
  const classes = useStyles();
  // all states ftom the filterstore
  const setIsCheckedBalcony = filterStore((state) => state.SetIsCheckedBalcony);
  const isCheckedBalcony = filterStore((state) => state.isCheckedBalcony);
  const setIsCheckedGarage = filterStore((state) => state.SetIsCheckedGarage);
  const isCheckedGarage = filterStore((state) => state.isCheckedGarage);
  const setIsCheckedGarden = filterStore((state) => state.SetIsCheckedGarden);
  const isCheckedGarden = filterStore((state) => state.isCheckedGarden);
  const SetIsCheckedInternet = filterStore(
    (state) => state.SetIsCheckedInternet,
  );
  const isCheckedInternet = filterStore((state) => state.isCheckedInternet);
  const SetIsCheckedFurnished = filterStore(
    (state) => state.SetIsCheckedFurnished,
  );
  const isCheckedFurnished = filterStore((state) => state.isCheckedFurnished);
  const offerMethod = filterStore((state) => state.offerMethod);
  const setOfferMethod = filterStore((state) => state.setOfferMethod);

  return (
    <div className={classes.filter}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.accordianSummary}
        >
          <Typography className={classes.filterTitle}>Filter</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.filterD}>
          {/* Filter options */}
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Property Features</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="balcony"
                    checked={isCheckedBalcony}
                    onChange={(e) => setIsCheckedBalcony(e.target.checked)}
                  />
                }
                label="Balcony"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCheckedGarage}
                    name="garage"
                    onChange={(e) => setIsCheckedGarage(e.target.checked)}
                  />
                }
                label="Garage"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCheckedGarden}
                    name="garden"
                    onChange={(e) => setIsCheckedGarden(e.target.checked)}
                  />
                }
                label="Garden"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCheckedInternet}
                    name="internetervice"
                    onChange={(e) => SetIsCheckedInternet(e.target.checked)}
                  />
                }
                label="Internet Service"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCheckedFurnished}
                    name="furnished"
                    onChange={(e) => SetIsCheckedFurnished(e.target.checked)}
                  />
                }
                label="Furnished"
              />
            </FormGroup>
          </FormControl>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormControl className={classes.formControl}>
              <InputLabel color="primary" id="demo-simple-select-helper-label">
                Offer Method
              </InputLabel>
              <Select
                labelId="offerMethod"
                name="offerMethod"
                label="offerMethod"
                id="offerMethod"
                color="secondary"
                value={offerMethod}
                onChange={(event) => setOfferMethod(event.target.value)}
              >
                <MenuItem color="secondary" value={'rent'}>
                  For Rent
                </MenuItem>
                <MenuItem color="secondary" value={'sale'}>
                  For Sale
                </MenuItem>
              </Select>
            </FormControl>
            <br />
            <SliderRange />
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FilterRealEstates;
