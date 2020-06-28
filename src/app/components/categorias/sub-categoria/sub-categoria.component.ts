import { Component, OnInit } from '@angular/core';
import { WaveServiceService } from 'src/app/services/wave-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  fileToUpload = null;
  imageUrl = null;
  file: any;
  favorite = true;
  CatWFavoriteSubcat: [];
  forums: any;
  id: number;
  forumForm: FormGroup;

  createFormGroup() {
    return new FormGroup({
      text: new FormControl('', [Validators.required]),
    });
  }

  handleFileInput(file: FileList) {
    console.log(file);
    this.fileToUpload = file.item(0);
    console.log(this.fileToUpload);

    var reader = new FileReader();
    reader.onloadend = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
    console.log(reader.result);
  }

  onUpload() {
    this.waveService.uploadPicture(this.fileToUpload).subscribe((res) => {
      console.log(res);
    });
  }

  constructor(
    private waveService: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.forumForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.waveService.getAllForums().subscribe((response) => {
      this.forums = response.forums;
      console.log(this.forums);
      this.id = this.forums.length + 2;
      console.log('NUMERO DE FOROS', this.id);
    });

    this.waveService.getFavoriteSubCategories().subscribe((response) => {
      this.CatWFavoriteSubcat = response.categories;
      console.log('hola', this.CatWFavoriteSubcat);
      console.log(response);
      let categoryId: number = this.route.snapshot.params['idCateg'];
      //let aja: [] = response;
      //let bool = this.CatWFavoriteSubcat.find(id => id == categoryId );
      //console.log(bool);
    });

    this.categoryId = this.route.snapshot.params['idCateg'];
    this.filteredForums = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    // Carga los Foros de una Subcategoria

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


  onSaveForm(){
    this.waveService.createForum(this.subcategoryId, this.forumForm.value.text).subscribe((response)=>{   
        console.log("foro creado")
        this.router.navigate([`picture-foro/${this.id}`]);
    })
  }

  get text(){
    return this.forumForm.get('text')
  };

  

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.favoriteForums.filter((option) =>
      option.title.toLowerCase().includes(filterValue)
    );
  }
}
