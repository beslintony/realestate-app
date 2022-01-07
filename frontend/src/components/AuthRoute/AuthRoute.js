import { Redirect, Route } from 'react-router-dom';

import { userStore } from '../../store';

// custom router -- checks user validation
const AuthRoute = ({ comp: Component, ...rest }) => (
  <>
    <Route
      {...rest}
      render={(props) => {
        if (userStore.getState().currentAccessToken) {
          // checks for access token
          return <Component {...props} />; //returns the component
        }
        return (
          <Redirect
            to={{
              pathname: '/signin', // redirect to sign in
              state: { next: props.location },
            }}
          />
        );
      }}
    />
  </>
);

export default AuthRoute;
