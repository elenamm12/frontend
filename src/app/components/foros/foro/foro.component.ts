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
  forosFav = [];
  posts: any[] = [];
  postId: number;
  latestPosts: any[] = [];
  areThereNewPosts: boolean = false; // Cuando esta variable sea true tienes que mostrarle un pop-up al usuario para cargar los posts nuevos
  intervalControl: any;
  comment = "";
  postComment = [];
  user:any;
  suscrito = false;

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
      this.waveService.getFavoritesForums(this.Foro.subCategory.id).subscribe((res)=>{
        if(res){
          console.log(res);
          this.forosFav=res.forums;
          console.log(this.forosFav);
          let bool = this.forosFav.find(ob => ob.id === this.foroId);
          if(bool != null){
            this.suscrito = true;
          }
        }
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
    this.waveService.likePost(id).subscribe((res)=>{
      if(res){
        console.log(res)
      }
    })
  }

  putDislikePost(id: number){
    this.waveService.dislikePost(id).subscribe((res)=>{
      if(res){
        console.log(res)
      }
    })
  }


  postCom(){
    this.waveService.postComment(this.comment, this.foroId,).subscribe((response) =>{
      if(response){
        console.log("aja ", response)
      }
    });
  }

  likeForo(id: number){
    this.waveService.likeForum(id).subscribe((res)=>{
      if (res){
        console.log(res)}
    });
  }

  dislikeForo(id: number){
    this.waveService.dislikeForum(id).subscribe((res)=>{
      if (res){
        console.log(res)}
    });
  }

  actualizar(){
    
    location.reload();
  
  }
}
