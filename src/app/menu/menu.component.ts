import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { CONSTANTS } from '../app.constants';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
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

  constructor(
    private userService: UserService, private router: Router,
    public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,
    private _tokenService: Angular2TokenService) {
    this._tokenService.init({apiBase: CONSTANTS.BACK_URL});
    this._tokenService.currentUserType;
    this.errors = this.userService.errors;
    this.getUser();

  }
  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      // height: '60%',
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getUser();
    });
  }
  openCreateBusisness(){
    if (this.user.id)
      this.router.navigate(['/profile']);//this.router.url]);
    else
      this.openLoginDialog()
  }
  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      // height: '60%',
      width: '50%'
    });
    var object =this;
    dialogRef.afterClosed().subscribe(result => {
        this.getUser();
      console.log(`Dialog result: ${JSON.stringify(result)}`);
    });
  }
  getUser(){
    console.log("resutl")
    // this._tokenService.currentUserData();
    // this._tokenService.validateToken().subscribe(
    //   res =>      console.log(res),
    //   error =>    console.log(error)
    // );
    console.log("s:",window.localStorage)
    if(window.localStorage.user){
      this.user=JSON.parse(window.localStorage.user);
    }
    console.log("USER::::::::",this.user);

  }
  ngOnInit() {
    this.getUser();
  }
  refresh(){
    this.router.navigate(['/']);//this.router.url]);
  }
  logout(){
    this._tokenService.signOut().subscribe(
        res =>      console.log(res),
        error =>    console.log(error)
    );
    window.localStorage.removeItem('user');
    window.location.reload(true);
    // this.router.navigate(['/']);
    // window.localStorage.removeItem('access-token');
    // window.localStorage.removeItem('client');
    // window.localStorage.removeItem('uid');
    this.user = {};
  }
  registerUser(){
    this.loading=true;
    this.errorsRegister = [];
    this.userService.user = this.user;
    this._tokenService.registerAccount({
      email:                this.user.email,
      password:             this.user.password,
      passwordConfirmation: this.user.password_confirmation
  }).subscribe(
      data => {
        console.log("data:", data)
        data = JSON.parse(data['_body']);
        this.user = data['data'];
        window.localStorage.setItem('user', JSON.stringify(this.user));
        this.refresh();
        this.loading=false;
      },
      error => {
        this.errorHttp = true; this.loading=false;
        if("_body" in error){
          error=JSON.parse(error._body);
          console.log(error);
          error.errors.full_messages.forEach(element => {
            this.errorsRegister.push(element);
          });
        }
      }
  );
    // this.userService.createUser().subscribe(data => {
    //   var token, uid, client;
    //   // token = data['headers'].get('access-token');
    //   // client = data['headers'].get('client');
    //   // uid = data['headers'].get('uid');
    //   data = JSON.parse(data['_body']);
    //   this.user = data['data'];
    //   window.localStorage.setItem('user', JSON.stringify(this.user));
    //   // window.localStorage.setItem('access-token', token);
    //   // window.localStorage.setItem('client', client);
    //   // window.localStorage.setItem('uid', uid);
    //   console.log("data: ", data);
    //   this.refresh();
    //   this.loading=false;
    // },
    // error => {
    //   this.errorHttp = true; this.loading=false;
    //   if("_body" in error){
    //     error=JSON.parse(error._body);
    //     console.log(error);
    //     error.errors.full_messages.forEach(element => {
    //       this.errorsRegister.push(element);
    //     });
    //   }
    // });
  }

  loginUser(){
    this.errors=[];
    this.loading=true;
    this.userService.user = this.user;
    this._tokenService.signIn({
      email:    this.user.email,
      password: this.user.password,
    }).subscribe(
      data => {
        console.log(data);
        this.loading=false;
        var token, uid, client;
        token = data['headers'].get('access-token');
        client = data['headers'].get('client');
        uid = data['headers'].get('uid');
        data = JSON.parse(data['_body']);
        this.user = data['data'];
        window.localStorage.setItem('user', JSON.stringify(this.user));
        window.localStorage.setItem('access-token', token);
        window.localStorage.setItem('client', client);
        window.localStorage.setItem('uid', uid);
        this.refresh();
      },
      error =>    {
        this.loading=false;
        this.errorHttp = true; this.loading=false; console.log(error._body);
        if (error && '_body' in error){
          error = JSON.parse(error._body);
          error.errors.forEach(element => {
            this.errors.push(element);
          });
        }
      }
    );
    // var r = this.userService.logIn().subscribe((data) => {
    //   console.log(data);
    //   this.loading=false;
    //   var token, uid, client;
    //   token = data['headers'].get('access-token');
    //   client = data['headers'].get('client');
    //   uid = data['headers'].get('uid');
    //   data = JSON.parse(data['_body']);
    //   this.user = data['data'];
    //   window.localStorage.setItem('user', JSON.stringify(this.user));
    //   window.localStorage.setItem('access-token', token);
    //   window.localStorage.setItem('client', client);
    //   window.localStorage.setItem('uid', uid);
    //   this.refresh();
    // },
    // error => {
    //   this.loading=false;
    //   this.errorHttp = true; this.loading=false; console.log(error._body);
    //   if (error && '_body' in error){
    //     error = JSON.parse(error._body);
    //     error.errors.forEach(element => {
    //       this.errors.push(element);
    //     });
    //   }
    //   console.log(this.errors);
    //   return this;
    // });
  }

}
