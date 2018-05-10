import { Component, OnInit, ViewChild, ElementRef, Inject, Input } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { API_ROUTES } from '../../../app.constants';
import { CONSTANTS } from '../../../app.constants';
import { Router } from '@angular/router';

declare var Snackbar: any;
@Component({
  selector: 'admin-create-pyme-products',
  templateUrl: './create.component.html',
//   styleUrls: ['./pymes.component.scss']
})

export class CreatePymeProductsComponent implements OnInit {
  public loading: boolean = false;
  public generalLoading: boolean = false;
  public errors: any=[];
  @Input() pymeId : string = "";
  public product: any = {
    "name": "",
    "description": "",
    "price": ""
  };

  public myProducts: any;
  public currentModal: string;
  public pymeSelected: any={};

  constructor(
    private router: Router,
    private _tokenService: Angular2TokenService) {
    this._tokenService.init({apiBase: CONSTANTS.BACK_URL});
    // this.myPymes=[]
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
    };
  }

  ngOnInit() {
  }

  createProduct() {
    this.loading=true;
    let object = this;
    let url = API_ROUTES.createProductsPyme().replace(":type_profile", "pymes").replace(":id_profile", this.pymeId);
    let params = {"product": this.product} //JSON.stringify(
    this._tokenService.post(url, params).subscribe(
      data =>      {
        data = JSON.parse(data['_body']);
        // window.localStorage.setItem('user', JSON.stringify(this.user));
        Snackbar.show({
          text: "Producto Creado Exitosamente",
          showAction: true,
          actionText: '<i class="material-icons">close</i>',
          ppos: "top-right",
          actionTextColor: '#fff'
        });

        this.loading=false;
        // this.router.navigate(['/admin/pyme/'], { queryParams: "58" });
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
  // getMyPymes(){
  //   this.generalLoading=true;
  //   let object = this;
  //   let url = API_ROUTES.getMyPymes();
  //   console.log(url);
  //   this._tokenService.get(url).subscribe(
  //     data =>      {
  //       data = JSON.parse(data['_body']);
  //       console.log(data);
  //       if (data['data'].length)
  //       this.myPymes = data['data'];
  //       this.generalLoading=false;
  //     },
  //     error =>  {
  //       this.generalLoading=false;
  //       if("_body" in error){
  //         error = error._body;
  //         console.log("error: ",error);
  //         if (error.errors && error.errors.full_messages){
  //           error.errors.full_messages.forEach(element => {
  //             object.errors.push(element);
  //           });
  //         }
  //         // this.toastr.error("Error al obtener las Pymes", 'Pyme Error');
  //       }
  //     }
  //   );
  // }
}
