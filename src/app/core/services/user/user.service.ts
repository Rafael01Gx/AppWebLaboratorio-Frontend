import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IUserData, IUserRecoveryPassword, IUserResponse } from '../../../shared/interfaces/IUser.interface';
import { Observable, shareReplay, tap } from 'rxjs';
import { UsersResponse } from '../../../shared/models/response.type';
import { UserResponse } from '../../../shared/models/userResponse.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  #http = inject(HttpClient);
  #allUsersUrl = signal(`${environment.api_url}/users/allusers`);
  #userByIdUrl = signal(`${environment.api_url}/users`);
  #updateUserByIdUrl = signal(`${environment.api_url}/users/edit`);
  #updateUserAdmdUrl = signal(`${environment.api_url}/users/adm/edit`);
  #deletUserByIdUrl = signal(`${environment.api_url}/users/adm/delete`);
  #checkUserUrl = signal(`${environment.api_url}/users/`);
  #forgotPasswordUrl = signal(`${environment.api_url}/users/forgot-password`);
  #resetPasswordUrl = signal(`${environment.api_url}/users/reset-Password`);
  

  //Buscar Todos os usuarios
  #setUsers = signal<UsersResponse<IUserData[]> | null>(null);
  public getUserList = this.#setUsers.asReadonly();

  public httpUserList(): Observable<UsersResponse<IUserData[]>> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.get<UsersResponse<IUserData[]>>(this.#allUsersUrl(), { headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setUsers.set(res);
      })
    );   
  }

  //Buscar Usuario
  #setUserById = signal<IUserData | null>(null);
  public getUserById = this.#setUserById.asReadonly();

  public httpUserById(id:string): Observable<IUserData> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.get<IUserData>(`${this.#userByIdUrl()}/${id}`, { headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setUserById.set(res);
       
      })
    );   
  }
    //Buscar Usuario atual
    #setCheckUser = signal<IUserData | null>(null);
    public getCheckUser= this.#setUserById.asReadonly();
  
    public httpCheckUser(): Observable<IUserData> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
      return this.#http.get<IUserData>(`${this.#checkUserUrl()}`, { headers }).pipe(
        shareReplay(),
        tap((res) => {
          this.#setCheckUser.set(res);
         
        })
      );   
    }

  //Atualizar Usuario
  #setUpdateUserById = signal<IUserData | null>(null);
  public getUpdateUserById = this.#setUpdateUserById.asReadonly();
  

  public httpUpdateUserById(id: string, userEdit:IUserData): Observable<IUserData> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.patch<IUserData>(`${this.#updateUserByIdUrl()}/${id}`,{userEdit},{ headers}).pipe(
      shareReplay(),
      tap((res) => {
        this.#setUpdateUserById.set(res);
      
      })
    );   
  }

// Atualizar Usuario ADM
#setUpdateUserAdm = signal<IUserData | null>(null);
public getUpdateUserAdm = this.#setUpdateUserAdm.asReadonly();

public httpUpdateUserAdm(id: string, authorization: boolean, level: string): Observable<IUserData> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
  return this.#http.patch<IUserData>(
    `${this.#updateUserAdmdUrl()}/${id}`,  
    { authorization, level },             
    { headers }                           
  ).pipe(
    shareReplay(),
    tap((res) => {
      this.#setUpdateUserAdm.set(res);
    })
  );
}

// Deletar Usuario ADM
#setDeletUserAdm = signal<IUserData | null>(null);
public getDeletUserAdm = this.#setDeletUserAdm.asReadonly();

public httpDeletUserAdm(id: string): Observable<IUserData> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
  return this.#http.delete<IUserData>(
    `${this.#deletUserByIdUrl()}/${id}`,             
    { headers }                           
  ).pipe(
    shareReplay(),
    tap((res) => {
      this.#setDeletUserAdm.set(res);
    })
  );
}

#setUserForgotPassword = signal<IUserResponse | null>(null)
public getUserForgotPassword = this.#setUserForgotPassword.asReadonly();

public httpUserForgotPassword(email:string){
  return this.#http.post<IUserResponse>(`${this.#forgotPasswordUrl()}`,{ email }).pipe(
    shareReplay(),
    tap((res) => {
      this.#setUserForgotPassword.set(res);
    })
  );
}

#setUserRecoveryPassword = signal<IUserResponse | null>(null)
public getUserRecoveryPassword = this.#setUserRecoveryPassword.asReadonly();

public httpUserRecoveryPassword(user_recovery: IUserRecoveryPassword){
  return this.#http.patch<IUserResponse>(`${this.#resetPasswordUrl()}`,{ user_recovery}).pipe(
    shareReplay(),
    tap((res) => {
      this.#setUserRecoveryPassword.set(res);
    })
  );
}




  constructor() {}
}
