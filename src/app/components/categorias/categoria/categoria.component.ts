import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WaveServiceService } from 'src/app/services/wave-service.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent implements OnInit {
   categories: any[] = [];
   categoryById: {};

  categoria: any;
  subcategories: any[] = [];
  categoryId: number;

  categorias = {
    encabezado: 
      'https://i0.wp.com/lapalabra.gt/wp-content/uploads/2018/11/gravity-falls-diario-3-journal-3-entrega-inmediata-D_NQ_NP_808015-MLC25201571264_122016-O.jpg?fit=1042%2C663',
    imagen:
      'https://i.pinimg.com/originals/fc/30/a5/fc30a5269167b32e5cdab0aa8e438261.png',
  };




  constructor(
    private waveService: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.categoryId = this.route.snapshot.params['id'];
      this.waveService.getCategoryById(this.categoryId)
      .subscribe((response)=>{
        console.log(response);
        this.categoryById = response;
      });
      
      this.waveService
        .getSubcategoryByCategory(this.categoryId)
        .subscribe((response) => {
          console.log(response);
          this.subcategories = response.subCategories;
          console.log(this.subcategories);
        });
    };
}

