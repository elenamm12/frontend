import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WaveServiceService } from 'src/app/services/wave-service.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent implements OnInit {
  private subcategories: any[] = [];
  private categoryId: number;

  private categoria: any;
  categorias = {
    id: 897465,
    title: 'música',
    texto:
      'BHFE U HBB HWBHF EWA HIB FWHIBFWHI BFWHB HWBWFH BHWE BFHBIWE F H IBWEFHIWE FHBIFE WHBIFEWHIBWF E   BIFBIA WFB HIWF EABIPFEWH BIFEWB HIWBFE HWEH IBIWEBIW FEBJ EBEW JBPEWBP WBIWFE B JQFBOUF EBPFPBQF  BQJBWFBOWEQ',
    imagen:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcROmHpFb5PTjn16wuNq0A9PCmyvWCh_bE7ZD76--ridMeq-c5mU&usqp=CAU',
  };

  sub = [
    {
      imagen:
        'https://i.pinimg.com/originals/26/01/d6/2601d6a94eff41ab0bc3c96b753b5707.jpg',
    },
    {
      imagen:
        'https://image.winudf.com/v2/image1/a2V5Ym9hcmQudGhlbWUubXVzaWMucG9wLmFydC5naXJsX3NjcmVlbl8xXzE1NTgwNjkxMzZfMDgx/screen-1.jpg?fakeurl=1&type=.jpg',
    },
    {
      imagen:
        'https://i.pinimg.com/originals/2c/59/5d/2c595d37e02a12c6333abe6d69a90a67.png',
    },
  ];

  constructor(
    private waveService: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoria = this.route.snapshot.params['id'];
    // Carga las Subcategorias de una Categoria
    this.categoryId = this.route.snapshot.params['id'];
    this.waveService
      .getSubcategoryByCategory(this.categoryId)
      .subscribe((response) => {
        this.subcategories = response.subCategories;
        console.log(this.subcategories);
      });
  }
}
