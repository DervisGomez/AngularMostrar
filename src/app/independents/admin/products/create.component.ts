import { Component, OnInit, ViewChild, ElementRef, Inject, Input } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { API_ROUTES } from '../../../app.constants';
import { CONSTANTS } from '../../../app.constants';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var Snackbar: any;
@Component({
  selector: 'admin-create-independent-products',
  templateUrl: './create.component.html',
//   styleUrls: ['./independents.component.scss']
})

export class CreateIndependentProductsComponent implements OnInit {
  public loading: boolean = false;
  public generalLoading: boolean = false;
  public errors: any=[];
  @Input() independentId : string = "";
  public product: any = {
    "name": "",
    "description": "",
    "price": ""
  };

  public myProducts: any;
  public currentModal: string;
  public independentSelected: any={};

  constructor(
    private router: Router,
    private _tokenService: Angular2TokenService,
    private activatedRoute: ActivatedRoute) {
    this._tokenService.init({apiBase: CONSTANTS.BACK_URL});
  }

  ngOnInit() {
  }

  createProduct() {
    this.loading=true;
    let object = this;
    let url = API_ROUTES.createProductsIndependent().replace(":type_profile", "independents").replace(":id_profile", this.independentId);
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
        this.router.navigate([`/admin/independent/${this.independentId}`], { queryParams: {tab: "products"} });
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
            text: "Error al crear la Independent",
            showAction: true,
            actionText: '<i class="material-icons">close</i>',
            pos: "top-right",
            actionTextColor: '#fff'
          });
        }
      }
    );
  }
  // getMyIndependents(){
  //   this.generalLoading=true;
  //   let object = this;
  //   let url = API_ROUTES.getMyIndependents();
  //   console.log(url);
  //   this._tokenService.get(url).subscribe(
  //     data =>      {
  //       data = JSON.parse(data['_body']);
  //       console.log(data);
  //       if (data['data'].length)
  //       this.myIndependents = data['data'];
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
  //         // this.toastr.error("Error al obtener las Independents", 'Independent Error');
  //       }
  //     }
  //   );
  // }
}
