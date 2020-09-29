import { action, computed, observable } from "mobx";
import { AxiosError } from "axios";

export default class FetchStore<ResponseDto> {
  @observable
  isLoading = false;

  @observable
  isInitialized = false;

  @observable
  error: AxiosError<ResponseDto> | null = null;

  @computed
  get loaded() {
    return !this.isLoading && this.isInitialized;
  }

  @computed
  get failed() {
    return this.error !== null;
  }

  @action.bound
  setLoading() {
    this.isLoading = true;
  }

  @action.bound
  setDone() {
    this.isLoading = false;
    this.isInitialized = true;
  }

  @action.bound
  setFailed(error: AxiosError<ResponseDto>) {
    this.isLoading = false;
    this.isInitialized = true;
    this.error = error;
  }

  @action.bound
  clear() {
    this.isLoading = false;
    this.isInitialized = false;
    this.error = null;
  }
}
