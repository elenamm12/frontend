import { Component, OnInit } from '@angular/core';
import { WaveServiceService } from 'src/app/services/wave-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-foros',
  templateUrl: './foros.component.html',
  styleUrls: ['./foros.component.scss']
})
export class ForosComponent implements OnInit {
  forums: any[] = [];
  filteredForums: Observable<string[]>;
  filterForum='';
  myControl = new FormControl();

  constructor(    private waveService: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router) { }

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

  likeForo(id: number){
    this.waveService.likeForum(id).subscribe((res)=>{
      if (res){
        console.log(res)}
    });
  }

  dislikeForo(id: number){
    this.waveService.dislikeForum(id).subscribe((res)=>{
      if (res){
        console.log(res)}
    });
  }

}
