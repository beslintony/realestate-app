import AddIcon from '@material-ui/icons/Add';
import AppsIcon from '@material-ui/icons/Apps';
import CompanyIcon from '@material-ui/icons/Business';
import InfoIcon from '@material-ui/icons/Info';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import RecommendationsIcon from '@material-ui/icons/NewReleases';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonIcon from '@material-ui/icons/Person';
import RateReviewIcon from '@material-ui/icons/RateReview';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FeedbackIcon from '@material-ui/icons/Feedback';

// all the menu items of the sidebar and dashboard
// user menu list

export const userNavLinks = [
  {
    title: 'Dashboard',
    path: '/customer/dashboard',
    icon: <AppsIcon fontSize="large" />,
  },
  {
    title: 'Messages',
    path: '/customer/messages',
    icon: <MailOutlineIcon fontSize="large" />,
  },
  {
    title: 'Recommendations',
    path: '/customer/recommendations',
    icon: <RecommendationsIcon fontSize="large" />,
  },
  {
    title: 'Favourites',
    path: '/cutomer/favourites',
    icon: <FavoriteIcon fontSize="large" />,
  },
  {
    title: 'Profile',
    path: '/customer/profile',
    icon: <PersonIcon fontSize="large" />,
  },
  {
    title: 'Companies',
    path: '/companies',
    icon: <CompanyIcon fontSize="large" />,
  },
  {
    title: 'sign out',
    path: '/signout',
    icon: <SubdirectoryArrowRightIcon fontSize="large" />,
  },
];
// agent menu list
export const agentNavLinks = [
  {
    title: 'Dashboard',
    path: '/agent/dashboard',
    icon: <AppsIcon fontSize="large" />,
  },
  {
    title: 'Overview',
    path: '/agent/overview',
    icon: <VisibilityIcon fontSize="large" />,
  },
  {
    title: 'Messages',
    path: '/agent/messages',
    icon: <MailOutlineIcon fontSize="large" />,
  },
  {
    title: 'Property',
    path: '/agent/createproperty',
    icon: <AddIcon fontSize="large" />,
  },
  {
    title: 'Profile',
    path: '/agent/profile',
    icon: <PersonIcon fontSize="large" />,
  },
  {
    title: 'Feedbacks',
    path: '/agents/',
    icon: <FeedbackIcon fontSize="large" />,
  },
  {
    title: 'Companies',
    path: '/companies',
    icon: <CompanyIcon fontSize="large" />,
  },
  {
    title: 'sign out',
    path: '/signout',
    icon: <SubdirectoryArrowRightIcon fontSize="large" />,
  },
];
// admin user list
export const adminNavLinks = [
  {
    title: 'Dashboard',
    path: '/administrator/dashboard',
    icon: <AppsIcon fontSize="large" />,
  },
  {
    title: 'Review',
    path: '/administrator/reviewproperty',
    icon: <RateReviewIcon fontSize="large" />,
  },
  {
    title: 'Profile',
    path: '/administrator/profile',
    icon: <PersonIcon fontSize="large" />,
  },
  {
    title: 'Companies',
    path: '/companies',
    icon: <CompanyIcon fontSize="large" />,
  },
  {
    title: 'sign out',
    path: '/signout',
    icon: <SubdirectoryArrowRightIcon fontSize="large" />,
  },
];
