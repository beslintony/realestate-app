import { Redirect, withRouter } from 'react-router-dom';

import { Loading } from '../../components';
import { userStore } from '../../store';
import useStyles from './styles';

// redirect page for users after login
const Verify = () => {
  const classes = useStyles();
  // get userrole
  const userRole = userStore((state) => state.role);
  // return to dashboard page
  if (userRole?.role === 'Customer') {
    return <Redirect to="/customer/dashboard" />;
  }
  if (userRole?.role === 'Agent') {
    return <Redirect to="/agent/dashboard" />;
  }
  if (userRole?.role === 'Administrator') {
    return <Redirect to="/administrator/dashboard" />;
  }

  return (
    <div className={classes.paper}>
      <Loading start={!userRole?.role} />
    </div>
  );
};

export default withRouter(Verify);
