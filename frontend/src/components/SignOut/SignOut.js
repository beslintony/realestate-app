import React, { useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { Loading } from '../';
import api from '../../api/api';
import { userStore } from '../../store';
import useStyles from './styles';

// sign out component
const SignOut = () => {
  const classes = useStyles();
  const deleteAll = userStore((state) => state.deleteEverything);
  const history = useHistory();
  const location = useLocation();

  // deletes all user attributes from localstorage
  useEffect(() => {
    localStorage.clear();
    window.localStorage.removeItem('user');
    api.logout(userStore.getState().currentAccessToken);
    deleteAll();
    history.push('/signin');
    localStorage.clear();
    window.location.reload();
  }, [deleteAll, history, location]);

  return (
    <div className={classes.paper}>
      <Loading start={true} />
    </div>
  );
};

export default SignOut;
