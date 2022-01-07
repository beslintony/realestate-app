import { useLayoutEffect, useState } from 'react'

const useWindowWidth = () => {
  const [width, setWidth] = useState(0); //initial width usestate
  useLayoutEffect(() => { // useLayoutEffect
    function updateWidth() {
      setWidth(window.innerWidth); //initalize width value
    }
    window.addEventListener('resize', updateWidth); //call addEventListener
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth); // remove event listener
  }, []);
  return width; // return width value
}


export default useWindowWidth;
