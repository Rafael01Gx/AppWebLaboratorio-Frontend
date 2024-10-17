import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  #router = inject(Router);
  #authService = inject(AuthService); 

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authToken = sessionStorage.getItem('auth-token');

    if (authToken) {
      return this.#authService.verifyToken(authToken).then(isValid => {
        if (isValid) {
          return true;
        } else {
          this.#router.navigate(['/login']);
          return false;
        }
      });
    } else {
      this.#router.navigate(['/login']);
      return false;
    }
  }
}
