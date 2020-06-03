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
  url = 'http://localhost:3000';

  mockUser = {
    username: 'aja@aja.com',
    contraseña: '1234567',
  };

  private token: string;
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
            this.saveToken(res.accessToken);
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
            this.saveToken(res.accessToken);
          } else {
            console.log('no hay respuesta');
          }
        })
      );
  }

  private saveToken(token: string): void {
    localStorage.setItem('currentToken', token);

    this.token = token;
  }

  logOutUser(): void {
    localStorage.removeItem('currentToken');
    this.token = null;
  }

  getToken() {
    this.token = localStorage.getItem('currentToken');

    return this.token;
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
  }

  getAllForums(): Observable<any> {
    //let token = localStorage.getItem('currentToken');
    return this.http.get(`/forum/all`);
  }

  getForumsBySubcategory(idSubcategory: number): Observable<any> {
    let token = localStorage.getItem('currentToken');
    return this.http.get(
      `/forum/subcategory/${idSubcategory}?access_token=${token}`
    );
  }
}
