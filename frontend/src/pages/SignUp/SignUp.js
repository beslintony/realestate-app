import { useState } from 'react';

import PropTypes from 'prop-types';

import { Box, Tab, Tabs, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { RegisterAgent, RegisterUser } from '../../components';
import useStyles from './styles';

// sign up page for agents and users
const SignUp = () => {
  const classes = useStyles();
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  // tab oanel
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.paper}>
      <div>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          aria-label="full width tabs example"
        >
          <Tab label="Customer" {...a11yProps(0)} />
          <Tab label="Agent" {...a11yProps(1)} />
        </Tabs>
      </div>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <RegisterUser />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <RegisterAgent />
      </TabPanel>
    </div>
  );
};

export default SignUp;
