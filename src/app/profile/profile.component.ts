import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
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
  public loading: boolean = false;
  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    window.localStorage.getItem('access-token');
    window.localStorage.getItem('client');
    window.localStorage.getItem('uid');
  }

}
