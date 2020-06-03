import { Component, OnInit } from '@angular/core';
import { WaveServiceService } from 'src/app/services/wave-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  private forums: any[] = [];

  constructor(
    private waveService: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Carga todos los Foros
    this.waveService.getAllForums().subscribe((response) => {
      this.forums = response.forums;
      console.log(this.forums);
    });
  }

  logOut() {
    this.waveService.logOutUser();
  }
}
