import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES } from '../app.constants';
import { CONSTANTS } from '../app.constants';
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
  constructor(private toastr: ToastrService, private _tokenService: Angular2TokenService) {
    this._tokenService.init({apiBase: CONSTANTS.BACK_URL});
    this.myPymes=[]
  }

  ngOnInit() {
    this.getMyPymes();
  }
  openCreatePyme(){
    this.currentModal = 'createPyme';
  }
  openEditPyme(){
    this.currentModal = 'editPyme';
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
        this.modalCreateClose.nativeElement.click()
        object.getMyPymes();
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
  selectPyme(pyme){
    this.pymeSelected = pyme;
    console.log(this.pymeSelected)
  }
  deletePyme(){
    this.generalLoading=true;
    let url = API_ROUTES.deletePyme().replace(":pyme_id", this.pymeSelected.id);
    let object = this;
    this._tokenService.delete(url).subscribe(
      data =>      {
        console.log(data)
        this.generalLoading=false;
        this.toastr.warning('La pyme ha sido eliminada!', 'Pyme!');
        this.getMyPymes()
      },
      error =>   {
        this.generalLoading=false;
        console.log("error: ",error);
        if("_body" in error){
          error = JSON.parse(error._body);
          if(error.data && error.data.id){
            this.toastr.warning('La pyme ha sido eliminada!', 'Pyme!');
          }
          if (error.errors && error.errors.full_messages){
            error.errors.full_messages.forEach(element => {
              object.errors.push(element);
            });
          }
          // this.toastr.error("Error al eliminar la Pyme", 'Pyme Error');
        }
        this.getMyPymes();
      }
    );
  }
  getMyPymes(){
    this.generalLoading=true;
    let object = this;
    let url = API_ROUTES.getMyPymes();
    this._tokenService.get(url).subscribe(
      data =>      {
        data = JSON.parse(data['_body']);
        this.myPymes = data['data'][0].user.pymes;
        // console.log(this.myPymes)
        
        window.localStorage.setItem('user', JSON.stringify(this.user));
        this.generalLoading=false;
      },
      error =>   {
        this.generalLoading=false;
        if("_body" in error){
          error = error._body;
          console.log("error: ",error);
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