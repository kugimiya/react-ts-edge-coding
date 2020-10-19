export type AuthDto = {
  accessToken: string;
  refreshToken: string;
  phpSession: string;
  expireAt: number;
};

export type Credentials = {
  login: string;
  password: string;
};
