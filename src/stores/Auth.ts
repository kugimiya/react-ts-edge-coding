import { action, computed, observable } from 'mobx';
import { AuthDto } from '@models/Auth';
import { BaseStore, FetchStore } from '@sdk/index';
import { LOCAL_STORAGE } from '../constants';

class AuthStore extends BaseStore<AuthDto> {
  @observable
  fetch: FetchStore<AuthDto> = new FetchStore<AuthDto>('AuthStoreFetch');

  constructor() {
    super(
      {
        accessToken: '',
        expireAt: 0,
        phpSession: '',
        refreshToken: '',
      },
      'AuthStore',
    );

    const authData = localStorage.getItem(LOCAL_STORAGE.AUTH);
    if (authData !== null) {
      this.commit(JSON.parse(authData));
    }
  }

  // eslint-disable-next-line @typescript-eslint/unbound-method
  @action.bound
  clearAuth(): void {
    localStorage.removeItem(LOCAL_STORAGE.AUTH);
    localStorage.removeItem(LOCAL_STORAGE.ACCESS);
    localStorage.removeItem(LOCAL_STORAGE.REFRESH);

    this.commit({ accessToken: '', phpSession: '', expireAt: 0, refreshToken: '' });
  }

  @computed
  get isAuthenticated(): boolean {
    return this.state.accessToken !== '';
  }
}

const AuthStoreInstance = new AuthStore();
export default AuthStoreInstance;
