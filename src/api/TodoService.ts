import PaginationStore from '@codeleaf-sdk/core/dist/store/PaginationStore';
import { TodoDto } from '../models/Todo';
import ApiInstance from './ApiInstance';

const sleep = (ms: number): Promise<null> => new Promise<null>((resolve) => setTimeout(resolve, ms));

export default class TodoService {
  static async getTodos(pagination?: PaginationStore): Promise<TodoDto[]> {
    await sleep(250);
    const response = await ApiInstance.request<TodoDto[]>({
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
