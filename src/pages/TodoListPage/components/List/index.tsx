import React, { FC, memo } from 'react';
import { Box } from '@material-ui/core';
import { TodoListView } from '../../../../models/Todo';
import Item from '../Item';

interface ListProps {
  list: TodoListView[];
  handleChange: (id: TodoListView['id'], checked: boolean) => void;
}

const List: FC<ListProps> = ({ list, handleChange }) => {
  const content = list.map((item) => (
    <Item
      key={item.id}
      item={item}
      handleChange={(newFlag): void => {
        handleChange(item.id, newFlag);
      }}
    />
  ));

  return (
    <Box display="flex" flexDirection="column">
      {content}
    </Box>
  );
};

export default memo(List);
