import { Injectable } from '@angular/core';
import { AbstractJsEmitterVisitor } from '@angular/compiler/src/output/abstract_js_emitter';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util'; 

@Injectable({
  providedIn: 'root'
})
export class WaveServiceService {
  url ='http://localhost:3000';
  mockUser={
    "username": "aja@aja.com",
    "contraseña": "1234567"
  }
  

  constructor(private http:HttpClient) { }  

  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "aplication/json"
  });

loginUser(email: String, password:String): Observable<any>{
  
  console.log('servicio activo')
  return this.http.post(this.url, {email, password},{headers: this.headers})
 .pipe(map(data=> data));
 
} 


loginUserMock(email: String, password:String){
  console.log('servicio activo');
  if (email==this.mockUser.username && password==this.mockUser.contraseña){
    console.log("fake auth complete");
  }else{
    alert('usuario no registrado');
  }

}

setUser(user): void{
  let user_string = JSON.stringify(user);
  localStorage.setItem("currentUser", user_string);
}

setToken(token): void{
  localStorage.setItem("currentToken", token);
}

getToken(){
  return localStorage.getItem("currentToken");
}
  
getAll(){
  return this.http.get<any[]>(this.url);
}

getCurrentUser(){
  let user_string = localStorage.getItem("currentUser");
  if(!(isNullOrUndefined(user_string))){
    let user = JSON.parse(user_string);
    return user;
  }else{
    return null;
  }
}

logOut(){
  //let accessToken= localStorage.get("currentToken");
  //let url = 'http://localhost/300  <== url del metodo 
  localStorage.removeItem("currentUser");
  localStorage.removeItem("currentToken");
  //return this.http.post(url,{headers: this.headers});

}


} 
