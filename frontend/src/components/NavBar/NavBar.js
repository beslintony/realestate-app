import { useEffect, useState, useCallback } from 'react';

import axios from 'axios';
import decode from 'jwt-decode';
import { Link, useHistory, useLocation } from 'react-router-dom';

import {
  AppBar,
  Avatar,
  Badge,
  Button,
  Hidden,
  Toolbar,
  Typography,
} from '@material-ui/core';
import CompanyIcon from '@material-ui/icons/Business';
import EmailIcon from '@material-ui/icons/Email';
import InfoIcon from '@material-ui/icons/Info';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import socket from '../../Socket';
import {
  filterStore,
  messagesStore,
  realestatesStore,
  userStore,
} from '../../store';
import SideBar from './SideBar';
import { adminNavLinks, agentNavLinks, userNavLinks } from './SideBarList';
import useStyles from './styles';

// default navbar
const NavBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const userRole = userStore((state) => state.role);
  const setUserRole = userStore((state) => state.setRole);
  const setUserProfile = userStore((state) => state.setUserProfile);
  const newMessage = messagesStore((state) => state.newMessage);
  const setNewMessage = messagesStore((state) => state.setNewMessage);
  const checkNewMessages = messagesStore((state) => state.checkNewMessages);

  const getProfile = userStore((state) => state.getProfile);
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const setProfile = async () => {
      let profile = await getProfile();
      setUsername(profile.data.Name);
      setImage(profile.data.Picture ? ('/images/' + profile.data.Picture) : null);
    }
    setProfile()
    userStore.getState()?.currentAccessToken && setUserProfile()

  }, [getProfile, setUserProfile]);

  // default list of the links
  const genNavLinks = [
    {
      title: 'Companies',
      path: '/companies',
      icon: <CompanyIcon fontSize="large" />,
    },
    {
      title: 'sign in',
      path: '/signin',
      icon: <LockOpenIcon />,
    },
  ];
  let navLinks = [];

  // checks for userrole
  if (userRole?.role === 'Customer') {
    navLinks = userNavLinks;
  } else if (userRole?.role === 'Agent') {
    navLinks = agentNavLinks;
  } else if (userRole?.role === 'Administrator') {
    navLinks = adminNavLinks;
  } else {
    navLinks = genNavLinks;
  }
  // current access token in the localstorage
  const token = userStore.getState()?.currentAccessToken;

  // checks for expiry of the token
  const tokenCheck = useCallback(() => {
    if (token) {
      const decodedToken = decode(token);

      if (!userRole) {
        setUserRole(decodedToken);
        return decodedToken;
      }

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        history.push('/signout');
      }
    }
  }, [history, setUserRole, token, userRole]);

  // get contexts from the message api
  const getContexts = async () => {
    const result = await axios.get(`/api/messages`);

    result?.data?.data?.forEach((element) => {
      socket.emit('create', String(element.Id));
    });
  };
  // checks fot contexts
  const checkContexts = async (contextId) => {
    const result = await axios.get(`/api/messages`);

    result?.data?.data?.forEach((element) => {
      if (String(element.Id) === String(contextId.room)) {
        socket.emit('rejoin', String(element.Id));
      }
    });
  };
  // loads the user role, connects to the socket.io and checks new messages
  useEffect(() => {
    const user = tokenCheck();

    if (user?.role === 'Customer' || user?.role === 'Agent') {
      if (userStore.getState().currentAccessToken) {
        socket.connect();
        getContexts();
        checkNewMessages();
      }
    }

    return () => {
      socket.disconnect();
    };
  }, []);
  // loads notification from socket.io
  useEffect(() => {
    socket.on('notify', () => {
      setNewMessage(true);
    });
    //checks the contextId
    socket.on('check', (contextId) => {
      checkContexts(contextId);
    });

    return () => {
      socket.off('notify');
      socket.off('check');
    };
  }, [socket, newMessage]);
  // looks for expiration of the user login token
  useEffect(() => {
    location && tokenCheck();
  }, [location, tokenCheck]);

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar component="nav">
        <SideBar navLinks={navLinks} />
        <div
          onClick={() => {
            // deletes all the states to realestates and filter
            filterStore.getState().deleteEverything();
            realestatesStore.getState().deleteEverything();
          }}
        >
          {/* link to home */}
          <Link className={classes.title} to="/">
            <Typography variant="h5" className={classes.title} color="inherit">
              H&RE
            </Typography>
          </Link>
        </div>

        <div className={classes.grow} />
        {/* displays new notification */}
        {newMessage ? (
          <Button
            component={Link}
            onClick={() => setNewMessage(false)}
            to={
              userRole?.role === 'Customer'
                ? '/customer/messages'
                : '/agent/messages'
            }
            color="primary"
          >
            <Badge badgeContent={'+'} color="secondary">
              <EmailIcon />
            </Badge>
          </Button>
        ) : null}
        {/* displays username and profile pic */}

        {userStore?.getState()?.currentAccessToken ? (
          <div className={classes.navList}>
            <Avatar className={classes.colorful} alt="" src={image}>
              {username?.charAt(0)}
            </Avatar>
            <Hidden xsDown>
              <Typography className={classes.userName} variant="h6">
                {username}
              </Typography>
              {/* sign out /sign in  button */}
              <Button
                component={Link}
                onClick={() => {
                  history.push('/signout');
                  window.location.reload();
                }}
                color="primary"
              >
                <Typography className={classes.linkText}>Sign Out</Typography>
              </Button>
            </Hidden>
          </div>
        ) : (
          <Button
            component={Link}
            onClick={() => {
              history.push('/signin');
            }}
            color="primary"
          >
            <Typography className={classes.linkText}>Sign In</Typography>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
