import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import ReactDOM from 'react-dom';

import { Box } from '@material-ui/core';
import { Clients } from '@pages/Clients';
import { Login } from '@pages/Login';

import { Stores } from './contexts';

const MainWrapper = observer(() => {
  const { authStore } = useContext(Stores);

  if (!authStore.isAuthenticated) {
    return (
      <Box padding="24px">
        <Login />
      </Box>
    );
  }

  return (
    <Box padding="24px">
      <Clients />
    </Box>
  );
});

ReactDOM.render(
  <React.StrictMode>
    <MainWrapper />
  </React.StrictMode>,
  document.getElementById('root'),
);
