import { Component, OnInit } from '@angular/core';
import { WaveServiceService } from 'src/app/services/wave-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: any[] = [];
  favoriteCategories : any[] = [];
  categorias = 
  {
    imagen:"https://i0.wp.com/lapalabra.gt/wp-content/uploads/2018/11/gravity-falls-diario-3-journal-3-entrega-inmediata-D_NQ_NP_808015-MLC25201571264_122016-O.jpg?fit=1042%2C663"
  }
  

  
  constructor(
    private waveService: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.waveService.getAllCategories().subscribe((response) => {
      this.categories = response.categories;
      console.log("all", this.categories);
    });

    this.waveService.getFavoriteSubCategories().subscribe((response)=>{
     
      this.favoriteCategories = response.categories;
      console.log("favorite", this.favoriteCategories);
    })
  }

}
