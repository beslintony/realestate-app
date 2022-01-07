import { Link, useHistory, useParams, withRouter } from 'react-router-dom';

import { Button, Card, CardActions, Grid, Typography } from '@material-ui/core';

import { userStore } from '../../store';
import {
  adminNavLinks,
  agentNavLinks,
  userNavLinks,
} from '../NavBar/SideBarList';
import NotFound from '../NotFound/NotFound';
import useStyles from './styles';

// default dashboard page
const Overview = () => {
  const classes = useStyles();
  const userRole = userStore((state) => state.role);
  const history = useHistory();
  // checks for the user role
  const { role } = useParams();

  let currentUserRole = null;

  if (role === 'user') {
    history.push(`/${role}/dashboard`);
  }
  if (userRole?.role.toLowerCase() === role.toLowerCase()) {
    currentUserRole = role;
  }
  // loads the dashboard for each user for userrole
  let defaultDash = [];
  // customer
  if (role === 'customer') {
    defaultDash = userNavLinks;
  }
  // agent
  if (role === 'agent') {
    defaultDash = agentNavLinks;
  }
  //admin
  if (role === 'administrator') defaultDash = adminNavLinks;
  const userProfile = userStore((state) => state.userProfile);

  return (
    <div className={classes.div}>
      <Typography variant="h5">DashBoard</Typography>
      <Grid container className={classes.top}>
        <Grid item xs={12}>
          {/* if a user logged in */}
          {currentUserRole !== null ? (
            <Grid container justify="center" alignItems="space-between">
              {defaultDash.map((dash) => (
                <>
                  {/* removes Dashboard menu from the list */}
                  {dash.title !== 'Dashboard' ? (
                    <Grid
                      className={classes.Top}
                      key={dash?.title}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                    >
                      <Card className={classes.root}>
                        <Link to={dash.path === '/agents/' ? `/agents/${userProfile?.AgentId}` : dash.path} className={classes.link}>
                          <CardActions className={classes.cardActions}>
                            <Button>
                              <Grid
                                container
                                justify="center"
                                alignItems="center"
                                display="flex"
                                className={classes.btn}
                              >
                                <Grid item xs={12} className={classes.btn1}>
                                  <Typography align="center" variant="h6">
                                    {dash.icon}
                                  </Typography>
                                  <Typography
                                    className={classes.btn2}
                                    align="center"
                                    variant="body1"
                                  >
                                    {dash.title}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Button>
                          </CardActions>
                        </Link>
                      </Card>
                    </Grid>
                  ) : null}
                </>
              ))}
            </Grid>
          ) : (
            //no user, => not found
            <NotFound />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(Overview);
