import { useEffect } from 'react';

import { Link, useRouteMatch } from 'react-router-dom';

import {
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';

import { Loading } from '../../components';
import { companiesStore } from '../../store';
import useStyles from './styles';

// companies page
const Companies = () => {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const companyList = companiesStore((state) => state.companies);
  const getCompanies = companiesStore((state) => state.getCompanies);
  const loading = companiesStore((state) => state.loading);
  const status = companiesStore((state) => state.status);

  // loads companies
  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  // error popup
  if (status === 500) {
    return (
      <>
        <div
          style={{
            textAlign: 'center',
          }}
        >
          Error: Something went wrong!!
        </div>
      </>
    );
  }

  return (
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
            Companies
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
          {loading === false ? (
            companyList?.map((company) => (
              <Grid
                item
                className={(classes.card, classes.paper)}
                key={company.Id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <Link className={classes.link} to={`${url}/${company.Id}`}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.title}
                      >
                        {`${company.Name}`}
                      </Typography>
                      <Typography
                        component="h5"
                        variant="h6"
                        className={classes.content}
                      >
                        {company.Street + ' ' + company.House_Number}
                      </Typography>
                      <Typography
                        component="h5"
                        variant="h6"
                        className={classes.content}
                      >
                        {company.Postcode + ' ' + company.City}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))
          ) : (
            <Loading start={loading} />
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Companies;
