import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { CONSTANTS } from '../app.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: any = {
    nickname: '',
    email: '',
    name: '',
    password: '',
    password_confirmation: ''
  };
  public errors: any;
  public errorsRegister: any;
  public errorHttp: boolean = false;
  public loading: boolean = false

  constructor(private userService: UserService, private router: Router,
    private _tokenService: Angular2TokenService) { 
    this._tokenService.init({apiBase: CONSTANTS.BACK_URL});
    
    this._tokenService.currentUserType;
    this.errors = this.userService.errors;
    if(window.localStorage.getItem('user')){
      this.user=JSON.parse(window.localStorage.getItem('user'));
    }
  }

  ngOnInit() {
  }


  loginUser(){
    let object = this;
    this.errors=[];
    this.loading=true;
    this.userService.user = this.user;
    this._tokenService.signIn({
      email:    this.user.email,
      password: this.user.password,
    }).subscribe(
      data => {
        this.loading=false;
        var token, uid, client;
        data = JSON.parse(data['_body']);
        this.user = data['data'];
        window.localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['/']);
      },
      error =>    {
        this.loading=false;
        this.errorHttp = true; this.loading=false; 
        console.log(error._body);
        if (error && '_body' in error){
          error = JSON.parse(error._body);
          error.errors.forEach(element => {
            object.errors.push(element);
          });
        }
      }
    );
  }

}
