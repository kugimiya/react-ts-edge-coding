import { morphism, StrictSchema } from 'morphism';
import { TodoListView, TodoDto } from '../models/Todo';

export const mapTodoDtoToListView = (rawData: TodoDto[]): TodoListView[] => {
  const schema: StrictSchema<TodoListView, TodoDto> = {
    id: 'id',
    name: 'title',
    checked: 'completed',
  };

  return morphism(schema, rawData);
};
