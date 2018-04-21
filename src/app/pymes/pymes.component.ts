import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES } from '../app.constants';
import { CONSTANTS } from '../app.constants';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {CreatePymeComponent} from './create.component';
import {LoginComponent} from '../login/login.component'
import {AreYouSureComponent} from '../utils/are-you-sure.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { CanActivate } from "@angular/router";
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
    private toastr: ToastrService, private _tokenService: Angular2TokenService) {
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

  selectPyme(pyme){
    this.pymeSelected = pyme;
  }
  deletePyme(pyme){
    let dialogRef = this.dialog.open(AreYouSureComponent, {
      width: '250px',
      data: { 
        pyme: pyme, 
        passRequired: true,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getMyPymes()
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
          this.toastr.error("Error al obtener las Pymes", 'Pyme Error');
        }
      }
    );
  }

}
