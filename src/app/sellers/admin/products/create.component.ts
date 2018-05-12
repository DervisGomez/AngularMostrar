import { Component, OnInit, ViewChild, ElementRef, Inject, Input } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { API_ROUTES } from '../../../app.constants';
import { CONSTANTS } from '../../../app.constants';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductsSellerComponent } from '../products/products.component';

declare var Snackbar: any;
@Component({
  selector: 'admin-create-seller-products',
  templateUrl: './create.component.html',
//   styleUrls: ['./sellers.component.scss']
})

export class CreateSellerProductsComponent implements OnInit {
  public loading: boolean = false;
  public generalLoading: boolean = false;
  public errors: any=[];
  @Input() sellerId : string = "";
  public product: any = {
    "name": "",
    "description": "",
    "price": ""
  };

  public myProducts: any;
  public currentModal: string;
  public sellerSelected: any={};

  constructor(
    private router: Router,
    private parent: ProductsSellerComponent,
    private _tokenService: Angular2TokenService,
    private activatedRoute: ActivatedRoute) {
    this._tokenService.init({apiBase: CONSTANTS.BACK_URL});
  }

  ngOnInit() {
  }

  createProduct() {
    this.loading=true;
    let object = this;
    let url = API_ROUTES.createProductsSeller().replace(":type_profile", "sellers").replace(":id_profile", this.sellerId);
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
        this.parent.toggleView = true;
        this.parent.getMyProducts();
        // this.router.navigate([`/admin/seller/${this.sellerId}`], { queryParams: {tab: "products"} });
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
  // getMySellers(){
  //   this.generalLoading=true;
  //   let object = this;
  //   let url = API_ROUTES.getMySellers();
  //   console.log(url);
  //   this._tokenService.get(url).subscribe(
  //     data =>      {
  //       data = JSON.parse(data['_body']);
  //       console.log(data);
  //       if (data['data'].length)
  //       this.mySellers = data['data'];
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
  //         // this.toastr.error("Error al obtener las Sellers", 'Seller Error');
  //       }
  //     }
  //   );
  // }
}
