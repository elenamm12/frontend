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
  areThereNewPosts: boolean = false; // Cuando esta variable sea true tienes que mostrarle un pop-up al usuario para cargar los posts nuevos
  intervalControl: any;
  comment = '';
  postComment = [];
  user: any;
  suscrito = false;
  currentPage: number = 1;
  nextPage: boolean;
  latestPosts: any;
  fecha: any;

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
      if (message.user.email !== this.user.email) {
        this.areThereNewPosts = true;
      } else {
        this.waveService.getPostByForumId(this.foroId).subscribe((response) => {
          this.posts = response.items;
          console.log("posts", this.posts);
          this.currentPage = parseInt(response.meta.currentPage);
          this.nextPage =
            this.currentPage !== parseInt(response.meta.totalPages);
          this.postId = this.posts[this.posts.length - 1].id;
          window.scrollTo({ top: 0 });
        });
      }
      
    });

    this.waveService.getForumsById(this.foroId).subscribe((response) => {
      // console.log(response);
      this.Foro = response.forum;
      console.log(this.Foro);
      this.waveService.getPostByForumId(this.foroId).subscribe((response) => {
        this.posts = response.items;
        this.fecha = this.posts[0].date;
        
        console.log("posts", this.fecha);
        this.currentPage = parseInt(response.meta.currentPage);
        this.nextPage = this.currentPage !== parseInt(response.meta.totalPages);
        // console.log(this.posts);
        //this.postId = this.posts[this.posts.length - 1].id;
        this.waveService
          .getFavoritesForums(this.Foro.subCategory.id)
          .subscribe((res) => {
            if (res) {
              // console.log(res);
              this.forosFav = res.forums;
              // console.log(this.forosFav);

              let bool = this.forosFav.find((ob) => ob.id == this.foroId);
              console.log(bool);
              if (bool != null) {
                this.suscrito = true;
              }else{
                this.suscrito = false;
              }
            }
          });
      });
    });

  }

  refreshPost() {
    this.waveService.getPostByForumId(this.foroId).subscribe((response) => {
      this.areThereNewPosts = false;
      this.posts = response.items;
      this.currentPage = parseInt(response.meta.currentPage);
      this.nextPage = this.currentPage !== parseInt(response.meta.totalPages);
      this.postId = this.posts[this.posts.length - 1].id;
    });
  }

  traerMasComentarios() {
    this.waveService
      .getPostByForumId(this.foroId, this.currentPage + 1)
      .subscribe((response) => {
        this.posts = this.posts.concat(response.items);
        this.currentPage = parseInt(response.meta.currentPage);
        this.nextPage = this.currentPage !== parseInt(response.meta.totalPages);
        this.postId = this.posts[this.posts.length - 1].id;
      });
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

  agregarFavorito(subcategoriaId) {
    console.log(subcategoriaId)
    this.waveService
      .saveFavoriteSubCategoria(subcategoriaId)
      .subscribe((response) => console.log(response));
  }

  likeForo(id: number) {
    this.agregarFavorito(this.Foro.subCategory.id);
    this.waveService.likeForum(id).subscribe((res) => {
      if (res) {
        this.suscrito = true;
        // console.log(res);
      }
    });
  }

  reset(){
    this.comment = "";
  }


  dislikeForo(id: number) {
    this.waveService.dislikeForum(id).subscribe((res) => {
      if (res) {
        this.suscrito = false;
        // console.log(res);

      }
    });
  }
}
