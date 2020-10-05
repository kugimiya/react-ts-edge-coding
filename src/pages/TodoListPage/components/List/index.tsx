import React, { FC, memo } from 'react';
import { TodoListView } from '../../../../models/Todo';

interface ListProps {
  list: TodoListView[];
}

const List: FC<ListProps> = ({ list }) => {
  return (
    <>
      {list.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </>
  );
};

export default memo(List);
