import { BaseStore, FetchStore, PaginationStore } from '@codeleaf-sdk/core/dist/store';
import { action } from 'mobx';
import { TodoDto, TodoListView } from '../models/Todo';

type TodosStoreState = {
  todos: TodoListView[];
};

class TodosStore extends BaseStore<TodosStoreState> {
  fetch: FetchStore<TodoDto[]> = new FetchStore<TodoDto[]>('TodosStoreFetch');

  pagination: PaginationStore = new PaginationStore('TodosStorePagination');

  constructor() {
    super({ todos: [] }, 'TodosStore');
  }

  @action.bound
  handleChange(id: TodoListView['id'], checked: boolean): void {
    this.commit({
      todos: this.state.todos.map((tItem) => {
        return tItem.id === id ? { ...tItem, checked } : tItem;
      }),
    });
  }
}

export default TodosStore;
