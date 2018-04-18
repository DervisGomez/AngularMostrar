import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Error404Component } from './error-404/error-404.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
export const appRoutes: Routes = [                
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    data: { preload: false }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { preload: false }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { preload: false }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { preload: false }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { preload: false }
  },
  {
    path: '404',
    component: Error404Component,
    data: { preload: false }
  },
  {
      path: '**',
      redirectTo: '404'
  }
];
