import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: any = {
    id: '',
    nickname: '',
    email: '',
    name: '',
    token: '',
    client: '',
    uid: ''
  };
  public errors: any;
  public errorsRegister: any;
  public errorHttp: boolean = false;
  public loading: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    // this.user = {}
   }

  ngOnInit() {
    this.loading=true;
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.user.token=window.localStorage.getItem('access-token');
    this.user.client=window.localStorage.getItem('client');
    this.user.uid=window.localStorage.getItem('uid');

    this.userService.currentUser(this.user.token, this.user.client, this.user.uid).subscribe(data => {
      console.log(this.user.token);
      console.log(data);
      data = JSON.parse(data['_body']);
      if (!data){
        this.router.navigate(['/']);
      }
      let id = data['data'].id;
      this.user = Object.assign({}, this.user, data['data'].attributes);
      this.user.id = id;
      window.localStorage.setItem('user', JSON.stringify(this.user));
      this.loading=false;
    },
    error => {
      this.errorHttp = true; this.loading=false;
      if("_body" in error){
        error=JSON.parse(error._body);
        console.log(error);
        error.errors.full_messages.forEach(element => {
          this.errors.push(element);
        });
      }
      this.router.navigate(['/']);
    });
  }
  changePass(){

  }
  updateUser(){
    this.loading=true;
    this.userService.user = this.user;
    this.userService.updateUser(this.user.token, this.user.client, this.user.uid).subscribe(data => {
      var token, uid, client;
      token = data['headers'].get('access-token');
      client = data['headers'].get('client');
      uid = data['headers'].get('uid');
      data = JSON.parse(data['_body']);
      console.log("data:: ", data);
      this.user = Object.assign({}, this.user, data['data']);
      window.localStorage.setItem('user', JSON.stringify(this.user));
      window.localStorage.setItem('access-token', token);
      window.localStorage.setItem('client', client);
      window.localStorage.setItem('uid', uid);
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

}
