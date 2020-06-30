import { Injectable } from '@angular/core';
import { AbstractJsEmitterVisitor } from '@angular/compiler/src/output/abstract_js_emitter';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, tap, catchError, retry } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { RespI } from '../model/resp-i';

@Injectable({
  providedIn: 'root',
})
export class WaveServiceService {
  //url = 'http://localhost:3000';
  url = 'https://wave-service.herokuapp.com';

  mockUser = {
    username: 'aja@aja.com',
    contraseña: '1234567',
  };

  public token: string;
  public picture: string;
  public user: any;
  private authSubject = new BehaviorSubject(false);
  //
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  //

  constructor(private http: HttpClient) {}

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'aplication/json',
  });

  //metodo del servicio que hace http request y espera la respuesta de tipo RespI
  //que es una interfaz hubicada en la carpeta model, en caso de existir la respuesta llama al metodo que guarda el token en localstorage
  loginUser(email: String, password: String): Observable<any> {
    return this.http
      .post<any>(`${this.url}/user/login`, { email, password })
      .pipe(
        tap((res: any) => {
          if (res) {
            console.log(res);
            this.saveToken(res.accessToken);
            this.saveUser(res.user);
          } else {
            console.log('no hay respuesta');
          }
        })
      );
  }

  registerUser(
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    birthday: Date,
    password: string,
    role: string
  ): Observable<any> {
    return this.http
      .post<any>(`${this.url}/user/register`, {
        firstName,
        lastName,
        userName,
        email,
        birthday,
        password,
        role,
      })
      .pipe(
        tap((res: any) => {
          if (res) {
            console.log(res);
            this.saveToken(res.accessToken);
            this.saveUser(res.userCreated);
          } else {
            console.log('no hay respuesta');
          }
        })
      );
  }

  uploadPicture(file: File): Observable<any> {
    const fd = new FormData();
    fd.append('file', file, file.name);
    return this.http.post(`${this.url}/user/profile/photo/upload`, fd).pipe(
      tap((res: any) => {
        if (res) {
          this.savePick(res.imageUrl);
        } else {
          console.log('no hay respuesta');
        }
      })
    );
  }

  uploadPictureForo(file: File, idForum: number): Observable<any> {
    const fd = new FormData();
    fd.append('file', file, file.name);
    return this.http.post(`${this.url}/forum/photo/upload/${idForum}`, fd).pipe(
      tap((res: any) => {
        if (res) {
          console.log('listo');
        } else {
          console.log('no hay respuesta');
        }
      })
    );
  }

  private savePick(url: string) {
    localStorage.setItem('ProfilePick', url);
  }

  private saveToken(token: string): void {
    localStorage.setItem('currentToken', token);

    this.token = token;
  }

  private saveUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.user = user;
  }

  logOutUser(): void {
    localStorage.removeItem('currentToken');
    this.token = null;
  }

  getToken() {
    this.token = localStorage.getItem('currentToken');

    return this.token;
  }

  getPic() {
    this.picture = localStorage.getItem('ProfilePick');
    return this.picture;
  }

  getCurrentUser() {
    let user;
    user = localStorage.getItem('currentUser');
    return user;
  }

  loginUserMock(email: String, password: String) {
    console.log('servicio activo');
    if (
      email == this.mockUser.username &&
      password == this.mockUser.contraseña
    ) {
      console.log('fake auth complete');
      localStorage.setItem('currentToken', 'fake');
    } else {
      alert('usuario no registrado');
    }
  }

  logOut() {
    localStorage.removeItem('currentToken');
    localStorage.removeItem('currentUser');
  }

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.url}/category/all`);
  }

  getSubcategoryByCategory(idCategory: number): Observable<any> {
    return this.http.get(`${this.url}/sub-category/category/${idCategory}`);
  }

  getAllForums(currentPage: number = 1): Observable<any> {
    //let token = localStorage.getItem('currentToken');
    return this.http.get(`${this.url}/forum/all?page=${currentPage}`);
  }

  getForumsBySubcategory(
    idSubcategory: number,
    currentPage: number = 1
  ): Observable<any> {
    return this.http.get(
      `${this.url}/forum/subcategory/${idSubcategory}?page=${currentPage}`
    );
  }

  getForumsById(idForum: number): Observable<any> {
    return this.http.get(`${this.url}/forum/${idForum}`);
  }

  getCategoryById(idCategory: number): Observable<any> {
    return this.http.get(`${this.url}/category/${idCategory}`);
  }

  getSubCategoryById(idSubCategory: number): Observable<any> {
    return this.http.get(`${this.url}/sub-category/${idSubCategory}`);
  }

  getFavoriteSubCategories(): Observable<any> {
    return this.http.get(`${this.url}/category/favorites`);
  }

  getFavoritesForums(idSubCategory: number): Observable<any> {
    return this.http.get(
      `${this.url}/forum/favorites/sub-category/${idSubCategory}`
    );
  }

  getCategoriesWSubcategories(currentPage: number = 1): Observable<any> {
    return this.http.get(
      `${this.url}/category/all/with/subcategories?page=${currentPage}`
    );
  }

  saveFavoriteSubCategoria(subcategoryId: any) {
    return this.http.patch(`${this.url}/sub-category/add/favorite`, [
      { id: subcategoryId },
    ]);
  }

  dislikeSubcategorie(id: number) {
    return this.http.patch(`${this.url}/sub-category/dislike/${id}`, []);
  }

  // Servicios de los Posts
  getPostByForumId(idForum: number, currentPage: number = 1): Observable<any> {
    return this.http.get(
      `${this.url}/post/all/forum/${idForum}?page=${currentPage}`
    );
  }

  getLatestPosts(idPost: number): Observable<any> {
    return this.http.get(`${this.url}/post/latest/${idPost}`);
  }

  likePost(idPost: number): Observable<any> {
    return this.http.patch(`${this.url}/post/like/${idPost}`, []);
  }

  dislikePost(idPost: number): Observable<any> {
    return this.http.patch(`${this.url}/post/dislike/${idPost}`, []);
  }

  postComment(text: string, idForum: number) {
    return this.http.post(`${this.url}/post/publish/forum/${idForum}`, {
      text,
    });
  }

  // Servicios de los Forums

  likeForum(idForum: number): Observable<any> {
    return this.http.patch(`${this.url}/forum/like/${idForum}`, []);
  }

  dislikeForum(idForum: number): Observable<any> {
    return this.http.patch(`${this.url}/forum/dislike/${idForum}`, []);
  }

  createForum(idSub: number, title: string) {
    return this.http.post(`${this.url}/forum/create/${idSub}`, { title });
  }
}
