import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Error404Component } from './error-404/error-404.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
// import {CreatePymeComponent} from './pymes/create.component';
import { AdminPymesComponent } from './pymes/admin/admin.component';
import { AdminIndependentsComponent } from './independents/admin/admin.component';
import { AdminSellersComponent } from './sellers/admin/admin.component';

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
    // children: [
    //   { path: '/profile', redirectTo: 'tracks' },
    // ]
  },
  {
    path: 'admin/pyme/:pyme_id',
    component: AdminPymesComponent,
    data: { preload: false }
  },
  {
    path: 'admin/independent/:independent_id',
    component: AdminIndependentsComponent,
    data: { preload: false }
  },
  {
    path: 'admin/seller/:seller_id',
    component: AdminSellersComponent,
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
