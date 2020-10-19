export type ClientDto = {
  client_id: string; // "1"
  lastname?: string; // "Шац"
  firstname?: string; //	"Иван"
  middlename?: string; // "Иванович"
  phone?: string; //	"+7 (902) 234-56-78"
  address?: string; //	"Созидателей 87-34"
  birthday?: string; // "1993-03-09"
  comment?: string; //	"наш прекрасный клиент"
  where_from?: string; // "Интернет"
  vip?: string; //	"N"
  dmc?: string; //	"N"
  manager_id?: string; // null
};

export type Client = {
  id: number;
  managerId: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  phone: string;
  address: string;
  birthday: Date;
  comment: string;
  referer: string;
  vip: boolean;
  dmc: boolean;
};

export type ClientSearchDto = {
  id: string; // "11"
  text: string; // "Фамилия Имя Отчеество"
};

export type ClientsSearchDto = {
  clients: ClientSearchDto[];
  count: number;
};
