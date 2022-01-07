import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

// scrolls to the top of the page
const ScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollTop;
