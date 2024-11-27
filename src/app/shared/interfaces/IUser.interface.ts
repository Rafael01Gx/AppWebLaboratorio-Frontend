export interface IUserData {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  authorization?: boolean;
  level?: UserLevel;
  area?: string;
  funcao?: string;
  createdAt?: string;
}

export interface IUserResponse {
  user: IUserData;
  message: string;
}
export interface IUserRecoveryPassword {
  token: string;
  email: string;
  password: string;
  confirmpassword: string;
}

export type UserLevel = 'Usuário' | 'Operador' | 'Administrador';
