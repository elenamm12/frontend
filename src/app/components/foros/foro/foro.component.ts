import { Component, OnInit } from '@angular/core';
import { WaveServiceService } from 'src/app/services/wave-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Postservice } from 'src/app/services/post.socket.service';

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
  comment = '';
  postComment = [];
  user: any;
  suscrito = false;

  constructor(
    private waveService: WaveServiceService,
    private postService: Postservice,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.waveService.getCurrentUser());
    console.log(this.user);
    this.foroId = this.route.snapshot.params['id'];
    this.postService.receivePosts(this.foroId).subscribe((message: any) => {
      if (message.user.email === this.user.email) this.posts.push(message);
      else {
        this.areThereNewPosts = true;
        this.latestPosts.push(message);
      }
      this.waveService.getForumsById(this.foroId).subscribe((response) => {
        // console.log(response);
        this.Foro = response.forum;
        // console.log(this.Foro);
        this.waveService.getPostByForumId(this.foroId).subscribe((response) => {
          this.posts = response.posts;
          // console.log(this.posts);
          this.postId = this.posts[this.posts.length - 1].id;
          this.waveService
            .getFavoritesForums(this.Foro.subCategory.id)
            .subscribe((res) => {
              if (res) {
                // console.log(res);
                this.forosFav = res.forums;
                // console.log(this.forosFav);

                let bool = this.forosFav.find((ob) => ob.id == this.foroId);
                // console.log(bool);
                if (bool != null) {
                  this.suscrito = true;
                }
              }
            });
        });
      });
    });
  }

  refreshPost() {
    this.posts = this.posts.concat(this.latestPosts);
    this.areThereNewPosts = false;
    this.latestPosts = [];
  }

  putLikePost(id: number) {
    this.waveService.likePost(id).subscribe((res) => {
      if (res) {
        // console.log(res);
      }
    });
  }

  postCom() {
    this.postService.sendPost({
      text: this.comment,
      foroId: this.foroId,
      email: this.user.email,
    });
  }

  putDislikePost(id: number) {
    this.waveService.dislikePost(id).subscribe((res) => {
      if (res) {
        // console.log(res);
      }
    });
  }

  likeForo(id: number) {
    this.waveService.likeForum(id).subscribe((res) => {
      if (res) {
        this.suscrito = true;
        // console.log(res);
      }
    });
  }

  dislikeForo(id: number) {
    this.waveService.dislikeForum(id).subscribe((res) => {
      if (res) {
        this.suscrito = false;
        // console.log(res);
        location.reload();
      }
    });
  }
}
