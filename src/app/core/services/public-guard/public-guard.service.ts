import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-guard/auth.service';


@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {
  #router = inject(Router);
  #authService = inject(AuthService); 


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authToken = sessionStorage.getItem('auth-token');


    if (authToken) {
      this.#router.navigate(['']);
      return false;
    }
    return true; 
  }
}
