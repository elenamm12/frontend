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
  categoryById: any = [];

  categoria: any;
  subcategories: any[] = [];
  categoryId: number;
  contentCategory = [];

  constructor(
    private waveService: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params['id'];
    this.waveService.getCategoryById(this.categoryId).subscribe((response) => {
      console.log(response);
      this.categoryById = response;
      console.log("categoria", this.categoryById);

      this.waveService
        .getSubcategoryByCategory(this.categoryId)
        .subscribe((response) => {
          console.log(response);
          this.subcategories = response.subCategories;
          console.log(this.subcategories);
        });
    });
    this.waveService
        .getAllContentCategory()
        .subscribe((response) => {
          console.log(response);
          this.contentCategory = response.Contents;
          
        });
  }
}

