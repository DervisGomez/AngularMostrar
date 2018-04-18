import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES } from '../app.constants';
import { CONSTANTS } from '../app.constants';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

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
  @ViewChild('modalCreateClose') modalCreateClose: ElementRef;
  constructor(
    public dialogRef: MatDialogRef<CreatePymeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService, private _tokenService: Angular2TokenService) {
    this._tokenService.init({apiBase: CONSTANTS.BACK_URL});
    this.myPymes=[]
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
        this.toastr.success('Pyme creado!', 'Pyme!');
        this.loading=false;
        // this.modalCreateClose.nativeElement.click()
        this.dialogRef.close();
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
          this.toastr.error("Error al crear el Pyme", 'Pyme Error');
        }
      }
    );
  }

}