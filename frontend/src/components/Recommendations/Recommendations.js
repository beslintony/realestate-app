import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
// import
import { useEffect, useState } from 'react';

import DetailsIcon from '@material-ui/icons/Visibility';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import useStyles from './styles';

// columns for the header
const columns = [
  { id: 'title', label: 'Title', minWidth: 200, align: 'left' },
  { id: 'address', label: 'Address', minWidth: 120, align: 'left' },
  {
    id: 'city',
    label: 'City',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'postcode',
    label: 'Postcode',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 120,
    align: 'left',
  },
  {
    id: 'size',
    label: 'Size',
    minWidth: 120,
    align: 'left',
  },
  {
    id: 'offerMethod',
    label: 'Offer Method',
    minWidth: 120,
    align: 'left',
  },
  {
    id: 'details',
    label: 'Details',
    minWidth: 120,
    align: 'left',
  },
];

// create data objects
function createData(
  title,
  address,
  city,
  postcode,
  price,
  size,
  offerMethod,
  details,
) {
  return { title, address, city, postcode, price, size, offerMethod, details };
}

// create offer method string
function createOfferMethod(offerMethod) {
  switch (offerMethod) {
    case 1:
      return 'for sale';
    case 2:
      return 'for rent';
    default:
      return 'unknown';
  }
}

// create address
function createAddress(street, houseNo) {
  return street + ' ' + houseNo;
}

// component recommendations
const Recommendations = () => {
  const classes = useStyles(); // styles
  const [page, setPage] = useState(0); // page
  const [rowsPerPage, setRowsPerPage] = useState(10); // rows per page
  const [rows, setRows] = useState([]);

  // check and get recommendations
  useEffect(() => {
    api.checkRecommendations()
      .then(() => {
        api.getRecommendations()
          .then((res) => {
            const recommendations = res.data.data;
            setRows(
              recommendations.map((property) =>
                createData(
                  property.Title,
                  createAddress(property.Street, property.House_Number),
                  property.City,
                  property.Postcode,
                  property.Price + property.Additional_Costs,
                  property.Size,
                  createOfferMethod(property.Offer_Method),
                  <div
                    style={{
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'space-between',
                    }}
                    key={property.Id}
                  >
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={`/realestates/${property.Id}`}
                    >
                      <Button
                        style={{
                          margin: '5px',
                        }}
                        variant="outlined"
                        color="default"
                      >
                        <DetailsIcon />
                      </Button>
                    </Link>
                  </div>,
                )
              )
            )
          });
      });
  }, []);

  // handle change for the page
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  // handles rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  // main return for the recommendations
  return (
    <div className={classes.paper}>
      <Typography
        className={classes.header}
        align="center"
        variant="h5"
        component="h2"
      >
        Recommendations
      </Typography>
      {rows.length > 0 ?
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns?.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <>
                <TableBody>
                  {rows
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>{' '}
              </>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        :
        <Paper className={classes.noElements}>
          No recommendations available
        </Paper>
      }
    </div>
  );
};

// export
export default Recommendations;
