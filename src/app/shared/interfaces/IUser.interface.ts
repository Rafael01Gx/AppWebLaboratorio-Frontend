export interface IUserData {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  authorization?: boolean;
  level?: UserLevel;
  area?: string;
  funcao?: string;
  notifications?: INotifications[];
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
export interface INotifications {
  _id: string;
  title: string;
  message: string;
  data: string;
  read: boolean;
};
export type UserLevel = 'Usuário' | 'Operador' | 'Administrador';
