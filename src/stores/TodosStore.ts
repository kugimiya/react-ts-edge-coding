import BaseStore from './BaseStore';
import { TodoDto, TodoListView } from '../models/Todo';
import FetchStore from './FetchStore';
import PaginationStore from './PaginationStore';

type TodosStoreState = {
  todos: TodoListView[];
};

class TodosStore extends BaseStore<TodosStoreState> {
  fetch: FetchStore<TodoDto[]> = new FetchStore<TodoDto[]>('TodosStoreFetch');

  pagination: PaginationStore = new PaginationStore('TodosStorePagination');

  constructor() {
    super({ todos: [] }, 'TodosStore');
  }
}

export default TodosStore;
