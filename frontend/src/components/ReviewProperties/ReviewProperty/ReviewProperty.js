import { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Toolbar,
  Typography,
} from '@material-ui/core';

import { InternalError, Loading, NotFound, PropertyPage } from '../../';
import { reviewsStore } from '../../../store';
import useStyles from './styles';
import { AppsTwoTone } from '@material-ui/icons';
import api from '../../../api/api';

// review page for the admin
const ReviewProperty = () => {
  const classes = useStyles();
  const setSingleReview = reviewsStore((state) => state.setSingleReview);
  const singleReview = reviewsStore((state) => state.singleReview);
  const loading = reviewsStore((state) => state.loading);
  const status = reviewsStore((state) => state.reviewStatus);
  const evaluateReview = reviewsStore((state) => state.evaluateReview);
  const history = useHistory();

  const { id } = useParams(); // id of the property
  const [accepted, setAccepted] = useState(null);
  const [val, setVal] = useState(false);
  const [property, setProperty] = useState();

  useEffect(() => {
    api.getReviewProperty(id)
      .then(res => {
        setProperty(res.data.data[0])
      })
  }, [])

  // loads single review api
  useEffect(() => {
    setSingleReview(id);
  }, [id, setSingleReview]);
  // current review property
  const currentProperty = loading ? (
    <Loading start={loading} />
  ) : (
    singleReview?.find((review) => Number(review.Id) === Number(id))
  );
  if (status === 404) {
    return <NotFound />;
  }
  if (!loading && status == 500) {
    return <InternalError />;
  }
  if (!loading && currentProperty?.Id === undefined)
    return <Loading start={loading} />;

  // pop up
  const CallDialog = () => {
    //default pop up close
    const handleClose = () => {
      setVal(false);
      history.push('/administrator/reviewproperty');
    };

    let Success;
    if (accepted === true) {
      Success = (
        <div>
          <DialogTitle id="alert-signup">Accepted</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The property has been reviewed and will be published shortly!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setVal(false);
                history.push('/administrator/reviewproperty');
              }}
              color="primary"
              autoFocus
            >
              Ok
            </Button>
            <Button
              onClick={() => {
                setVal(false);
                history.push('/administrator/dashboard');
              }}
              color="primary"
            >
              DashBoard
            </Button>
          </DialogActions>
        </div>
      );
    }
    if (accepted === false) {
      Success = (
        <div>
          <DialogTitle id="alert-signup">Declined</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The property has been reviewed and declined. It will not be
              published!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setVal(false);
                history.push('/administrator/reviewproperty');
              }}
              color="primary"
              autoFocus
            >
              Back
            </Button>
            <Button
              onClick={() => {
                setVal(false);
                history.push('/administrator/dashboard');
              }}
              color="primary"
            >
              DashBoard
            </Button>
          </DialogActions>
        </div>
      );
    }
    if (status === 500) {
      Success = (
        <div>
          <DialogTitle id="alert-signup">Something Went Wrong</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Something went wrong on our side. Please try again or come back
              later.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setVal(false);
                history.push('/administrator/dashboard');
              }}
              color="primary"
              autoFocus
            >
              DashBoard
            </Button>
          </DialogActions>
        </div>
      );
    }

    return (
      <div>
        <Dialog
          open={val}
          onClose={handleClose}
          aria-labelledby="alert"
          aria-describedby="alert-description"
        >
          {Success}
        </Dialog>
      </div>
    );
  };

  return (
    <div>
      <div className={classes.appBar}>
        {/* adds the button to the top of the page */}
        <Toolbar>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              history.push('/administrator/reviewproperty');
            }}
          >
            Back
          </Button>
          <Typography variant="h3" align="center" className={classes.title}>
            Review Property
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            autoFocus
            onClick={() => {
              setAccepted(true);
              setVal(true);
              evaluateReview(id, { accept: 1 });
            }}
          >
            Accept
          </Button>
          <div style={{ paddingRight: '15px' }}></div>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setAccepted(false);
              setVal(true);
              evaluateReview(id, { accept: 2 });
            }}
          >
            Decline
          </Button>
        </Toolbar>
      </div>
      <CallDialog />
      {/* call the property page */}
      <PropertyPage
        realestate={property}
        contactAgent={null}
        loading={loading}
        button={false}
      />
    </div>
  );
};

export default ReviewProperty;
