import React, { FC } from 'react';

import { Box, CircularProgress } from '@material-ui/core';

const LoadingCircularProgress: FC = (props) => {
  const { children } = props;

  return (
    <>
      {children ?? null}
      <Box style={{ textAlign: 'center', margin: '30px 0', height: '470px' }}>
        <CircularProgress size={128} thickness={4} />
      </Box>
    </>
  );
};

export default LoadingCircularProgress;
