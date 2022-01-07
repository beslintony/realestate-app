import { Link, Typography } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

import useStyles from './styles';

// default footer of the webpage
const Copyright = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <div>
        <Typography gutterBottom variant="body1" align="center">
          <Link color="inherit" href="/">
            About Us
          </Link>
        </Typography>
        <Typography gutterBottom variant="body2" align="center">
          <Link
            color="inherit"
            href="https://github.com/christianiff/teamproject-sose21-group-a"
          >
            <GitHubIcon />
          </Link>
        </Typography>
        <Typography variant="body2" align="center">
          {'Copyright © '}
          <Link color="inherit" href="/">
            Team A
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </div>
    </div>
  );
};

export default Copyright;
