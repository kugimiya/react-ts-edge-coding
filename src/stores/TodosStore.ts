import BaseStore from './BaseStore';
import { TodoDto, TodoListView } from '../models/Todo';
import FetchStore from './FetchStore';

type TodosStoreState = {
  todos: TodoListView[];
  message: string;
};

class TodosStore extends BaseStore<TodosStoreState> {
  label = 'TodosStore';

  fetch: FetchStore<TodoDto[]> = new FetchStore<TodoDto[]>();

  constructor() {
    super({ todos: [], message: 'not good boy' });
  }
}

export default new TodosStore();
