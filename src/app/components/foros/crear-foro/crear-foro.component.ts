import { Component, OnInit } from '@angular/core';
import { WaveServiceService } from 'src/app/services/wave-service.service';

@Component({
  selector: 'app-crear-foro',
  templateUrl: './crear-foro.component.html',
  styleUrls: ['./crear-foro.component.scss']
})
export class CrearForoComponent implements OnInit {
  CatWFavoriteSubcat: [];
  constructor(private service :WaveServiceService) { }

  ngOnInit(): void {
    this.service.getFavoriteSubCategories().subscribe((res)=>{
      this.CatWFavoriteSubcat = res.categories;
    })
  }

  crearForo(idSubcategory, title){
    this.service.createForum(idSubcategory, title).subscribe((response)=>{
      console.log(response);
    })
  }
}
