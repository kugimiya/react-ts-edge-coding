import { createContext } from 'react';
import ClientsStore from '@stores/ClientsStore';
import AuthStoreInstance from '@stores/Auth';

export const Stores = createContext({
  clientsStore: new ClientsStore(),
  authStore: AuthStoreInstance,
});
