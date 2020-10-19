import React, { FC, memo } from 'react';
import { Client } from '@models/Client';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { format } from 'date-fns';
import { Typography } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import LoadingCircularProgress from '../../../../components/LoadingCircularProgress';

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
  firstName: string,
  lastName: string,
  phone: string,
  address: string,
  birthday: Date,
): { id: number; firstName: string; lastName: string; phone: string; address: string; birthday: Date } {
  return { id, firstName, lastName, phone, address, birthday };
}

interface ClientsTableProps {
  clients: Client[];
  rowsPerPage: number;
  page: number;
  total: number;
  onChangePage: (page: number) => void;
  isLoading: boolean;
}

const ClientsTable: FC<ClientsTableProps> = ({ clients, rowsPerPage, page, onChangePage, total, isLoading }) => {
  const classes = useStyles();

  const rows = clients.map((client) =>
    createData(client.id, client.firstName, client.lastName, client.phone, client.address, client.birthday),
  );

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography className={classes.title}>FirstName</Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.title}>LastName</Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.title}>Phone</Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.title}>Address</Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.title}>Birthday</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <LoadingCircularProgress />
          ) : (
            rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{format(row.birthday, 'dd.MM.yyyy')}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(_ev, newPage): void => {
          onChangePage(newPage);
        }}
      />
    </TableContainer>
  );
};

export default memo(ClientsTable);
