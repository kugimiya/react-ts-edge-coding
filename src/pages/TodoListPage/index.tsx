import React, { FC, useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Stores } from '../../contexts';
import TodoService from '../../api/TodoService';
import { TodoDto } from '../../models/Todo';
import { mapTodoDtoToListView } from '../../mappers/TodoMapper';
import List from './components/List';
import FetchHoc from '../../components/FetchHoc';

const TodoListPage: FC = () => {
  const { todosStore } = useContext(Stores);

  useEffect(() => {
    if (!todosStore.fetch.isInitialized) {
      todosStore.asyncCommit<TodoDto[]>({
        promise: TodoService.getTodos(todosStore.pagination),
        fetch: todosStore.fetch,
        mapper: (todosDto: TodoDto[]) => ({ todos: mapTodoDtoToListView(todosDto) }),
      });
    }
  }, [todosStore]);

  // TODO: i18n for language variables
  return (
    <FetchHoc<TodoDto[]>
      fetch={todosStore.fetch}
      isLoading={(): React.ReactElement => <span>Loading</span>}
      error={(): React.ReactElement => <span>Error: {todosStore.fetch.error?.message}</span>}
      isInitialized={(): React.ReactElement => <List list={todosStore.state.todos} />}
    />
  );
};

export default observer(TodoListPage);
