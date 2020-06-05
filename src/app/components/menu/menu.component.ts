import { Component, OnInit } from '@angular/core';
import { WaveServiceService } from 'src/app/services/wave-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  private forums: any[] = [];
  filteredForums: Observable<string[]>;
  myControl = new FormControl();

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
    //
    this.filteredForums = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string):string[] {
    const filterValue = value.toLowerCase();

    return this.forums.filter(option => option.title.toLowerCase().includes(filterValue));
  } 

  logOut() {
    this.waveService.logOutUser();
  }
}
