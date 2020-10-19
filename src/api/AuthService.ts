import { AuthDto, Credentials } from '@models/Auth';
import { Request } from '@models/Request';
import ApiInstance from './ApiInstance';
import { LOCAL_STORAGE } from '../constants';

export default class AuthService {
  static async login(data: Credentials): Promise<AuthDto> {
    const response = await ApiInstance.request<Request<AuthDto>>({
      url: `/auth/login`,
      method: 'POST',
      data,
    });

    const { accessToken, refreshToken } = response.data.payload;

    localStorage.setItem(LOCAL_STORAGE.ACCESS, accessToken);
    localStorage.setItem(LOCAL_STORAGE.REFRESH, refreshToken);
    localStorage.setItem(LOCAL_STORAGE.AUTH, JSON.stringify(response.data.payload));

    return response.data.payload;
  }
}
