import React, { FC, useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { FetchWrapper } from '@codeleaf-sdk/core/dist/components';
import { Stores } from '../../contexts';
import TodoService from '../../api/TodoService';
import { TodoDto } from '../../models/Todo';
import { mapTodoDtoToListView } from '../../mappers/TodoMapper';
import List from './components/List';

const TodoListPage: FC = () => {
  const { todosStore } = useContext(Stores);
  const { state, handleChange } = todosStore;

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
    <FetchWrapper<TodoDto[]>
      fetch={todosStore.fetch}
      isLoading={(): React.ReactElement => <span>Loading</span>}
      error={(): React.ReactElement => <span>Error: {todosStore.fetch.error?.message}</span>}
      isInitialized={(): React.ReactElement => <List list={state.todos} handleChange={handleChange} />}
    />
  );
};

export default observer(TodoListPage);
