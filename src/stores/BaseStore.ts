import { action, observable, toJS } from "mobx";
import FetchStore from "./FetchStore";
import {AxiosError} from "axios";

export type CommitOptions = {
  specificPath: string;
}

export type AsyncCommitOptions<K, L> = {
  promise: Promise<K>;
  mapper: (dto: K) => L;
  commitOptions?: CommitOptions;
  onFinish?: () => void;
  fetch?: FetchStore<K>;
}

export default class BaseStore<T extends object> {
  label: string = 'Unlabeled Store';

  @observable
  state: T;

  constructor(state: T) {
    this.state = state;
  }

  @action.bound
  commit(state: Partial<T>, options?: CommitOptions) {
    this.state = { ...this.state, ...state };
  }

  // TODO: add support for chain-of-mappers
  @action.bound
  asyncCommit<K>(params: AsyncCommitOptions<K, Partial<T>>) {
    if (params.fetch) {
      params.fetch.setLoading();
    }

    params.promise
      .then((value) => {
        this.commit(params.mapper(value), params.commitOptions);

        if (params.onFinish) {
          params.onFinish();
        }
      })
      .catch((error) => {
        if (params.fetch) {
          params.fetch.setFailed(error as AxiosError<K>);
        }

        console.error(error);
      })
      .finally(() => {
        if (params.fetch) {
          params.fetch.setDone();
        }
      });
  }

  debugState(): void {
    console.log(toJS(this.state));
  }
}
