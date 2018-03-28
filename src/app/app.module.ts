import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import {FormsModule} from "@angular/forms";
import { Error404Component } from './error-404/error-404.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http'; 
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    Error404Component
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes, { enableTracing: false }
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
