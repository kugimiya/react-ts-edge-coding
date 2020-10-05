import React, { ReactElement } from 'react';
import { observer } from 'mobx-react';
import FetchStore from '../../stores/FetchStore';

interface FetchHocProps<T> {
  fetch: FetchStore<T>;
  isLoading: () => ReactElement;
  error: () => ReactElement;
  isInitialized: () => ReactElement;
}

const FetchHoc = <T,>({ fetch, isLoading, error, isInitialized }: FetchHocProps<T>): JSX.Element => {
  if (fetch.isLoading) {
    return isLoading();
  }

  if (fetch.error) {
    return error();
  }

  if (fetch.isInitialized) {
    return isInitialized();
  }

  return <></>;
};

export default observer(FetchHoc);
