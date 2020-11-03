import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import ReactDOM from 'react-dom';

import { Box } from '@material-ui/core';
import { ClientsModule } from '@pages/Clients';
import { PricesModule } from '@pages/Prices';
import { Login } from '@pages/Login';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
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
    <Router>
      <Box padding="24px">
        <ul>
          <li>
            <Link to="/">Clients</Link>
          </li>
          <li>
            <Link to="/prices">Prices</Link>
          </li>
        </ul>
      </Box>

      <Box padding="24px">
        <Switch>
          <Route exact path="/">
            <ClientsModule.Component />
          </Route>

          <Route exact path="/prices">
            <PricesModule.Component />
          </Route>
        </Switch>
      </Box>
    </Router>
  );
});

ReactDOM.render(
  <React.StrictMode>
    <MainWrapper />
  </React.StrictMode>,
  document.getElementById('root'),
);
