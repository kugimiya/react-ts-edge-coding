import { Client, ClientDto, ClientsSearchDto } from '@models/Client';
import { morphism, StrictSchema } from 'morphism';
import { YN } from '@models/YesNo';
import parse from 'date-fns/parse';

export const clientMapper = (dto: ClientDto): Client => {
  const schema: StrictSchema<Client, ClientDto> = {
    id: (iteratee) => Number(iteratee.client_id),
    managerId: (iteratee) => Number(iteratee.manager_id),
    firstName: (iteratee) => iteratee.firstname || '_FirstName',
    lastName: (iteratee) => iteratee.lastname || '_LastName',
    patronymic: (iteratee) => iteratee.middlename || '_Patronymic',
    address: (iteratee) => iteratee.address || '_Address',
    comment: (iteratee) => iteratee.comment || '_Comment',
    phone: (iteratee) => iteratee.phone || '_Phone',
    referer: (iteratee) => iteratee.where_from || '_Referer',
    dmc: (iteratee) => iteratee.dmc === YN.Y,
    vip: (iteratee) => iteratee.dmc === YN.Y,
    birthday: (iteratee) => parse(iteratee.birthday || '1970-01-01', 'yyyy-MM-dd', new Date()),
  };

  return morphism(schema, dto);
};

export const clientIdsFromSearchMapper = (dto: ClientsSearchDto): number[] => {
  const schema: StrictSchema<{ ids: number[] }, ClientsSearchDto> = {
    ids: (iteratee) => iteratee.clients.map((item) => Number(item.id)),
  };

  return morphism(schema, dto).ids;
};
