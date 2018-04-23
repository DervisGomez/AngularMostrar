import { Component, OnInit } from '@angular/core';
import { API_ROUTES } from '../app.constants';
import { Angular2TokenService } from 'angular2-token';
import { CONSTANTS } from '../app.constants';
declare var $: any;
declare var Snackbar: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loadingPymes: boolean = false;
  loadingPymesSlick: boolean = false;
  loadingSellers: boolean = false;
  loadingSellersSlick: boolean = false;
  loadingIndependents: boolean = false;
  loadingIndependentsSlick: boolean = false;
  pymes: any = [];
  sellers: any = [];
  independents: any = [];
  errors: any = [];
  constructor(private _tokenService: Angular2TokenService) {
    this._tokenService.init({apiBase: CONSTANTS.BACK_URL});
    this.pymes = [];
    this.independents = [];
    this.sellers = [];
   }

  ngOnInit() {
    this.getPymes();
    this.getSellers();
    this.getIndependents();
    var object = this;
  }
  ngDoCheck(){
    if (!this.loadingIndependents && !this.loadingIndependentsSlick){
      this.loadingIndependentsSlick=true;
      this.renderCarousel('carousel-independents');
    }
    if (!this.loadingPymes && !this.loadingPymesSlick){
      this.loadingPymesSlick=true;
      this.renderCarousel('carousel-pymes');
    }
    if (!this.loadingSellers && !this.loadingSellersSlick){
      this.loadingSellersSlick = true;
      this.renderCarousel('carousel-sellers');
    }

  }
  renderCarousel(id){
    setTimeout(()=>{
      $('#'+id).slick({
        responsive: [
          {
            breakpoint: 1025,
            settings: {
              centerMode: true,
              centerPadding: '200px',
              slidesToShow: 1
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      });
    },400);
  }

  getPymes(){
    this.loadingPymes=true;
    let object = this;
    let url = API_ROUTES.getPymes();
    this._tokenService.get(url).subscribe(
      data =>      {
        data = JSON.parse(data['_body']);
        if (data['data'].length)
          this.pymes = data['data'];
        this.loadingPymes=false;
      },
      error =>  {
        this.loadingPymes=false;
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
  getIndependents(){
    this.loadingIndependents=true;
    let object = this;
    let url = API_ROUTES.getIndependents();
    this._tokenService.get(url).subscribe(
      data =>      {
        data = JSON.parse(data['_body']);
        console.log(data)
        if (data['data'].length)
          this.independents = data['data'];
        this.loadingIndependents=false;
      },
      error =>  {
        this.loadingIndependents=false;
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
  getSellers(){
    this.loadingSellers=true;
    let object = this;
    let url = API_ROUTES.getSellers();
    this._tokenService.get(url).subscribe(
      data =>      {
        data = JSON.parse(data['_body']);
        if (data['data'].length)
          this.sellers = data['data'];
        this.loadingSellers=false;
      },
      error =>  {
        this.loadingSellers=false;
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
