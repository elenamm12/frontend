import { Component, OnInit } from '@angular/core';
import { WaveServiceService } from 'src/app/services/wave-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-sub-categoria',
  templateUrl: './sub-categoria.component.html',
  styleUrls: ['./sub-categoria.component.scss'],
})
export class SubCategoriaComponent implements OnInit {
  subcategories: any[] = [];
  favoriteForums: any[] = [];
  subscribedForums: any[] = [];
  subcategory: any = {};
  subcategoryId: number;
  categoryId: number;
  filteredForums: Observable<string[]>;
  myControl = new FormControl();
  constructor(
    private waveService: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  salvando = {
    imagen:
      'https://i.pinimg.com/originals/fc/30/a5/fc30a5269167b32e5cdab0aa8e438261.png',
  };

  ngOnInit(): void {
    this.filteredForums = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    // Carga los Foros de una Subcategoria
    this.categoryId = this.route.snapshot.params['idCateg'];
    this.waveService
      .getSubcategoryByCategory(this.categoryId)
      .subscribe((response) => {
        this.subcategories = response.subCategories;
        console.log('subcategorias', this.subcategories);
        this.subcategoryId = this.route.snapshot.params['id'];
        this.waveService
          .getSubCategoryById(this.subcategoryId)
          .subscribe((response) => {
            this.subcategory = response;
          });

        this.subcategoryId = this.route.snapshot.params['id'];
        this.waveService
          .getSubCategoryById(this.subcategoryId)
          .subscribe((response) => {
            this.subcategory = response;
            console.log('subcategoria', this.subcategory);
          });
        this.waveService
          .getFavoritesForums(this.subcategoryId)
          .subscribe((response) => {
            console.log('suscribes', response.forums);
            this.subscribedForums = response.forums;

            this.waveService
              .getForumsBySubcategory(this.subcategoryId)
              .subscribe((response) => {
                this.favoriteForums = response.forums;
                console.log('foro fav', this.favoriteForums);
              });
          });
      });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.favoriteForums.filter((option) =>
      option.title.toLowerCase().includes(filterValue)
    );
  }
}
