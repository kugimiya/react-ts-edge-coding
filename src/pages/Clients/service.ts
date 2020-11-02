import { ApiRequest, PaginationStore } from '@sdk/index';
import { Client, ClientDto, ClientsSearchDto } from '@models/Client';
import { Request } from '@models/Request';
import { AuthDto } from '@models/Auth';
import { clientIdsFromSearchMapper, clientMapper } from '../../mappers/ClientsMappers';

export default class ClientsService {
  // eslint-disable-next-line no-useless-constructor
  constructor(readonly apiInstance: ApiRequest<AuthDto>) {}

  async getClients(pagination?: PaginationStore): Promise<Client[]> {
    const rawSearchResult = await this.clientsSearch(pagination);
    const clientsIds = clientIdsFromSearchMapper(rawSearchResult.payload);
    const promises: Promise<ClientDto>[] = clientsIds.map((id) => this.getClient(id));
    const rawClients: ClientDto[] = await Promise.all(promises);

    if (pagination) {
      pagination.commit({ total: rawSearchResult.payload.count });
    }

    return rawClients.map(clientMapper);
  }

  async getClient(clientId: number): Promise<ClientDto> {
    const response = await this.apiInstance.request<Request<ClientDto>>({
      url: `/api/client`,
      method: 'GET',
      params: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        is_ajax: true,
        // eslint-disable-next-line @typescript-eslint/camelcase
        client_id: clientId,
      },
    });

    return response.data.payload;
  }

  async clientsSearch(pagination?: PaginationStore): Promise<Request<ClientsSearchDto>> {
    const response = await this.apiInstance.request<Request<ClientsSearchDto>>({
      url: `/api/clients`,
      method: 'GET',
      params: pagination
        ? {
            page: pagination.page + 1,
            // eslint-disable-next-line @typescript-eslint/camelcase
            items_per_page: pagination.limit,
            // eslint-disable-next-line @typescript-eslint/camelcase
            is_ajax: true,
          }
        : {
            page: 1,
            // eslint-disable-next-line @typescript-eslint/camelcase
            items_per_page: 20,
            // eslint-disable-next-line @typescript-eslint/camelcase
            is_ajax: true,
          },
    });

    return response.data;
  }
}
