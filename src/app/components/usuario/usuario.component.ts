import { Component, OnInit } from '@angular/core';
import { WaveServiceService } from 'src/app/services/wave-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  user: any;
  forumsPosts:[];
  notSubscribedForumsPosts:[];

  constructor(
    private waveService: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.waveService.getCurrentUser());
    //console.log(this.user);
    this.waveService.getForumsPostsByUser().subscribe((res)=>{
      console.log(res);
    });

    this.waveService.getNotSubscribeByUser().subscribe((res)=>{
      console.log(res);
    });



  }

}
