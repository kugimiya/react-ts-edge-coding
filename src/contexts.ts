import { createContext } from 'react';
import AuthStoreInstance from '@stores/Auth';

export const Stores = createContext({
  authStore: AuthStoreInstance,
});
