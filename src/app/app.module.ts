import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { appRoutes, } from './app.routes';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from "@angular/forms";
import { Error404Component } from './error-404/error-404.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { Angular2TokenService, A2tUiModule } from 'angular2-token';
import { PymesComponent } from './pymes/pymes.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreatePymeComponent } from './pymes/create.component';
//import "../assets/ngx-toastr/toastr.css";
//import "../assets/ngx-toastr/toastr-bs4-alert";

// imports material angular
import { MaterialModule } from './material.module';
import { MaterializeModule } from 'angular2-materialize';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatInputModule, MatFormFieldModule} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    Error404Component,
    ForgotPasswordComponent,
    ProfileComponent,
    PymesComponent,
    LoginComponent,
    RegisterComponent,
    CreatePymeComponent
  ],
  imports: [
    MatDialogModule,
    RouterModule.forRoot(
      appRoutes, {onSameUrlNavigation: 'reload', preloadingStrategy: PreloadAllModules}
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    MatInputModule, MatProgressSpinnerModule, MatFormFieldModule
  ],
  exports: [RouterModule],
  providers: [
    FormBuilder,
    UserService,
    Angular2TokenService,
    MatDialog,
    { provide: MAT_DIALOG_DATA, useValue: [] },
    {provide: MatDialogRef, useValue: {}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
