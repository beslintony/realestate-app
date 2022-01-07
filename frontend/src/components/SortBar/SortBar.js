import {
  AppBar,
  FormControl,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { filterStore, realestatesStore } from '../../store';

import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const SortBar = () => {
  const classes = useStyles();
  const setRealEstates = realestatesStore((state) => state.setRealEstates);

  const setElement = filterStore((state) => state.setElement);
  const element = filterStore((state) => state.element);

  const setSort = filterStore((state) => state.setSort);
  const sort = filterStore((state) => state.sort);
  const isCheckedBalcony = filterStore((state) => state.isCheckedBalcony);
  const isCheckedFurnished = filterStore((state) => state.isCheckedFurnished);
  const isCheckedGarage = filterStore((state) => state.isCheckedGarage);
  const isCheckedGarden = filterStore((state) => state.isCheckedGarden);
  const isCheckedInternet = filterStore((state) => state.isCheckedInternet);
  const price = filterStore((state) => state.price);
  const query = filterStore((state) => state.query);
  const offerMethod = filterStore((state) => state.offerMethod);
  const area = filterStore((state) => state.area);


  // const setQuery = filterStore((state) => state.setQuery);

  const location = useHistory();

  useEffect(() => {
    const fetchSortedData = async (sort) => {
      let requestString = `realestates?`;
      setSort(sort);
      if (sort) {
        // requestString += `sorting=${sort}&`;
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
        if (sort) {
          requestString += `sorting=${sort}&`;
        }
        if (offerMethod.length) {
          requestString += `offerMethod=${offerMethod}&`;
        }
        setRealEstates(requestString);
      }

    };
    fetchSortedData(sort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setRealEstates, sort]);

  useEffect(() => {
    location && setSort(0);
  }, [location, setSort]);

  return (
    <>
      <AppBar className={classes.sortBar} position="sticky">
        <Toolbar className={classes.toolbar} component="nav">

          <div>
            <FormControl className={classes.formControl}>
              <Typography> Search Elements </Typography>
              <Select
                variant="outlined"
                select
                margin="normal"
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={element}
                onChange={(event) => setElement(event.target.value)}
              >
                <MenuItem value={0}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Room Number</MenuItem>
                <MenuItem value={2}>Internet Speed</MenuItem>
                <MenuItem value={3}>Garden</MenuItem>
                <MenuItem value={4}>Balcony</MenuItem>
                <MenuItem value={5}>Garage</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <Typography> Sort by </Typography>
              <Select
                variant="outlined"
                select
                margin="normal"
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <MenuItem value={0}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Price Ascending</MenuItem>
                <MenuItem value={2}>Price Descending</MenuItem>
                <MenuItem value={3}>Size Ascending</MenuItem>
                <MenuItem value={4}>Size Descending</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default SortBar;
