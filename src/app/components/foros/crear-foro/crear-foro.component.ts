import { Component, OnInit } from '@angular/core';
import { WaveServiceService } from 'src/app/services/wave-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-foro',
  templateUrl: './crear-foro.component.html',
  styleUrls: ['./crear-foro.component.scss']
})
export class CrearForoComponent implements OnInit {
  CatWFavoriteSubcat: [];
  seleccionado;
  text;

  constructor(private service :WaveServiceService, private router: Router) { }

  ngOnInit(): void {
    this.service.getFavoriteSubCategories().subscribe((res)=>{
      this.CatWFavoriteSubcat = res.categories;
      console.log(this.CatWFavoriteSubcat);
    })
  }

  crearForo(idSubcategory, title){
    this.service.createForum(idSubcategory, title).subscribe((response)=>{
      if(response){
        alert("foro creado")
        this.router.navigate(['/foros']);
      }
    })
  }

  onSaveForm(){
  this.crearForo(this.seleccionado, this.text);
  }
}
