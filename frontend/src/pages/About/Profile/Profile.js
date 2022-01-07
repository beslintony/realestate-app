import { useParams } from 'react-router-dom';

import {
  Avatar,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

import useStyles from './styles';

// single profile page
const Profile = ({ data }) => {
  const { profileName } = useParams();
  const currentProfile = data.find(
    (profile) => profile.lastName === profileName,
  );
  let profileData;

  const classes = useStyles();

  if (currentProfile) {
    profileData = (
      <Container maxWidth="md">
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          <div className={classes.title}>Profile</div>
        </Typography>
        <Grid
          container
          justify="center"
          alignContent="space-around"
          alignItems="center"
          spacing={5}
          className={classes.root}
          component="main"
        >
          <Grid item xs={12} sm={12} md={8}>
            <Card className={classes.card}>
              <Card className={classes.top} />
              <div className={classes.avatar}>
                <Avatar
                  alt={currentProfile.name}
                  src={currentProfile.image}
                  variant="circular"
                  className={classes.xxl}
                />{' '}
              </div>{' '}
              <CardContent>
                <div className={classes.cardContent}>
                  <Typography gutterBottom variant="h4">
                    <b>{`${currentProfile.name} ${currentProfile.lastName}`}</b>
                  </Typography>
                  <Typography gutterBottom variant="h5">
                    Student at Hochschule Fulda
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    <b>{currentProfile.title} of Team A </b>
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    {currentProfile.extra}
                  </Typography>
                </div>
                <Container maxWidth="sm" className={classes.icon}>
                  <IconButton
                    aria-label="Github Profile"
                    onClick={() => window.open(currentProfile.github)}
                  >
                    <GitHubIcon />
                  </IconButton>
                </Container>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  } else {
    profileData = (
      <Typography
        component="h4"
        variant="h5"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        <div className={classes.text}>Sorry! Not Part of Team A</div>
      </Typography>
    );
  }

  return (
    <Paper className={classes.paper}>
      <div className={classes.topContent}>{profileData}</div>
    </Paper>
  );
};

export default Profile;
