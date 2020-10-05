import ApiRequest from './ApiRequest';
import { TodoDto } from '../models/Todo';
import PaginationStore from '../stores/PaginationStore';

export default class TodoService {
  static async getTodos(pagination?: PaginationStore): Promise<TodoDto[]> {
    const response = await ApiRequest.request<TodoDto[]>({
      url: `/todos`,
      method: 'GET',
      params: pagination // FIXME: should we convert this section into 'sdk.core' logic?
        ? {
            _limit: pagination.limit,
            _page: pagination.page,
          }
        : {},
    });

    return response.data;
  }
}
