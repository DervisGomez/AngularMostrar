import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Angular2TokenService } from 'angular2-token';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES } from '../app.constants';
import { CONSTANTS } from '../app.constants';
import {LoginComponent} from '../login/login.component'

@Component({
  selector: 'app-are-you-sure',
  templateUrl: './are-you-sure.component.html'
})
export class AreYouSureComponent {
  passRequired: boolean = false;
  password: string = "";
  errors: any = [];
  loading: boolean = false;
  constructor(public dialogRef: MatDialogRef<AreYouSureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _tokenService: Angular2TokenService) {
      this._tokenService.init({apiBase: CONSTANTS.BACK_URL});
      console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
    
  }
  onDelete(){
    this.loading=true;
      let url = API_ROUTES.deletePyme().replace(":pyme_id", this.data.pyme.id);
      let object = this;
      this._tokenService.post(url, {password: this.password}).subscribe(
        data =>      {
          this.loading=false;
          this.dialogRef.close();
        },
        error =>   {
          this.loading=false;
          if("_body" in error){
            error = JSON.parse(error._body);
            if(error.data && error.data.id){
              console.log("eliminada")
            }
            if (error.errors && error.errors.full_messages){
              error.errors.full_messages.forEach(element => {
                object.errors.push(element);
              });
            }
            // this.toastr.error("Error al eliminar la Pyme", 'Pyme Error');
          }
          this.dialogRef.close();
        }
      );
  }
}
