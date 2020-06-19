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
 
  constructor(
    private waveService: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.waveService.getCategoriesWSubcategories().subscribe((response) => {
      this.categories = response.categories;
      console.log('categorias', this.categories);
    });
  }

  agregarFavorito(subcategoriaId) {
    console.log(subcategoriaId)
    this.waveService
      .saveFavoriteSubCategoria(subcategoriaId)
      .subscribe((response) => console.log(response));
  }
}
