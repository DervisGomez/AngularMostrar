import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

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

  constructor(private userService: UserService, private router: Router) { 
    this.errors = this.userService.errors;
    if(window.localStorage['user']){
      this.user=JSON.parse(window.localStorage['user']);
      
    }
  }

  ngOnInit() {
  }
  refresh(){
    this.router.navigate([this.router.url]);
  }
  logout(){
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('access-token');
    window.localStorage.removeItem('client');
    window.localStorage.removeItem('uid');
    this.user = {};
  }
  registerUser(){
    this.loading=true;
    this.errorsRegister = [];
    this.userService.user = this.user;
    this.userService.createUser().subscribe(data => {
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
      console.log("data: ", data);
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
    });
  }

  loginUser(){
    this.errors=[];
    this.loading=true;
    this.userService.user = this.user;
    var r = this.userService.logIn().subscribe((data) => {
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
    error => {
      this.loading=false;
      this.errorHttp = true; this.loading=false; console.log(error._body);
      if (error && '_body' in error){
        error = JSON.parse(error._body);
        error.errors.forEach(element => {
          this.errors.push(element);
        });
      }
      console.log(this.errors);
      return this;
    });
  }

}
