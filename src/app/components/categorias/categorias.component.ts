import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WaveServiceService } from 'src/app/services/wave-service.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit {
  private categories: any[] = [];

  categorias = {
    id: 897465,
    text: 'música',
    imagen:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcROmHpFb5PTjn16wuNq0A9PCmyvWCh_bE7ZD76--ridMeq-c5mU&usqp=CAU',
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
}
