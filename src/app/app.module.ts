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
import { AreYouSureComponent } from './pymes/are-you-sure.component';
import { CreateIndependentsComponent } from './independents/create.component';
import { IndependentsComponent } from './independents/independents.component';
import { AreYouSureIndependentComponent } from './independents/are-you-sure.component';
import { AdminPymesComponent } from './pymes/admin/admin.component';
import { ProductsPymeComponent } from './pymes/admin/products/products.component';
import { CreatePymeProductsComponent } from './pymes/admin/products/create.component';
import { AreYouSurePymeProductsComponent } from './pymes/admin/products/are-you-sure.component';

import { SellersComponent } from './sellers/sellers.component';
import { CreateSellerComponent } from './sellers/create.component';
import { AreYouSureSellerComponent } from './sellers/are-you-sure.component';

// imports material angular
import { MaterialModule } from './material.module';
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
    IndependentsComponent,
    LoginComponent,
    RegisterComponent,
    CreatePymeComponent,
    CreateIndependentsComponent,
    AreYouSureComponent,
    AreYouSureIndependentComponent,
    SellersComponent,
    CreateSellerComponent,
    AreYouSureSellerComponent,
    AdminPymesComponent,
    ProductsPymeComponent,
    CreatePymeProductsComponent,
    AreYouSurePymeProductsComponent
  ],
  entryComponents: [
    AreYouSureComponent,
    AreYouSureIndependentComponent,
    AreYouSureSellerComponent,
    AreYouSurePymeProductsComponent
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
