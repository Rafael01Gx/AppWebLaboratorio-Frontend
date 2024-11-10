export interface IUserData {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  authorization?: boolean;
  level?: UserLevel;
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
