import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_ROUTES } from '../app.constants';
import { Http } from '@angular/http';

@Injectable()
export class UserService  {
  public user: any = {};
  public errors: any = [];
  public errorHttp: boolean = false;
  public loading: boolean = false
  // private http: any = Http;
  private headers: any;
  constructor(private http: Http) { 
    this.user;
    this.headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  }

  createUser(){
    // this.loading=true;
    this.errors=[];
    let url = API_ROUTES.registerUser();
    let Params = new HttpParams();
    Params = Params.append('email', this.user.email);
    Params = Params.append('name', this.user.name);
    Params = Params.append('nickname', this.user.nickname);
    Params = Params.append('password', this.user.password);
    Params = Params.append('password_confirm', this.user.password_confirmation);
    return this.http.post(url, this.user, { headers: this.headers, params: Params });
  }
  logIn(){
    // this.loading=true;
    this.errors=[];
    let url = API_ROUTES.login(this.user.email, this.user.password);
    return this.http.post(url, this.user, { headers: this.headers })
  }
}
