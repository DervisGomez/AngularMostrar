import { Component, OnInit, ViewChild, ElementRef, Inject, Input } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { API_ROUTES } from '../../../app.constants';
import { CONSTANTS } from '../../../app.constants';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductsPymeComponent } from '../products/products.component';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

declare var Snackbar: any;
@Component({
  selector: 'admin-create-pyme-products',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreatePymeProductsComponent implements OnInit {
  public loading: boolean = false;
  public generalLoading: boolean = false;
  public errors: any=[];
  public visible: boolean = true;
  public selectable: boolean = true;
  public removable: boolean = true;
  public addOnBlur: boolean = true;
  public typeMoney : string = 'USD';

  separatorKeysCodes = [ENTER, COMMA];

  @Input() pymeId : string = "";
  public product: any = {
    "name": "",
    "description": "",
    "price": "",
    "tags": []
  };

  public myProducts: any;
  public currentModal: string;
  public pymeSelected: any={};

  constructor(
    private router: Router,
    private parent: ProductsPymeComponent,
    private _tokenService: Angular2TokenService,
    private activatedRoute: ActivatedRoute) {
    this._tokenService.init({apiBase: CONSTANTS.BACK_URL});
  }

  ngOnInit() {
  }

  moneyType = [
    {value: 'USD', viewValue: 'Dólares'},
    {value: 'BS', viewValue: 'Bolívares'}
  ];

  categories = [
    {value: 'Electrónica' },
    {value: 'Doméstico' },
    {value: 'Computación' },
    {value: 'Telefonía' },
    {value: 'Audio' },
    {value: 'Video' },
    {value: 'Cocina' }
  ];

  add(event: MatChipInputEvent): void {
   let input = event.input;
   let value = event.value;

   // Add our fruit
   if ((value || '').trim()) {
     this.product.tags.push({ name: value.trim() });
   }

   // Reset the input value
   if (input) {
     input.value = '';
   }
 }

 remove(tag: any): void {
   let index = this.product.tags.indexOf(tag);

    if (index >= 0) {
      this.product.tags.splice(index, 1);
    }
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
        this.parent.toggleView = true;
        this.parent.getMyProducts();
        // this.router.navigate([`/admin/pyme/${this.pymeId}`], { queryParams: {tab: "products"} });
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
            text: "Error al crear la Tienda",
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
