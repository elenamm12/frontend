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
  content0: any;
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
      if(this.categoryById.contentCategories.length > 0 ){
        this.content0 = this.categoryById.contentCategories[0];
      }
      console.log("categoria", this.content0);

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

