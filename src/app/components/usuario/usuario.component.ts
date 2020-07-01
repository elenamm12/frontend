import { Component, OnInit } from '@angular/core';
import { WaveServiceService } from 'src/app/services/wave-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  user: any;
  forumsPosts: [];
  notSubscribedForumsPosts: [];
  forumsCreated: [];

  constructor(
    private waveService: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.waveService.getCurrentUser());
    //console.log(this.user);
    this.waveService.getForumsPostsByUser().subscribe((res) => {
      this.forumsPosts = res.forums;
      console.log(this.forumsPosts)
    });

    this.waveService.getNotSubscribedByUser().subscribe((res) => {
      this.notSubscribedForumsPosts = res.forums;
    });
    this.waveService.getForumCreated().subscribe((res) => {
      this.forumsCreated = res.forums;
      console.log("foros creados", this.forumsCreated)
    });
  }

  onDelete(id: number) {
    this.waveService.DeletePost(id).subscribe((res)=>{
      console.log(res)
    });
  }

  dislikeForo(id: number) {
    this.waveService.dislikeForum(id).subscribe((res) => {
      if (res) {
        alert("Dejarás de estar suscrito al foro");
        location.reload();
        // console.log(res);
      }
    });
  }
}
