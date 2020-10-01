import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL } from '../constants';

class ApiRequestClass {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
    });
  }

  request<ResponseDto>(config: AxiosRequestConfig): Promise<AxiosResponse<ResponseDto>> {
    return this.instance.request<ResponseDto>(config);
  }
}

const ApiRequest = new ApiRequestClass();
export default ApiRequest;
