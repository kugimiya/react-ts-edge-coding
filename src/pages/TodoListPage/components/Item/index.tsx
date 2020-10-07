import React, { FC, memo, useCallback } from 'react';
import { Paper, Checkbox, FormControlLabel } from '@material-ui/core';
import { TodoListView } from '../../../../models/Todo';

import s from './styles.module.scss';

interface ItemProps {
  item: TodoListView;
  handleChange: (newFlag: boolean) => void;
}

const Item: FC<ItemProps> = ({ item, handleChange }) => {
  const internalHandleChange = useCallback(
    (event) => {
      handleChange(event.target.checked);
    },
    [handleChange],
  );

  return (
    <Paper className={s.ItemWrapper}>
      <FormControlLabel control={<Checkbox checked={item.checked} onChange={internalHandleChange} />} label={item.name} />
    </Paper>
  );
};

export default memo(Item);
