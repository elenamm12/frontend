import { Component, OnInit } from '@angular/core';
import { WaveServiceService } from 'src/app/services/wave-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-categoria',
  templateUrl: './sub-categoria.component.html',
  styleUrls: ['./sub-categoria.component.scss'],
})
export class SubCategoriaComponent implements OnInit {
  favoriteForums: any[] = [];
  subcategoryId: number;
  categoryId: number;
  constructor(
    private waveService: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    // Carga los Foros de una Subcategoria
    this.subcategoryId = this.route.snapshot.params['id'];
    this.waveService
      .getForumsBySubcategory(this.subcategoryId)
      .subscribe((response) => {
        this.favoriteForums = response.forums;
        console.log(this.favoriteForums);
      });
  }
}
