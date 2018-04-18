import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES } from '../app.constants';
import { Angular2TokenService } from 'angular2-token';
import { CONSTANTS } from '../app.constants';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public option: string = 'dashboard';

  ngOnInit() {
    $('#carousel-following').slick({
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            centerMode: true,
            centerPadding: '200px',
            slidesToShow: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    });
  }

  // public user: any = {
  //   id: '',
  //   nickname: '',
  //   email: '',
  //   name: '',
  //   current_password: '',
  //   token: '',
  //   client: '',
  //   uid: ''
  // };
  // public errors: any=[];
  // public errorsRegister: any;
  // public errorHttp: boolean = false;
  // public loading: boolean = false;
  // public tabActive: string = 'profile';
  //
  // constructor(private userService: UserService, private router: Router,
  //   private toastr: ToastrService, private _tokenService: Angular2TokenService) {
  //     this._tokenService.init({apiBase: CONSTANTS.BACK_URL});
  //  }
  //
  // selectTab(val){
  //   this.tabActive=val;
  // }
  // ngOnInit() {
  //   var object = this;
  //   this.loading=true;
  //   this.user = JSON.parse(window.localStorage.getItem('user'));
  //   this.user.token=window.localStorage.getItem('access-token');
  //   this.user.client=window.localStorage.getItem('client');
  //   this.user.uid=window.localStorage.getItem('uid');
  //
  //   let url = API_ROUTES.currentUser();
  //   console.log(url)
  //   this._tokenService.get(url).subscribe(
  //     data =>      {
  //       data = JSON.parse(data['_body']);
  //       if (!data){
  //         this.router.navigate(['/']);
  //       }
  //       let id = data['data'].id;
  //       this.user = Object.assign({}, this.user, data['data'].attributes);
  //       this.user.id = id;
  //       window.localStorage.setItem('user', JSON.stringify(this.user));
  //       this.loading=false;
  //     },
  //     error =>   {
  //       this.errorHttp = true; this.loading=false;
  //       if("_body" in error){
  //         error = error._body;
  //         console.log("error: ",error);
  //         if (error.errors && error.errors.full_messages){
  //           error.errors.full_messages.forEach(element => {
  //             object.errors.push(element);
  //           });
  //         }
  //       }
  //       this.router.navigate(['/']);
  //     }
  //   );
    // this.userService.currentUser(this.user.token, this.user.client, this.user.uid).subscribe(data => {
    //   console.log(this.user.token);
    //   console.log(data);
    //   data = JSON.parse(data['_body']);
    //   if (!data){
    //     this.router.navigate(['/']);
    //   }
    //   let id = data['data'].id;
    //   this.user = Object.assign({}, this.user, data['data'].attributes);
    //   this.user.id = id;
    //   window.localStorage.setItem('user', JSON.stringify(this.user));
    //   this.loading=false;
    // },
    // error => {
    //   this.errorHttp = true; this.loading=false;
    //   if("_body" in error){
    //     error=JSON.parse(error._body);
    //     console.log(error);
    //     error.errors.full_messages.forEach(element => {
    //       object.errors.push(element);
    //     });
    //   }
    //   this.router.navigate(['/']);
    // });
  // }
  // changePass(){
  //
  // }
  // updateUser(){
  //   var object = this;
  //   object.errors=[];
  //   this.loading=true;
  //   this.userService.user = this.user;
  //   let url = API_ROUTES.updateUser();
  //   this._tokenService.put(url, this.user).subscribe(
  //     data =>      {
  //       data = JSON.parse(data['_body']);
  //       console.log("data:: ", data);
  //       this.user = Object.assign({}, this.user, data['data']);
  //       this.toastr.success('Perfil Actualizado!', 'Perfil!');
  //       this.loading=false;
  //     },
  //     error => {
  //       this.errorHttp = true; this.loading=false;
  //       if("_body" in error){
  //         error=JSON.parse(error._body);
  //         console.log(error);
  //         console.log(object);
  //         if (error.errors.full_messages){
  //           error.errors.full_messages.forEach(element => {
  //             object.errors.push(element);
  //             this.toastr.error(element, 'Major Error');
  //           });
  //         }else {
  //           error.errors.forEach(element => {
  //             object.errors.push(element);
  //           });
  //         }
  //       }
  //       this.toastr.error('Perfil No Actualizado!', 'Major Error');
  //     });
    // this.userService.updateUser(this.user.token, this.user.client, this.user.uid).subscribe(data => {
    //   var token, uid, client;
    //   // token = data['headers'].get('access-token');
    //   // client = data['headers'].get('client');
    //   // uid = data['headers'].get('uid');
    //   data = JSON.parse(data['_body']);
    //   console.log("data:: ", data);
    //   this.user = Object.assign({}, this.user, data['data']);
    //   this.toastr.success('Perfil Actualizado!', 'Toastr fun!');
    //   // window.localStorage.setItem('user', JSON.stringify(this.user));
    //   // window.localStorage.setItem('access-token', token);
    //   // window.localStorage.setItem('client', client);
    //   // window.localStorage.setItem('uid', uid);
    //   this.loading=false;
    // },
    // error => {
    //   this.errorHttp = true; this.loading=false;
    //   if("_body" in error){
    //     error=JSON.parse(error._body);
    //     console.log(error);
    //     console.log(object);
    //     if (error.errors.full_messages){
    //       error.errors.full_messages.forEach(element => {
    //         object.errors.push(element);
    //       });
    //     }else {
    //       error.errors.forEach(element => {
    //         object.errors.push(element);
    //       });
    //     }
    //   }
    //   this.toastr.error('Perfil No Actualizado!', 'Major Error');
    // });
  // }

}
