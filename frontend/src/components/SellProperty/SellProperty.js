import { Typography } from '@material-ui/core';

import { Loading } from '../';
import { realestatesStore } from '../../store';

// sell property
const SellProperty = ({ currentContext }) => {
  const loading = realestatesStore((state) => state.isloading);
  const properties = realestatesStore((state) => state.property);

  return (
    <div>
      {/* display the message */}
      {loading === false ? (
        <Typography>
          Want to sell / rent {currentContext?.Realestate} to{' '}
          {currentContext?.CommPartner} at Price € {properties[0]?.Price} with
          Additional Cost € {properties[0]?.Additional_Costs}. Total Cost:{' '}
          {Number(properties[0]?.Price + properties[0]?.Additional_Costs)} ?
        </Typography>
      ) : (
        <Loading start={loading} />
      )}
    </div>
  );
};

export default SellProperty;
