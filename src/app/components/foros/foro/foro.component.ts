import { Component, OnInit } from '@angular/core';
import { WaveServiceService } from 'src/app/services/wave-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss'],
})
export class ForoComponent implements OnInit {
  foroId: number;
  Foro: any = {};
  posts: any[] = [];
  postId: number;
  latestPosts: any[] = [];
  areThereNewPosts: boolean = false; // Cuando esta variable sea true tienes que mostrarle un pop-up al usuario para cargar los posts nuevos
  intervalControl: any;
  constructor(
    private waveService: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.foroId = this.route.snapshot.params['id'];
    this.waveService.getForumsById(this.foroId).subscribe((response) => {
      this.Foro = response.forums;
      console.log(this.Foro);
      this.waveService.getPostByForumId(this.foroId).subscribe((response) => {
        this.posts = response.posts;
        this.postId = this.posts[this.posts.length - 1].id;
        this.intervalControl = setInterval(this.intervalPostCheck, 10000);
      });
    });
  }

  refreshPost() {
    this.posts = this.posts.concat(this.latestPosts);
    this.areThereNewPosts = false;
    this.intervalControl = setInterval(this.intervalPostCheck, 10000);
  }

  intervalPostCheck = () => {
    this.waveService.getLatestPosts(this.postId).subscribe((response) => {
      if (response.posts && response.posts.length > 0) {
        this.latestPosts = response.posts;
        this.areThereNewPosts = true;
        clearInterval(this.intervalControl);
      }
    });
  };
}
