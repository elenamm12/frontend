import { Component, OnInit } from '@angular/core';
import { WaveServiceService } from 'src/app/services/wave-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: any[] = [];

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
