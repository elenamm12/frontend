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
  currentPage: number = 1;
  nextPage: boolean = false;

  constructor(
    private waveService: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.waveService.getCategoriesWSubcategories().subscribe((response) => {
      this.categories = response.items;
      this.currentPage = parseInt(response.meta.currentPage);
      this.nextPage = this.currentPage !== parseInt(response.meta.totalPages);
      console.log('categorias', this.categories);
    });
  }

  traerMasCategorias() {
    this.waveService
      .getCategoriesWSubcategories(this.currentPage + 1)
      .subscribe((response) => {
        this.categories = this.categories.concat(response.items);
        this.currentPage = parseInt(response.meta.currentPage);
        this.nextPage = this.currentPage !== parseInt(response.meta.totalPages);
      });
  }

  agregarFavorito(subcategoriaId) {
    console.log(subcategoriaId);
    this.waveService
      .saveFavoriteSubCategoria(subcategoriaId)
      .subscribe((response) => console.log(response));
    alert('¡Ahora estás suscrito en la subcategoría!');
  }
}
