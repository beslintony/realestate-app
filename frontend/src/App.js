import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';

import {
  AgentOverview,
  AuthRoute,
  Copyright,
  CreateNewProperty,
  Disclaimer,
  EditProperty,
  Messages,
  NavBar,
  NotFound,
  Profile as Prof,
  Recommendations,
  ProfileAgent,
  ReviewProperties,
  ReviewProperty,
  ScrollTop,
  SignOut,
  UserRoute,
  Favourites,
} from './components';
import {
  About,
  Companies,
  Company,
  Dashboard,
  Home,
  Profile,
  ProfileData,
  Property,
  RealEstates,
  SignIn,
  SignUp,
  Verify,
} from './pages';
import userStore from './store/userStore';

function App() {
  const data = ProfileData;

  return (
    <>
      <Router>
        <CssBaseline />
        <ScrollTop />
        <Disclaimer />
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/companies">
            <Companies />
          </Route>
          <Route exact path="/companies/:id">
            <Company />
          </Route>
          <Route exact path="/companies/agents/:id">
            <Company />
          </Route>
          <Route exact path="/realestates">
            <RealEstates />
          </Route>
          <Route path="/realestates/:id">
            <Property />
          </Route>
          <Route exact path="/signout">
            {userStore.getState().currentAccessToken ? (
              <SignOut />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/signin">
            {userStore.getState().currentAccessToken ? (
              <Redirect to="/verifyuser" />
            ) : (
              <SignIn />
            )}
          </Route>
          <Route exact path="/signup">
            {userStore.getState().currentAccessToken ? (
              <Redirect to="/verifyuser" />
            ) : (
              <SignUp />
            )}
          </Route>
          <Route exact path="/agents/:id">
            <ProfileAgent />
          </Route>

          <AuthRoute exact path="/:role/dashboard" comp={Dashboard} />
          <AuthRoute exact path="/:role/messages" comp={Messages} />
          <AuthRoute exact path="/:role/profile" comp={Prof} />
          <UserRoute
            exact
            role="Customer"
            path="/customer/recommendations"
            comp={Recommendations}
          />
          <AuthRoute exact path="/:role/favourites" comp={Favourites} />
          <UserRoute
            exact
            path="/agent/createproperty"
            role="Agent"
            comp={CreateNewProperty}
          />
          <UserRoute
            exact
            role="Agent"
            path="/agent/editproperty/:id"
            comp={EditProperty}
          />
          <UserRoute
            role="Agent"
            exact
            path="/agent/overview"
            comp={AgentOverview}
          />
          <UserRoute
            exact
            role="Administrator"
            path="/administrator/reviewproperty"
            comp={ReviewProperties}
          />
          <UserRoute
            exact
            role="Administrator"
            path="/administrator/reviewproperty/:id"
            comp={ReviewProperty}
          />
          <AuthRoute exact path="/verifyuser" comp={Verify} />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
      <Copyright />
    </>
  );
}

export default App;
