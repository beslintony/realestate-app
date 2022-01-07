import { useEffect, useState } from 'react';

import { useParams, withRouter } from 'react-router-dom';

import {
  Avatar,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { NotFound, UpdatePassword, UpdatePicture } from '../';
import { userStore } from '../../store';
import useStyles from './styles';

// default profile page for the user
const Profile = () => {
  const classes = useStyles();
  const userRole = userStore((state) => state.role);
  const getProfile = userStore((state) => state.getProfile);
  const { role } = useParams();
  const [dialog, setDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    const getProfileData = async () => {
      let profile = await getProfile();
      setImage(profile.data.Picture ? ('/images/' + profile.data.Picture) : null);
    }
    getProfileData();
  }, [getProfile]);

  // click event change password menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // close button event change password menu
  const handleCloseBtn = () => {
    setAnchorEl(null);
  };
  // checks for userrole
  let currentUserRole = null;

  if (userRole?.role.toLowerCase() === role.toLowerCase()) {
    currentUserRole = role;
  }
  // pop up change password
  const CallDialog = () => {
    const handleClose = () => {
      setDialog(null);
    };

    const UpdateUserPassword = (
      <div>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <UpdatePassword />
          </DialogContentText>
        </DialogContent>
      </div>
    );

    const UpdateProfilePicture = (
      <div>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <UpdatePicture />
          </DialogContentText>
        </DialogContent>
      </div>
    );

    return (
      <div>
        <Dialog
          open={dialog}
          onClose={handleClose}
          aria-labelledby="alert-upload"
          aria-describedby="alert-upload-description"
        >
          {/* {selectDialog()} */}

          {dialog != null && dialog === 1 ? UpdateUserPassword : null}
          {dialog != null && dialog === 2 ? UpdateProfilePicture : null}

        </Dialog>
      </div>
    );
  };
  // change password pop up
  const changePassword = () => {
    setDialog(1);
  };

  const changeProfilePicture = () => {
    setDialog(2);
  }

  return (
    <>
      {currentUserRole !== null ? (
        <div className={classes.paper}>
          <Grid
            container
            direction="column"
            justify="center"
            alignContent="center"
          >
            <Grid item xs={12}>
              <Typography
                className={classes.topTitle}
                gutterBottom
                variant="h4"
                align="center"
                component="h5"
              >
                My Profile
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justify="center"
            direction="column"
            alignContent="center"
          >
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <div>
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleCloseBtn}
                    >
                      <MenuItem
                        onClick={() => {
                          changePassword();
                          setAnchorEl(null);
                        }}
                      >
                        Change Password
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          changeProfilePicture();
                          setAnchorEl(null);
                        }}
                      >
                        Change Profile Picture
                      </MenuItem>
                    </Menu>
                  </div>
                  <div>
                    <Avatar
                      alt=""
                      src={image}
                      variant="circular"
                      className={classes.xxl}
                    />
                  </div>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    className={classes.title}
                  >
                    {userRole?.username}
                  </Typography>
                  <Typography
                    component="h5"
                    variant="body1"
                    className={classes.content}
                  >
                    {userRole?.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <CallDialog />
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default withRouter(Profile);
