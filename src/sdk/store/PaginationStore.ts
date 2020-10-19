import { computed } from 'mobx';
import BaseStore from './BaseStore';

export type PaginationState = {
  limit: number;
  page: number;
  total: number;
};

export default class PaginationStore extends BaseStore<PaginationState> {
  constructor(label?: string) {
    super({ limit: 10, page: 0, total: 0 }, label);
  }

  @computed
  get page(): PaginationState['page'] {
    return this.state.page;
  }

  @computed
  get limit(): PaginationState['limit'] {
    return this.state.limit;
  }

  @computed
  get total(): PaginationState['total'] {
    return this.state.total;
  }
}
