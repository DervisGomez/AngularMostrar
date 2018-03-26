import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Error404Component } from './error-404/error-404.component';
export const appRoutes: Routes = [                
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '404',
    component: Error404Component,
  },
  {
      path: '**',
      redirectTo: '404'
  }
];
