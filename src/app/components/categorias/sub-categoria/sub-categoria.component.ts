import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-sub-categoria',
  templateUrl: './sub-categoria.component.html',
  styleUrls: ['./sub-categoria.component.scss']
})
export class SubCategoriaComponent implements OnInit {

  categoria = 
  {
    "id": 897465,
    "title": "pop",
    "texto": "BHFE U HBB HWBHF EWA HIB FWHIB FWHI BFWHB HWBWFH BHWE BFHBIWE F H IBFHIWE FHBIFE WHBIFE WHIBWF E BIFBIA WFB HIWF EABI PFEWH BIFEWB HIWBFE HWEH IBIWEBIW FEBJ EBEW JBPWBP WBIWFE B JQFBOUF EBPBQF BQJBmW FBOWEQ lk hbd vbhk wfbih fehw ohibw ebvih ndne eoufj r3",
    "imagen":"https://i.pinimg.com/originals/26/01/d6/2601d6a94eff41ab0bc3c96b753b5707.jpg"
  }

   private subcategoria: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.subcategoria = this.route.snapshot.params["id"];
  }

}
