import { createContext } from 'react';
import TodosStore from './stores/TodosStore';

export const Stores = createContext({
  todosStore: new TodosStore(),
});
