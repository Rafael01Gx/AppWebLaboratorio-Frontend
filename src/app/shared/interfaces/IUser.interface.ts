export interface IUserData {
    _id?: string;
    name?: string;
    email?: string;
    phone?: string;
    authorization?: boolean;
    level?: UserLevel;
    createdAt?: string;
  }


export type UserLevel =  'Usuário'| 'Operador'| 'Administrador' ;
