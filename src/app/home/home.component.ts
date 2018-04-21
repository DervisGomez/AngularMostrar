import { Component, OnInit } from '@angular/core';
import { API_ROUTES } from '../app.constants';
import { Angular2TokenService } from 'angular2-token';
import { CONSTANTS } from '../app.constants';
declare var $: any;
declare var Snackbar: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  pymes: any = [];
  errors: any = [];
  constructor(private _tokenService: Angular2TokenService) {
    this._tokenService.init({apiBase: CONSTANTS.BACK_URL});
    this.pymes = [];
   }

  ngOnInit() {
    this.getPymes();
    var object = this;
    setTimeout(()=>{
      
    }, 400);
  }
  renderCarousel(){
    $('#carousel-pymes, #carousel-independents, #carousel-sellers').slick({
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
  }

  getPymes(){
    this.loading=true;
    let object = this;
    let url = API_ROUTES.getPymes();
    this._tokenService.get(url).subscribe(
      data =>      {
        data = JSON.parse(data['_body']);
        console.log(data)
        if (data['data'].length)
          this.pymes = data['data'];
        this.loading=false;
      },
      error =>  {
        this.loading=false;
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
