import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { API_ROUTES } from '../app.constants';
import { CONSTANTS } from '../app.constants';
import { Router } from '@angular/router';

declare var Snackbar: any;
@Component({
  selector: 'app-create-pyme',
  templateUrl: './create.component.html',
//   styleUrls: ['./pymes.component.scss']
})
export class CreatePymeComponent implements OnInit {
  public loading: boolean = false;
  public generalLoading: boolean = false;
  public errors: any=[];
  public user: any = {
    "user_id": JSON.parse(window.localStorage.getItem('user')).id,
    "type_profile": "pyme",
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
  public myPymes: any;
  public currentModal: string;
  public pymeSelected: any={};
  // @ViewChild('modalCreateClose') modalCreateClose: ElementRef;
  constructor(
    private router: Router,
    private _tokenService: Angular2TokenService) {
    this._tokenService.init({apiBase: CONSTANTS.BACK_URL});
    this.myPymes=[]
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
    };
  }

  ngOnInit() {
  }

  createPyme(){
    this.loading=true;
    let object = this;
    let url = API_ROUTES.createPyme();
    let params= {"profile": this.user} //JSON.stringify(
    this._tokenService.post(url, params).subscribe(
      data =>      {
        data = JSON.parse(data['_body']);
        // window.localStorage.setItem('user', JSON.stringify(this.user));
        Snackbar.show({
          text: "Tienda Creada Exitosamente",
          showAction: true,
          actionText: '<i class="material-icons">close</i>',
          ppos: "top-right",
          actionTextColor: '#fff'
        });

        this.loading=false;
        this.router.navigate(['/profile'], { queryParams: {tab: "pymes"} });
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
            text: "Error al crear la Pyme",
            showAction: true,
            actionText: '<i class="material-icons">close</i>',
            pos: "top-right",
            actionTextColor: '#fff'
          });
        }
      }
    );
  }
  getMyPymes(){
    this.generalLoading=true;
    let object = this;
    let url = API_ROUTES.getMyPymes();
    console.log(url);
    this._tokenService.get(url).subscribe(
      data =>      {
        data = JSON.parse(data['_body']);
        console.log(data);
        if (data['data'].length)
        this.myPymes = data['data'];
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
          // this.toastr.error("Error al obtener las Pymes", 'Pyme Error');
        }
      }
    );
  }
}
