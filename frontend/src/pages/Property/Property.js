import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import {
  Loading,
  PropertyPage,
} from '../../components';
import { messagesStore, realestatesStore, userStore } from '../../store';
import api from './../../api/api'

// property page
const Property = () => {
  const history = useHistory();
  const loading = realestatesStore((state) => state.isloading);
  const contextLoading = messagesStore((state) => state.loading);
  const setRedirects = userStore((state) => state.setRedirects);
  const setCreateContext = messagesStore((state) => state.setCreateContext);
  const setAllcontexts = messagesStore((state) => state.setAllcontexts);

  const { id } = useParams();
  const [property, setProperty] = useState();

  useEffect(() => {
    api.singleRealestate(id)
      .then(res => {
        setProperty(res.data.data[0])
      })
  },[]);


  let context = {};
  if (userStore.getState().role?.role === 'Customer') {
    context = {
      agent: property?.Agent_Id,
      realestate: property?.Id,
    };
  }

  // contact agent function
  const contactAgent = () => {
    if (
      userStore.getState().currentAccessToken &&
      userStore.getState().role?.role === 'Customer'
    ) {
      const createContext = async (context) => {
        await setCreateContext(context);
      }
      createContext(context)
      setAllcontexts(context);

      contextLoading ? (
        <Loading start={contextLoading} />
      ) : (
        history.push('/customer/messages')
      );
    } else if (
      userStore.getState().currentAccessToken &&
      userStore.getState().role?.role === 'Agent'
    ) {
      history.push('/agent/messages');
    } else if (
      userStore.getState().currentAccessToken &&
      userStore.getState().role?.role === 'Administrator'
    ) {
      return null;
    } else {
      setRedirects(history.location.pathname);
      history.push('/signin');
    }
  };

  return (
    <PropertyPage
      realestate={ property }
      contactAgent={ contactAgent }
      loading={ loading }
      button={ false }
    />
  );
};

export default Property;
