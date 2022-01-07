import { Link, useRouteMatch } from 'react-router-dom';

import {
  Avatar,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';

import useStyles from './styles';

// about page
const About = ({ data }) => {
  const classes = useStyles();
  const { url } = useRouteMatch();
  return (
    <>
      <div className={classes.container}>
        <div className={classes.topContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Meet our Team
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              We are the Developers of this Web Application. This Project is
              developed as per the Evaluation Requirements of the Module
              &quot;Team Project&quot; of Hochschule Fulda. What do we do? We
              develop Applications!
            </Typography>
          </Container>
        </div>
        <Divider className={classes.divider} />
        <Container className={classes.cardGrid} maxWidth="xl">
          <Grid
            container
            justify="center"
            alignContent="space-around"
            alignItems="center"
            spacing={5}
          >
            {data.map((data) => (
              <Grid
                item
                className={(classes.card, classes.paper)}
                key={data.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <Link className={classes.link} to={`${url}/${data.lastName}`}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Avatar
                        alt={JSON.stringify(data.name)
                          .toLowerCase()
                          .replace(/['"]+/g, '')}
                        src={data.image}
                        variant="circular"
                        className={classes.xxl}
                      />
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.title}
                      >
                        {`${data.name} ${data.lastName}`}
                      </Typography>
                      <Typography
                        component="h5"
                        variant="h6"
                        className={classes.content}
                      >
                        {data.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default About;
