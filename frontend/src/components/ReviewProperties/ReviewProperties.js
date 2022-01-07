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
import { useEffect, useState } from 'react';

import InfoIcon from '@material-ui/icons/Info';
import InternalError from '../InternalError/InternalError';
import { Link } from 'react-router-dom';
import { Loading } from '../';
import { reviewsStore } from '../../store';
import useStyles from './styles';

const columns = [
  { id: 'title', label: 'Title', minWidth: 200, align: 'left' },
  { id: 'location', label: 'Location', minWidth: 120, align: 'left' },
  {
    id: 'company',
    label: 'Company',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'postedby',
    label: 'Posted By',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 170,
    align: 'center',
  },
];
// create table data
function createData(title, location, company, postedby, actions) {
  return { title, location, company, postedby, actions };
}

// displays the table of reviews for the admin
const ReviewProperties = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const reviews = reviewsStore((state) => state.allReviews);
  const setAllReviews = reviewsStore((state) => state.setAllReviews);
  const loading = reviewsStore((state) => state.loading);
  const status = reviewsStore((state) => state.reviewStatus);

  // fires on page load
  useEffect(() => {
    setAllReviews();
  }, [setAllReviews]);

  // handlepages
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  let rows = [];

  if (!loading)
    rows = reviews?.map((review) =>
      createData(
        review?.Title,
        review?.City,
        review?.CompanyName,
        review?.Agent,
        <Link
          style={{ textDecoration: 'none' }}
          to={`/administrator/reviewproperty/${review.Id}`}
        >
          <div key={review?.Id}>
            <Button variant="outlined" color="default" startIcon={<InfoIcon />}>
              More Info
            </Button>
          </div>
        </Link>,
      ),
    );
  // changeeowsperpage
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  if (status === 500) {
    return (
      <>
        <InternalError />
      </>
    );
  }

  const ReviewTableBody = () => {
    return rows
      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
      });
  };

  return (
    <div className={classes.paper}>
      <Typography
        className={classes.header}
        align="center"
        variant="h5"
        component="h2"
      >
        Review Properties
      </Typography>
      <Paper className={classes.root}>
        {loading === false ? (
          <>
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
                <TableBody>
                  <ReviewTableBody />
                </TableBody>
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
          </>
        ) : (
          <Loading start={loading} />
        )}
      </Paper>
    </div>
  );
};

export default ReviewProperties;
