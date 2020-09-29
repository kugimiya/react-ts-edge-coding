export interface TodoDto {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoListView {
  id: number;
  name: string;
}
