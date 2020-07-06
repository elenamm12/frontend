import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WaveServiceService } from 'src/app/services/wave-service.service';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-contenido-recomendado',
  templateUrl: './contenido-recomendado.component.html',
  styleUrls: ['./contenido-recomendado.component.scss'],
})
export class ContenidoRecomendadoComponent implements OnInit {
  categoryId: number;
  categoryById: any;
  files: File[] = [];

  @ViewChild(MatAccordion) accordion: MatAccordion;
  categories: any;
  panelOpenState = false;
  contenido: any;

  constructor(
    private waveService: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

      this.waveService.getAllCategoriesContent().subscribe((response) => {
        this.categories = response;
        console.log('categorias', this.categories);
      });
    
  }

  getContenido(id: number){
    this.waveService.getContentCategory(id).subscribe((response) => {
      console.log(response);
      
    });
  }


	onSelect(event) {
		console.log(event);
		this.files.push(...event.addedFiles);
	}

	onRemove(event) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}
}
