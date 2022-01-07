import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { Loading } from '../';
import api from '../../api/api';
import { agentOverviewStore } from '../../store';
import useStyles from './styles';

// columns for the header
const columns = [
  { id: 'title', label: 'Title', minWidth: 200, align: 'left' },
  { id: 'address', label: 'Address', minWidth: 120, align: 'left' },
  {
    id: 'city',
    label: 'City',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'postcode',
    label: 'Postcode',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'status',
    label: 'Status',
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
// create rows
function createData(title, address, city, postcode, status, actions) {
  return { title, address, city, postcode, status, actions };
}

// create status
export function createStatus(statusId) {
  if (statusId === 1) return 'In Review';
  else if (statusId === 2) return 'Declined';
  else if (statusId === 3) return 'Published';
  else if (statusId === 4) return 'Deleted';
  else if (statusId === 5) return 'Inactive';
  else if (statusId === 6) return 'Sold';
  else return 'Unknown';
}
// create address
function createAddress(street, houseNo) {
  return street + ' ' + houseNo;
}
// component AgentOverview
const AgentOverview = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const agentPropertyLists = agentOverviewStore((state) => state.agentOverview);
  const getAgentPropertyLists = agentOverviewStore(
    (state) => state.getAgentOverview,
  );
  const loading = agentOverviewStore((state) => state.loading);
  const status = agentOverviewStore((state) => state.status);

  const [val, setVal] = useState(false);
  const [deleted, setDeleted] = useState(false);

  // loads agent property lists with every on itself
  useEffect(() => {
    getAgentPropertyLists();
  }, [getAgentPropertyLists]);

  // loads agent properylist when it is deleted
  useEffect(() => {
    val && getAgentPropertyLists();
  }, [deleted, getAgentPropertyLists, val]);

  //pop up message component
  const CallDialog = () => {
    const handleClose = () => {
      setVal(false);
    };

    const deletePopup = (
      <div>
        <DialogTitle id="alert-delete">Deleted</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Property Deleted Successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </div>
    );

    return (
      <div>
        <Dialog
          open={val}
          onClose={handleClose}
          aria-labelledby="alert-upload"
          aria-describedby="alert-upload-description"
        >
          {deletePopup}
        </Dialog>
      </div>
    );
  };

  // handle change for the page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // error popup
  if (status === 500) {
    return (
      <>
        <div
          style={{
            textAlign: 'center',
          }}
        >
          Error: Something went wrong!!
        </div>
      </>
    );
  }

  // initial row
  let rows = [];

  // when not loading
  if (!loading)
    rows = agentPropertyLists?.map((property) =>
      createData(
        property?.Title,
        createAddress(property?.Street, property?.House_Number),
        property?.City,
        property?.Postcode,
        createStatus(property?.Status_Id),
        <div
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'space-between',
          }}
          key={property?.Id}
        >
          {property?.Status_Id !== 6 ? (
            // edit property
            <Link
              style={{ textDecoration: 'none' }}
              to={`/agent/editproperty/${property?.Id}`}
            >
              <Button
                style={{
                  margin: '5px',
                }}
                variant="outlined"
                color="default"
              >
                <EditIcon />
              </Button>
            </Link>
          ) : (
            <Button
              style={{
                margin: '5px',
              }}
              variant="outlined"
              color="default"
              disabled
            >
              <EditIcon />
            </Button>
          )}
          <Button
            style={{
              margin: '5px',
            }}
            variant="outlined"
            color="default"
            // onClick Delete property
            onClick={() => {
              try {
                api.deleteProperty(property?.Id);
                setDeleted(!deleted);
                setVal(true);
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <DeleteIcon />
          </Button>
        </div>,
      ),
    );
  // handles rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  // main return for the agentoverview
  return (
    <div className={classes.paper}>
      <Typography
        className={classes.header}
        align="center"
        variant="h5"
        component="h2"
      >
        Property List
      </Typography>
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
            {loading === false ? (
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
            ) : (
              <Loading start={loading} />
            )}
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
        <CallDialog />
      </Paper>
    </div>
  );
};

export default AgentOverview;
