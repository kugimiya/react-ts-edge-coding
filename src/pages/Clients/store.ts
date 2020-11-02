import { BaseStore, FetchStore, PaginationStore } from '@sdk/index';
import { Client } from '@models/Client';
import { computed } from 'mobx';

type ClientsStoreState = {
  clients: Client[];
};

export default class ClientsStore extends BaseStore<ClientsStoreState> {
  constructor(readonly fetch: FetchStore<Client[]>, readonly pagination: PaginationStore) {
    super({ clients: [] }, 'ClientsStore');
  }

  @computed
  get clients(): Client[] {
    return this.state.clients;
  }
}
