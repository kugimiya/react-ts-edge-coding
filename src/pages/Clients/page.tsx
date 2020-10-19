import React, { FC, ReactElement, useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Client } from '@models/Client';
import FetchWrapper from '@sdk/components/hoc/FetchWrapper';
import ClientsTable from '@pages/Clients/components/ClientsTable';
import { Stores } from '../../contexts';
import ClientsService from '../../api/ClientsService';

const Clients: FC = () => {
  const { clientsStore } = useContext(Stores);
  const { clients, fetch, pagination } = clientsStore;

  useEffect(() => {
    if (fetch.isInitialized) {
      return;
    }

    clientsStore.asyncCommit<Client[]>({
      promise: ClientsService.getClients(clientsStore.pagination),
      fetch: clientsStore.fetch,
      mapper: (mapped) => ({ clients: mapped }),
    });
  }, [clientsStore, fetch.isInitialized]);

  const TableComponent = (): ReactElement => (
    <ClientsTable
      isLoading={fetch.isLoading}
      clients={clients}
      total={pagination.total}
      rowsPerPage={pagination.limit}
      page={pagination.page}
      onChangePage={(page): void => {
        pagination.commit({ page });
        clientsStore.asyncCommit<Client[]>({
          promise: ClientsService.getClients(clientsStore.pagination),
          fetch: clientsStore.fetch,
          mapper: (mapped) => ({ clients: mapped }),
        });
      }}
    />
  );

  return <FetchWrapper isInitialized={TableComponent} error={(): ReactElement => <></>} isLoading={TableComponent} fetch={fetch} />;
};

export default observer(Clients);
