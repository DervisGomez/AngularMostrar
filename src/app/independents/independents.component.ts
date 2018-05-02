import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { API_ROUTES } from '../app.constants';
import { CONSTANTS } from '../app.constants';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { CreateIndependentsComponent } from './create.component';
import { LoginComponent } from '../login/login.component'
import { AreYouSureIndependentComponent } from './are-you-sure.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { CanActivate } from "@angular/router";
declare var Snackbar: any;

@Component({
  selector: 'app-independents',
  templateUrl: './independents.component.html',
  styleUrls: ['./independents.component.scss']
})
export class IndependentsComponent implements OnInit {
  public loading: boolean = false;
  public generalLoading: boolean = false;
  public errors: any=[];
  public user: any = {
    "user_id": JSON.parse(window.localStorage.getItem('user')).id,
    "type_profile": "independent",
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
  public myIndependents: any;
  public toggleView: boolean = true;
  public independentSelected: any={};
  @ViewChild('modalCreateIndependentClose') modalCreateIndependentClose: ElementRef;

  constructor(
    public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data: any,
    private _tokenService: Angular2TokenService) {
    this._tokenService.init({apiBase: CONSTANTS.BACK_URL});
  }

  ngOnInit() {
    this.myIndependents=[];
    this.getMyIndependents();
  }
  openCreateIndependent() {
    const dialogRef = this.dialog.open(CreateIndependentsComponent, {
      // height: '60%',
      width: '50%'
    });
    var object = this;
    dialogRef.afterClosed().subscribe(result => {
      object.getMyIndependents();
    });
  }
  // createIndependent(){
  //   this.loading=true;
  //   let object = this;
  //   let url = API_ROUTES.createIndependent();
  //   let params= {"profile": this.user} //JSON.stringify(
  //   this._tokenService.post(url, params).subscribe(
  //     data =>      {
  //       data = JSON.parse(data['_body']);
  //       Snackbar.show({
  //         text: "Independent Creado Exitosamente",
  //         showAction: true,
  //         actionText: '<i class="material-icons">close</i>',
  //         pos: "top-center",
  //         actionTextColor: '#fff'
  //       });
  //
  //       this.getMyIndependents();
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
  //         this.toastr.error("Error al crear el Independent", 'Independent Error');
  //       }
  //     }
  //   );
  // }
  selectIndependent(independent){
    this.independentSelected = independent;
  }
  deleteIndependent(independent){
    let dialogRef = this.dialog.open(AreYouSureIndependentComponent, {
      width: '300px',
      data: {
        independent: independent,
        passRequired: true,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getMyIndependents();
    });

  }
  getMyIndependents(){
    this.myIndependents=[]
    this.generalLoading=true;
    let object = this;
    let url = API_ROUTES.getMyIndependents();
    this._tokenService.get(url).subscribe(
      data =>      {
        data = JSON.parse(data['_body']);
        if (data['data'].length)
        this.myIndependents = data['data'];
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
            text: "Revisa tu conexión a internet",
            showAction: true,
            actionText: '<i class="material-icons">close</i>',
            pos: "top-right",
            actionTextColor: '#fff'
          });
        }
      }
    );
  }

}
