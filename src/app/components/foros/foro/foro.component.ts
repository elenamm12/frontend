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
  comment = "";
  postComment = [];
  user:any;

  constructor(
    private waveService: WaveServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user=this.waveService.getCurrentUser();
    console.log(this.user);
    this.foroId = this.route.snapshot.params['id'];
    this.waveService.getForumsById(this.foroId).subscribe((response) => {
      console.log(response);
      this.Foro = response.forum;
      console.log(this.Foro);
      this.waveService.getPostByForumId(this.foroId).subscribe((response) => {
        this.posts = response.posts;
        console.log(this.posts);
        this.postId = this.posts[this.posts.length - 1].id;
        this.intervalControl = setInterval(this.intervalPostCheck, 10000);
      });
    });
  }

  post() {
    this.postComment.push(this.comment);
    this.comment = "";
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

  putLikePost(id: number){
    this.waveService.likePost(id);
  }

  postCom(){
    this.waveService.postComment(this.comment, false, this.foroId, this.user.email).subscribe((response) =>{
      if(response){
        console.log("aja ", response)
      }
    });
  }

  actualizar(){
    
    location.reload();
    this.areThereNewPosts=false;

  }
}
