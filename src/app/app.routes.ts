import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/services/auth-guard/auth-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OsPageComponent } from './pages/os-page/os-page.component';

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
     ,
   {
      path: 'dashboard',
      component: DashboardComponent
     },
     {
      path: 'ordensdeservico',
      component: OsPageComponent
     }
];
