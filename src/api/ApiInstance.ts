import { ApiRequest } from '@sdk/index';
import { AuthDto } from '@models/Auth';
import { AxiosError } from 'axios';
import AuthStoreInstance from '@stores/Auth';
import { API_BASE_URL, LOCAL_STORAGE } from '../constants';

export default new ApiRequest<AuthDto>(
  API_BASE_URL,
  {
    shouldIntercept: (error: AxiosError): boolean => {
      try {
        return error?.response?.status === 403;
      } catch (e) {
        return false;
      }
    },
    setTokenData: (authData): void => {
      localStorage.setItem(LOCAL_STORAGE.ACCESS, authData.accessToken);
      localStorage.setItem(LOCAL_STORAGE.REFRESH, authData.refreshToken);

      AuthStoreInstance.commit(authData);
    },
    attachTokenToRequest: (request): void => {
      request.headers.bearer = localStorage.getItem(LOCAL_STORAGE.ACCESS) || '';
    },
    handleTokenRefresh: (axiosClient): Promise<AuthDto> => {
      return new Promise<AuthDto>((res, rej) => {
        axiosClient
          .request<AuthDto>({
            url: '/auth/refresh',
            method: 'POST',
            data: {
              accessToken: localStorage.getItem(LOCAL_STORAGE.ACCESS),
              refreshToken: localStorage.getItem(LOCAL_STORAGE.REFRESH),
            },
          })
          .then((response) => {
            res(response.data);
          })
          .catch((err) => {
            if (err.response.status === 401) {
              AuthStoreInstance.clearAuth();
            }
            rej(err);
          });
      });
    },
  },
  (req) => {
    return {
      ...req,
      headers: {
        Bearer: localStorage.getItem(LOCAL_STORAGE.ACCESS),
      },
    };
  },
);
