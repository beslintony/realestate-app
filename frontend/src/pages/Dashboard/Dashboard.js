import { withRouter } from 'react-router-dom';

import { Overview } from '../../components';
import useStyles from './styles';

// calls the overview component
const Dashboard = () => {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Overview />
    </div>
  );
};

export default withRouter(Dashboard);
