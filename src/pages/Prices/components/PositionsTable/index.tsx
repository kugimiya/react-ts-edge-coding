import React, { FC, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { Position, Product } from '@models/Prices';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  title: {
    fontWeight: 'bold',
  },
});

function createData(
  id: number,
  code: string,
  codeArticle: string,
  title: string,
  price: number,
  status: boolean,
): { id: number; code: string; codeArticle: string; title: string; price: number; status: boolean } {
  return { id, code, codeArticle, title, price, status };
}

interface PositionsTableProps {
  products: Product[];
  positions: Position[];
}

const PositionsTable: FC<PositionsTableProps> = ({ products, positions }) => {
  const classes = useStyles();

  const rows = products.map((product) => {
    const linkedPosition = positions.find((position) => position.productId === product.id);

    return createData(
      product.id,
      product.code,
      product.codeArticle,
      product.title,
      linkedPosition?.price || -1,
      linkedPosition !== undefined,
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography className={classes.title}>Code</Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.title}>CodeArticle</Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.title}>Title</Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.title}>Price</Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.title}>Created</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.code}</TableCell>
              <TableCell>{row.codeArticle}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.price === -1 ? '---' : row.price}</TableCell>
              <TableCell>{row.status ? 'True' : 'Not created'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(PositionsTable);
