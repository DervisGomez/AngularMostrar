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
  constructor(public dialogRef: MatDialogRef<AreYouSureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
