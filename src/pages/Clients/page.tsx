import React, { FC, ReactElement, useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Client } from '@models/Client';
import FetchWrapper from '@sdk/components/hoc/FetchWrapper';
import ClientsTable from '@pages/Clients/components/ClientsTable';
import { ClientsModule } from '@pages/Clients/index';
import LoadingCircularProgress from '../../components/LoadingCircularProgress';

const Clients: FC = () => {
  const { store, service } = useContext(ClientsModule.Context);
  const { clients, fetch, pagination } = store;

  useEffect(() => {
    if (fetch.isInitialized) {
      return;
    }

    store.asyncCommit<Client[]>({
      promise: service.getClients(pagination),
      fetch,
      commitOptions: { specificPath: 'clients' }, // or "mapper: (mapped) => ({ clients: mapped })"
    });
  }, [fetch, fetch.isInitialized, pagination, service, store]);

  if (!fetch.isInitialized) {
    return <LoadingCircularProgress />;
  }

  const TableComponent = (): ReactElement => (
    <ClientsTable
      isLoading={fetch.isLoading}
      clients={clients}
      total={pagination.total}
      rowsPerPage={pagination.limit}
      page={pagination.page}
      onChangePage={(page): void => {
        pagination.commit({ page });
        store.asyncCommit<Client[]>({
          promise: service.getClients(pagination),
          fetch,
          mapper: (mapped) => ({ clients: mapped }),
        });
      }}
    />
  );

  return <FetchWrapper isInitialized={TableComponent} error={(): ReactElement => <></>} isLoading={TableComponent} fetch={fetch} />;
};

export default observer(Clients);
