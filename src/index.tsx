import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import TodoService from './api/TodoService';
import { mapTodoDtoToListView } from './mappers/TodoMapper';
import TodosStore from './stores/TodosStore';
import { TodoDto } from './models/Todo';

const Abc = observer(
  (): React.ReactElement => {
    const { fetch } = TodosStore;

    if (fetch.isLoading) {
      return <div>Loading</div>;
    }

    if (fetch.isInitialized) {
      return <div>Loaded</div>;
    }

    return <div>Unknown</div>;
  },
);

ReactDOM.render(
  <React.StrictMode>
    <Abc />
  </React.StrictMode>,
  document.getElementById('root'),
);

const promises = [];
for (let i = 1; i <= 10; i += 1) {
  promises.push(TodoService.getTodo(i.toString()));
}

// TodosStore.fetch.setLoading();
// Promise.all(promises).then((todos) => {
//   TodosStore.commit({ todos: mapTodoDtoToListView(todos) });
//   TodosStore.debugState();
//   TodosStore.fetch.setDone();
// }).catch((error) => {
//   TodosStore.fetch.setFailed(error);
// });

TodosStore.asyncCommit<TodoDto[]>({
  promise: Promise.all(promises),
  fetch: TodosStore.fetch,
  mapper: (todosDto: TodoDto[]) => ({ todos: mapTodoDtoToListView(todosDto) }),
  onFinish: () => {
    TodosStore.commit({ message: 'good boy' });
    TodosStore.debugState();
  },
});
