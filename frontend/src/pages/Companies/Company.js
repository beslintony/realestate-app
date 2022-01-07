import { useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

import {
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';

import { Loading } from '../../components';
import { companiesStore } from '../../store';
import useStyles from './CompanyStyle';

// single company page
const Company = () => {
  const classes = useStyles();
  const company = companiesStore((state) => state.company);
  const getCompany = companiesStore((state) => state.getSingleCompany);
  const loading = companiesStore((state) => state.loading);
  const status = companiesStore((state) => state.status);
  const { id } = useParams();

  // loads company
  useEffect(() => {
    getCompany(id);
  }, [id, getCompany]);

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

  let companyData = (
    <Container maxWidth="md">
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
            <CardContent>
              {loading === false ? (
                <div className={classes.cardContent}>
                  <Typography gutterBottom variant="h4">
                    <b>{`${company?.Name}`}</b>
                  </Typography>
                  <Typography gutterBottom variant="h5">
                    {company?.Street + ' ' + company?.House_Number}
                  </Typography>
                  <Typography gutterBottom variant="h5">
                    {company?.Postcode + ' ' + company?.City}
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    {company?.Description}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    {company?.Agents?.map((agent) => (
                      <Typography gutterBottom variant="h4">
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/agents/${agent?.AgentId}`}
                        >
                          {agent.Name}
                        </Link>
                      </Typography>
                    ))}
                  </Typography>
                </div>
              ) : (
                <Loading start={loading} />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );

  return (
    <Paper className={classes.paper}>
      <div className={classes.topContent}>{companyData}</div>
    </Paper>
  );
};

export default Company;
