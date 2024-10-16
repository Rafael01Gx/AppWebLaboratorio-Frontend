import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/services/auth-guard/auth-guard.service';

export const routes: Routes = [
   {
      path: '',
      component: HomeComponent,
      canActivate:[AuthGuard],
     },
   {
    path: 'login',
    component: LoginComponent
   },
   {
      path: 'criarconta',
      component: SignupComponent
     }
];
