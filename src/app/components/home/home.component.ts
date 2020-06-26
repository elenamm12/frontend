import { Component, OnInit } from '@angular/core';
import { WaveServiceService } from 'src/app/services/wave-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: any[] = [];
  favoriteCategories: any[] = [];

  showNavigationArrows = true;
  showNavigationIndicators = false;

  constructor(
    private waveService: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.waveService.getFavoriteSubCategories().subscribe((response) => {
      this.favoriteCategories = response.categories;
      console.log('favorite', this.favoriteCategories);
    });
  }

  dislikesubC(id: number){
    this.waveService.dislikeSubcategorie(id).subscribe((res)=>{
      if(res){
        console.log(res);
      };
      location.reload();
    });
    
}

