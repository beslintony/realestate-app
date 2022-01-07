import axios from 'axios';
import qs from 'qs';

import { userStore } from '../store';

// request interceptor to add the auth token header to requests
axios.interceptors.request.use(
  (config) => {
    if (userStore?.getState().currentAccessToken) {
      config.headers.Authorization = `Bearer ${userStore.getState()?.currentAccessToken
        }`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
// refresh tokens on each api call
const refreshTokens = async () => {
  const url = '/api/token';
  const token = { token: userStore?.getState()?.currentRefreshToken };
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const result = await axios.post(url, token, config).then((res) => {
    if (res.status === 200) {
      userStore.setState({
        currentAccessToken: res.data?.accessToken,
      });
      userStore.setState({ accessToken: res.data?.accessToken });
    }
  });
  return result;
};

// response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (
      userStore.getState().currentRefreshToken &&
      error.response.status === 403 &&
      !originalRequest.retry
    ) {
      originalRequest.retry = true;
      return refreshTokens();
    }
    return Promise.reject(error);
  },
);
// api calls using axios
const api = {
  // sign up
  signup: async (user) => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const url = '/api/registerUser';

    const result = await axios.post(url, user, config);
    return result;
  },
  // register agent
  registerAgent: async (agent) => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const url = '/api/registerAgent';
    const result = await axios.post(url, agent, config);
    return result;
  },
  // user login
  login: async (user) => {
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };
    const url = '/api/login';
    const result = await axios.post(url, qs.stringify(user), config);
    return result;
  },
  // refresh tokens
  getRefreshToken: () => {
    refreshTokens();
  },
  // logout
  logout: async (token) => {
    const url = '/api/logout';
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const result = await axios.post(url, config);
    return result;
  },
  // search realestates
  realestates: async (url) => {
    const result = await axios.get(`/api/${url}`);
    return result;
  },
  // show single realestate
  singleRealestate: async (id) => {
    const result = await axios.get(`/api/realestates/${id}`, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
    return result;
  },
  // check recommendations
  checkRecommendations: async () => {
    const result = await axios.post(`/api/dataAnalysis`);
    return result;
  },
  // get recommendations
  getRecommendations: async () => {
    const result = await axios.get(`/api/dataAnalysis`);
    return result;
  },
  // get companies
  getCompanies: async () => {
    const result = await axios.get(`/api/companies`);
    return result;
  },
  // get companies
  getCompany: async (id) => {
    const result = (await axios.get(`/api/companies/${id}`));
    return result;
  },
  // get all of the contexts of the message for the user
  allContexts: async () => {
    const result = await axios.get(`/api/messages`);
    return result;
  },
  // create a new context for message
  createContext: async (body) => {
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };
    const url = '/api/messages';
    const result = await axios.post(url, qs.stringify(body), config);
    return result;
  },
  // send the message
  sendMessage: async (id, body) => {
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };
    const url = `/api/messages/${id}`;
    const result = await axios.post(url, qs.stringify(body), config);
    return result;
  },
  // get the message
  getMessages: async (id) => {
    const result = await axios.get(`/api/messages/${id}`);
    return result;
  },
  // check new messages
  checkNewMessages: async () => {
    const result = await axios.get(`/api/messages/check/`);
    return result;
  },
  // create a new property
  createProperty: async (property) => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const url = `/api/realestates/`;
    const result = await axios.post(url, property, config);
    return result;
  },
  // edit the property
  editProperty: async (id, data) => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const url = `/api/realestates/${id}`;
    const result = await axios.put(url, data, config);
    return result;
  },
  // get all properties to be reviewed
  getReviewProperties: async () => {
    const result = await axios.get(`/api/review/`);
    return result;
  },
  //fetch data to review the property
  getReviewProperty: async (id) => {
    const result = await axios.get(`/api/review/${id}`);
    return result;
  },
  // update the review status of the property - accept or decline during review
  evaluateProperty: async (id, data) => {
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };
    const url = `/api/review/${id}`;
    const result = await axios.put(url, qs.stringify(data), config);
    return result;
  },
  // sell the property
  sellProperty: async (id, price) => {
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };
    const url = `/api/agentOverview/${id}`;
    const result = await axios.post(url, qs.stringify(price), config);
    return result;
  },
  // delete the property
  deleteProperty: async (id) => {
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };
    const url = `/api/agentOverview/${id}`;
    const result = await axios.put(url, config);
    return result;
  },
  // get all the properties of the agent
  agentOverview: async () => {
    const url = `/api/agentOverview/`;
    const result = await axios.get(url);
    return result;
  },
  // get the single property to update
  getSingleAgentProperty: async (id) => {
    const url = `/api/agentOverview/${id}`;
    const result = await axios.get(url);
    return result;
  },
  // update the user password
  updatePassword: async (password) => {
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };
    const url = `/api/profile/password`;
    const result = await axios.put(url, qs.stringify(password), config);
    return result;
  },
  // update profile picture
  updatePicture: async (picture) => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const url = `/api/profile/picture`;

    const result = await axios.put(url, picture, config);
    return result;
  },
  // get profile
  getProfile: async () => {
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };
    const url = `/api/profile`;

    const result = await axios.get(url, config);
    return result;
  },
  // post a feedback
  createFeedback: async (data) => {
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };
    const url = `/api/feedbacks`;
    const result = await axios.post(url, qs.stringify(data), config);
    return result;
  },
  // get user feedback
  getUserFeedback: async (id) => {
    const url = `/api/feedbacks/user/${id}`;
    const result = await axios.get(url);
    return result;
  },
  // get agent feedbacks
  getAgentFeedbacks: async (id) => {
    const url = `/api/feedbacks/${id}`;
    const result = await axios.get(url);
    return result;
  },
  // get agent details
  getAgentDetails: async (id) => {
    const url = `/api/feedbacks/agent/${id}`;
    const result = await axios.get(url);
    return result;
  },
  // dekete feedback
  deleteFeedback: async (id) => {
    const url = `/api/feedbacks/delete/${id}`;
    const result = await axios.delete(url);
    return result;
  },
  // update feedback
  updateFeedback: async (id, data) => {
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };
    const url = `/api/feedbacks/${id}`;
    const result = await axios.put(url, qs.stringify(data), config);
    return result;
  },
  // get user profile Data
  getUserProfile: async () => {
    const url = `/api/profile/`;
    const result = await axios.get(url);
    return result;
  },
  // get favourites
  getFavourites: async () => {
    const result = axios.get('/api/favourites')
    return result
  },
  //add favourites
  createFavourite: async (id) => {
    const url = `/api/favourites/${id}`;
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };
    const result = await axios.post(url, config);
    return result;
  },
  deleteFavourite: async (realestateid) => {
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };
    const url = `/api/favourites/${realestateid}`;
    //const body =  qs.stringify(realestateid)
    const result = await axios.delete(url, config);
    return result;
  },
  checkFavourite: async (realestateid) => {
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };
    const url = `/api/favourites/checkfavourite/${realestateid}`;
    const result = await axios.get(url, config);
    return result;
  },
};

export default api;
