import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WaveServiceService } from 'src/app/services/wave-service.service';
import { MatAccordion } from '@angular/material/expansion';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contenido-recomendado',
  templateUrl: './contenido-recomendado.component.html',
  styleUrls: ['./contenido-recomendado.component.scss'],
})
export class ContenidoRecomendadoComponent implements OnInit {
  categoryId: number;
  categoryById: any;
  files: File[] = [];
  contentForm: FormGroup;
  pattern = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/

  @ViewChild(MatAccordion) accordion: MatAccordion;
  categories: any;
  panelOpenState = false;
  contenido: any;

  createFormGroup (){
    return new FormGroup({

    titulo: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    link: new FormControl('', [
      Validators.required,
      Validators.pattern(this.pattern)
    ])
    })
  }

  constructor(private spinner: NgxSpinnerService,
    private waveService: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.contentForm = this.createFormGroup();
  }

  ngOnInit(): void {

      this.waveService.getAllCategoriesContent().subscribe((response) => {
        this.categories = response;
        console.log('categorias', this.categories);
      });
    
  }

  catchId(id){
    this.categoryId=id;
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
  
  onSaveForm(){
    if(this.contentForm.valid){
      this.spinner.show();
      this.waveService.CreateContent(this.categoryId, 
                                    this.contentForm.value.titulo, 
                                    this.contentForm.value.descripcion, 
                                    this.contentForm.value.link ).subscribe((res)=>{
                                    if(res){
                                      this.waveService.SavePicContent(res.content.id, this.files).subscribe
                                      ((res)=>{
                                        if(res){
                                        console.log(res)
                                        this.spinner.hide();
                                        alert("hasta aqui llego")}
                                        else{ this.spinner.hide();}
                                      })
                                      
                                    }

                                    })
                                    ;
                                    
      this.contentForm.reset();
    }

  }
  get titulo(){
    return this.contentForm.get('titulo')
  };
  get descripcion(){
    return this.contentForm.get('descripcion')
  };
  get link(){
    return this.contentForm.get('link')
  };
  
}
