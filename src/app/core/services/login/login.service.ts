import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { LoginResponse } from '../../../shared/models/LoginResponse.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
#httpClient = inject(HttpClient)


login(email: string , password: string){
  console.log(`${environment.api_url}/users/login`)
  return this.#httpClient.post<LoginResponse>(`${environment.api_url}/users/login`, {email,password}).pipe(
    tap((value) => {
      sessionStorage.setItem("auth-token", value.token)     
    })
  )
}

}
