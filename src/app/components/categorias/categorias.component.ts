import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WaveServiceService } from 'src/app/services/wave-service.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit {
  categories: any[] = [];

  private categoryById: {};

  categorias = 
  {
    "imagen":"https://i0.wp.com/lapalabra.gt/wp-content/uploads/2018/11/gravity-falls-diario-3-journal-3-entrega-inmediata-D_NQ_NP_808015-MLC25201571264_122016-O.jpg?fit=1042%2C663"
  };
  
  constructor(
    private waveService: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.waveService.getAllCategories().subscribe((response) => {
      this.categories = response.categories;
      console.log(this.categories);
    });
  }

  getCategoryById(id: number) {
    this.categoryById = this.categories.filter(
      (category) => (category.id = id)
    );
  }
}
