import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function Loader(props) {
  return (
      <CircularProgress size={'100%'} thickness={3} {...props} />
  );
}

export default Loader;
