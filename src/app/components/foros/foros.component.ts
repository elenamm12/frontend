import { Component, OnInit } from '@angular/core';
import { WaveServiceService } from 'src/app/services/wave-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-foros',
  templateUrl: './foros.component.html',
  styleUrls: ['./foros.component.scss'],
})
export class ForosComponent implements OnInit {
  forums: any[] = [];
  filteredForums: Observable<string[]>;
  filterForum = '';
  myControl = new FormControl();
  currentPage: number = 1;
  nextPage: boolean = false;
  myforums: any;
  notMyforums: any[] = [];

  constructor(
    private waveService: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Carga todos los Foros
    this.waveService.getAllForums().subscribe((response) => {
      this.forums = response.items;
      this.currentPage = parseInt(response.meta.currentPage);
      this.nextPage = this.currentPage !== parseInt(response.meta.totalPages);
      this.waveService.getForumsPostsByUser().subscribe((res) => {
        this.myforums = res.forums;
        console.log(this.myforums);
        let vart;
        for (let entry of this.forums) {
          vart = this.myforums.find((ob) => ob.id == entry.id);
          if (vart == null) {
            this.notMyforums.push(entry);
          }
        }
      });
    });

    this.filteredForums = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  traerMasForos() {
    this.waveService
      .getAllForums(this.currentPage + 1)
      .subscribe((response) => {
        this.forums = this.forums.concat(response.items);
        this.currentPage = parseInt(response.meta.currentPage);
        this.nextPage = this.currentPage !== parseInt(response.meta.totalPages);
      });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.forums.filter((option) =>
      option.title.toLowerCase().includes(filterValue)
    );
  }

  likeForo(id: number) {
    this.waveService.likeForum(id).subscribe((res) => {
      if (res) {
        console.log(res);
        this.waveService.getForumsPostsByUser().subscribe((res) => {
          this.myforums = res.forums;
          console.log(this.myforums);
        });
        alert('¡Ahora estás suscrito en el foro!');
      }
    });
  }

  dislikeForo(id: number) {
    this.waveService.dislikeForum(id).subscribe((res) => {
      if (res) {
        console.log(res);
      }
    });
  }

  isFav(id: number) {
    let vart;
    if (this.myforums) {
      vart = this.myforums.find((ob) => ob.id == id);
      if (vart == null) {
        return false;
      }
      return true;
    }
  }
}
