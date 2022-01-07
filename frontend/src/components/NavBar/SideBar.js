import { useState } from 'react';

import { Link } from 'react-router-dom';

import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';

import useStyles from './styles';
import { userStore } from '../../store';

// side menu
const SideBar = ({ navLinks }) => {
  const classes = useStyles();
  const [state, setState] = useState({ left: false });
  const userProfile = userStore((state) => state.userProfile);


  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ [anchor]: open });
  };
  // list of the drawer
  const sideDrawerList = (anchor) => (
    <div
      className={classes.sideBar}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List component="nav">
        {navLinks.map(({ title, path, icon }) => (
          <Link to={path === '/agents/' ? `/agents/${userProfile?.AgentId}` : path} key={title} className={classes.sideBarLinkText}>
            <ListItem className={classes.list} button>
              {icon}
              <ListItemText primary={title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {/* Hamburger Menu */}
      <IconButton
        edge="start"
        aria-label="menu"
        onClick={toggleDrawer('left', true)}
        color="primary"
      >
        <Menu fontSize="large" style={{ color: `blue` }} />
      </IconButton>
      {/* Drawer from Hamburger Menu */}
      <Drawer
        anchor="left"
        open={state.left}
        onOpen={toggleDrawer('left', false)}
        onClose={toggleDrawer('left', false)}
      >
        {sideDrawerList('left')}
      </Drawer>
    </div>
  );
};

export default SideBar;
