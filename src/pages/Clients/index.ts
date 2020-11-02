import { FetchStore, PaginationStore } from '@sdk/index';
import { PageModule } from '@sdk/page';
import ClientsStore from './store';
import ClientsService from './service';

import Clients from './page';
import ApiInstance from '../../api/ApiInstance';

export const ClientsModule = PageModule<ClientsStore, ClientsService>({
  path: '/',
  component: Clients,
  store: [
    ClientsStore,
    [
      { ClassName: FetchStore, Args: ['ClientsFetchStore'] },
      { ClassName: PaginationStore, Args: ['ClientsPaginationStore'] },
    ],
  ],
  service: [ClientsService, [{ ClassName: ApiInstance, DontCreate: true }]],
});
