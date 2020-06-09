import { Component, OnInit } from '@angular/core';
import { WaveServiceService } from 'src/app/services/wave-service.service';

@Component({
  selector: 'app-favoritas',
  templateUrl: './favoritas.component.html',
  styleUrls: ['./favoritas.component.scss']
})
export class FavoritasComponent implements OnInit {
  //tiene las subcategorias favoritas;
  favoriteCategories : any[] = [];
  Categories:any[] = [];


  constructor(private waveService : WaveServiceService) { }

  ngOnInit(): void {
    this.waveService.getFavoriteSubCategories().subscribe((response)=>{
     
      this.favoriteCategories = response.categories;
      console.log("favorite", this.favoriteCategories);
    });
    this.waveService.getCategoriesWSubcategories().subscribe((response)=>{
      this.Categories=response;
      console.log('categorias', this.Categories);
    })
  }

}
