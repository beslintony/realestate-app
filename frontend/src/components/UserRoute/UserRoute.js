import { Route } from 'react-router-dom';

import { userStore } from '../../store';
import NotFound from '../NotFound/NotFound';

// user routing using custom router and user role
const UserRoute = ({ comp: Component, ...rest }) => {
  const role = userStore((state) => state.role);
  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          if (role?.role === rest.role) {
            return <Component {...props} />; // return component to a user role
          }
          return <NotFound />;
        }}
      />
    </>
  );
};

export default UserRoute;
