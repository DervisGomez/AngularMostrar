import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { API_ROUTES } from '../app.constants';
import { CONSTANTS } from '../app.constants';
import { Router } from '@angular/router';

declare var Snackbar: any;

@Component({
  selector: 'app-create-seller',
  templateUrl: './create.component.html',
})

export class CreateSellerComponent implements OnInit {
  public loading: boolean = false;
  public generalLoading: boolean = false;
  public errors: any=[];
  public user: any = {
    "user_id": JSON.parse(window.localStorage.getItem('user')).id,
    "type_profile": "seller",
    "title": "",
    "name": "",
    "email": "",
    "banner": "",
    "photo": null,
    "launched": null,
    "phone": null,
    "url": null,
    "address": null,
    "vision": null,
    "mission": null,
    "description": '',
    "web": null,
    "profile": null,
    "experience": null
  };
  public mySellers: any;
  public currentModal: string;
  public sellerSelected: any={};

  constructor(
    private router: Router,
    private _tokenService: Angular2TokenService) {
    this._tokenService.init({apiBase: CONSTANTS.BACK_URL});
    this.mySellers=[]
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
    };
  }

  ngOnInit() {
  }

  createSeller(){
    this.loading=true;
    let object = this;
    let url = API_ROUTES.createSeller();
    let params= {"profile": this.user} //JSON.stringify(
    this._tokenService.post(url, params).subscribe(
      data =>      {
        data = JSON.parse(data['_body']);
        // window.localStorage.setItem('user', JSON.stringify(this.user));
        Snackbar.show({
          text: "Seller Creado Exitosamente",
          showAction: true,
          actionText: '<i class="material-icons">close</i>',
          ppos: "top-right",
          actionTextColor: '#fff'
        });

        this.loading=false;
        this.router.navigate(['/profile'], { queryParams: {tab: "sellers"} });
      },
      error =>   {
        this.loading=false;
        if("_body" in error){
          error = error._body;
          console.log("error: ",error);
          if (error.errors && error.errors.full_messages){
            error.errors.full_messages.forEach(element => {
              object.errors.push(element);
            });
          }
          Snackbar.show({
            text: "Error al crear la Seller",
            showAction: true,
            actionText: '<i class="material-icons">close</i>',
            pos: "top-right",
            actionTextColor: '#fff'
          });
        }
      }
    );
  }
  getMySellers(){
    this.generalLoading=true;
    let object = this;
    let url = API_ROUTES.getMySellers();
    console.log(url);
    this._tokenService.get(url).subscribe(
      data =>      {
        data = JSON.parse(data['_body']);
        console.log(data);
        if (data['data'].length)
        this.mySellers = data['data'];
        this.generalLoading=false;
      },
      error =>  {
        this.generalLoading=false;
        if("_body" in error){
          error = error._body;
          console.log("error: ",error);
          if (error.errors && error.errors.full_messages){
            error.errors.full_messages.forEach(element => {
              object.errors.push(element);
            });
          }
          // this.toastr.error("Error al obtener las Sellers", 'Seller Error');
        }
      }
    );
  }
}
