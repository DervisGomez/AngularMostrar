import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Angular2TokenService } from 'angular2-token';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES } from '../app.constants';
import { CONSTANTS } from '../app.constants';
import {LoginComponent} from '../login/login.component'
declare var Snackbar: any;

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
  }

  onNoClick(): void {
    this.dialogRef.close();
    
  }
  onDelete(){
    this.loading=true;
      let url = API_ROUTES.deletePyme().replace(":pyme_id", this.data.pyme.id);
      let object = this;
      this._tokenService.put(url, {current_password: this.password}).subscribe(
        data =>      {
          this.loading=false;
          Snackbar.show({
            text: "Pyme Eliminada Exitosamente",
            showAction: true,
            actionText: '<i class="material-icons">close</i>',
            pos: "bottom-center",
            actionTextColor: '#fff'
          });
          this.dialogRef.close();
        },
        error =>   {
          this.loading=false;
          if("_body" in error){
            error = JSON.parse(error._body);
            if (error.lenght){
              error.error.forEach(element => {
                object.errors.push(element);
                Snackbar.show({
                  text: element,
                  showAction: true,
                  actionText: '<i class="material-icons">close</i>',
                  pos: "bottom-center",
                  actionTextColor: '#fff'
                });
              });
            }else{
              Snackbar.show({
                text: "Error al eliminar el Pyme, verifique su contraseña",
                showAction: true,
                actionText: '<i class="material-icons">close</i>',
                pos: "bottom-center",
                actionTextColor: '#fff'
              });
            }
            // this.toastr.error("Error al eliminar la Pyme", 'Pyme Error');
          }
          this.dialogRef.close();
        }
      );
  }
}
