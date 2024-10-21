import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

import { tap } from 'rxjs';
import { LoginResponse } from '../../../shared/models/loginResponse.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
#httpClient = inject(HttpClient)


login(email: string , password: string){
  return this.#httpClient.post<LoginResponse>(`${environment.api_url}/users/login`, {email,password}).pipe(
    tap((value) => {
      sessionStorage.setItem("auth-token", value.token)
      sessionStorage.setItem("user-name", value.name)     
      sessionStorage.setItem("user-level", value.level)    
    })
  )
}

signup(name: string , email: string , password: string, confirmpassword: string){
  return this.#httpClient.post<LoginResponse>(`${environment.api_url}/users/sigin`, {name,email,password,confirmpassword}).pipe(
    tap((value) => {
      sessionStorage.setItem("auth-token", value.token)     
      sessionStorage.setItem("user-name", value.name)     
    })
  )
}

}
