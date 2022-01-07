import { Button, Grid, InputBase } from '@material-ui/core';

import filterStore from '../../store/filterStore';
import realestatesStore from '../../store/realestatesStore';
import { useCallback } from 'react';
import useStyles from './styles';

// search box on the home page
const SearchBox = () => {
  const area = filterStore((state) => state.area);
  const classes = useStyles();
  const isCheckedBalcony = filterStore((state) => state.isCheckedBalcony);
  const isCheckedFurnished = filterStore((state) => state.isCheckedFurnished);
  const isCheckedGarage = filterStore((state) => state.isCheckedGarage);
  const isCheckedGarden = filterStore((state) => state.isCheckedGarden);
  const isCheckedInternet = filterStore((state) => state.isCheckedInternet);
  const price = filterStore((state) => state.price);
  const query = filterStore((state) => state.query);
  const setQuery = filterStore((state) => state.setQuery);
  const setRealEstates = realestatesStore((state) => state.setRealEstates);
  const sort = filterStore((state) => state.sort);
  const offerMethod = filterStore((state) => state.offerMethod);

  // search string to be sent to the api
  const search = useCallback(async () => {
    let requestString = `realestates?`;

    if (query.length > 0) {
      requestString += `city=${query}&`;
    }
    if (isCheckedBalcony) {
      requestString += `balcony=1&`;
    }
    if (isCheckedGarage) {
      requestString += `garage=1&`;
    }
    if (isCheckedGarden) {
      requestString += `garden=1&`;
    }
    if (isCheckedInternet) {
      requestString += `internetService=1&`;
    }
    if (isCheckedFurnished) {
      requestString += `furnished=1&`;
    }
    if (price) {
      requestString += `minPrice=${price[0]}&`;
    }
    if (price) {
      requestString += `maxPrice=${price[1]}&`;
    }
    if (area) {
      requestString += `minArea=${area[0]}&`;
    }
    if (area) {
      requestString += `maxArea=${area[1]}&`;
    }
    if (offerMethod.length) {
      requestString += `offerMethod=${offerMethod}&`;
    }
    if (sort) {
      requestString += `sorting=${sort}&`;
    }
    const result = await setRealEstates(requestString);
    return result;
  }, [
    area,
    isCheckedBalcony,
    isCheckedFurnished,
    isCheckedGarage,
    isCheckedGarden,
    isCheckedInternet,
    offerMethod,
    price,
    query,
    setRealEstates,
    sort,
  ]);

  // useEffect(() => {
  //   search();
  // }, [search]);

  return (
    <div>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        {/* searchbox */}
        <InputBase
          placeholder="Search City, Postcode"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* search button */}
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          type="submit"
          onClick={() => search()}
        >
          SEARCH
        </Button>
      </Grid>
    </div>
  );
};

export default SearchBox;
