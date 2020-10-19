import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import { AuthDto } from '@models/Auth';
import AuthService from '../../api/AuthService';
import { Stores } from '../../contexts';

const Login: FC = () => {
  const { authStore } = useContext(Stores);

  return (
    <button
      type="button"
      onClick={(): void => {
        authStore.asyncCommit<AuthDto>({
          promise: AuthService.login({ login: 'admin', password: 'admin' }),
          fetch: authStore.fetch,
        });
      }}
    >
      AUTH
    </button>
  );
};

export default observer(Login);
