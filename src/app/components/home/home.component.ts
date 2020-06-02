import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categorias = 
    {
      "id": 897465,
      "text": "música",
      "imagen":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcROmHpFb5PTjn16wuNq0A9PCmyvWCh_bE7ZD76--ridMeq-c5mU&usqp=CAU"
    }
  
  constructor() { }

  ngOnInit(): void {
  }

}
