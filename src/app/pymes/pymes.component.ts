import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { API_ROUTES } from '../app.constants';
import { CONSTANTS } from '../app.constants';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {CreatePymeComponent} from './create.component';
import {LoginComponent} from '../login/login.component'
import {AreYouSureComponent} from './are-you-sure.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { CanActivate } from "@angular/router";
declare var Snackbar: any;

@Component({
  selector: 'app-pymes',
  templateUrl: './pymes.component.html',
  styleUrls: ['./pymes.component.scss']
})
export class PymesComponent implements OnInit {
  public loading: boolean = false;
  public generalLoading: boolean = false;
  public errors: any=[];
  public user: any = {
    "user_id": JSON.parse(window.localStorage.getItem('user')).id,
    "type_profile": "pyme",
    "title": "Titulo del pyme",
    "name": "Nombre del pyme",
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
  @ViewChild('modalCreateClose') modalCreateClose: ElementRef;

  constructor(
    public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data: any,
   private _tokenService: Angular2TokenService) {
    this._tokenService.init({apiBase: CONSTANTS.BACK_URL});
    this.myPymes=[];
  }

  ngOnInit() {
    this.getMyPymes();
  }
  openCreatePyme() {
    const dialogRef = this.dialog.open(CreatePymeComponent, {
      // height: '60%',
      width: '50%'
    });
    var object = this;
    dialogRef.afterClosed().subscribe(result => {
      object.getMyPymes();
    });
  }
  // createPyme(){
  //   this.loading=true;
  //   let object = this;
  //   let url = API_ROUTES.createPyme();
  //   let params= {"profile": this.user} //JSON.stringify(
  //   this._tokenService.post(url, params).subscribe(
  //     data =>      {
  //       data = JSON.parse(data['_body']);
  //       Snackbar.show({
  //         text: "Pyme Creado Exitosamente",
  //         showAction: true,
  //         actionText: '<i class="material-icons">close</i>',
  //         pos: "top-center",
  //         actionTextColor: '#fff'
  //       });
  //
  //       this.getMyPymes();
  //       this.loading=false;
  //       this.modalCreateClose.nativeElement.click()
  //
  //       // this.router.navigate(['/profile']);
  //     },
  //     error =>   {
  //       this.loading=false;
  //       if("_body" in error){
  //         error = error._body;
  //         console.log("error: ",error);
  //         if (error.errors && error.errors.full_messages){
  //           error.errors.full_messages.forEach(element => {
  //             object.errors.push(element);
  //           });
  //         }
  //         this.toastr.error("Error al crear el Pyme", 'Pyme Error');
  //       }
  //     }
  //   );
  // }
  selectPyme(pyme){
    this.pymeSelected = pyme;
  }
  deletePyme(pyme){
    let dialogRef = this.dialog.open(AreYouSureComponent, {
      width: '300px',
      data: {
        pyme: pyme,
        passRequired: true,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed', result);
      // if (!result) return;
      //
      // this.generalLoading=true;
      //
      // let url = API_ROUTES.deletePyme().replace(":pyme_id", pyme.attributes.id);
      // let object = this;
      // this._tokenService.post(url, {password: '12345678'}).subscribe(
      //   data =>      {
      //     console.log(data)
      //     this.generalLoading=false;
      //     this.toastr.warning('La pyme ha sido eliminada!', 'Pyme!');
      //     this.getMyPymes()
      //   },
      //   error =>   {
      //     this.generalLoading=false;
      //     console.log("error: ",error);
      //     if("_body" in error){
      //       error = JSON.parse(error._body);
      //       if(error.data && error.data.id){
      //         this.toastr.warning('La pyme ha sido eliminada!', 'Pyme!');
      //       }
      //       if (error.errors && error.errors.full_messages){
      //         error.errors.full_messages.forEach(element => {
      //           object.errors.push(element);
      //         });
      //       }
      //       // this.toastr.error("Error al eliminar la Pyme", 'Pyme Error');
      //     }
      //     this.getMyPymes();
      //   }
      // );
    });

  }
  getMyPymes(){
    this.generalLoading=true;
    let object = this;
    let url = API_ROUTES.getMyPymes();
    this._tokenService.get(url).subscribe(
      data =>      {
        data = JSON.parse(data['_body']);
        if (data['data'].length)
        this.myPymes = data['data'];
        this.generalLoading=false;
      },
      error =>  {
        this.generalLoading=false;
        if("_body" in error){
          error = error._body;
          if (error.errors && error.errors.full_messages){
            error.errors.full_messages.forEach(element => {
              object.errors.push(element);
            });
          }
          Snackbar.show({
            text: "Error al obtener las Pymes",
            showAction: true,
            actionText: '<i class="material-icons">close</i>',
            pos: "bottom-center",
            actionTextColor: '#fff'
          });
        }
      }
    );
  }

}
