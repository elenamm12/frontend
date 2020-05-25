import { Injectable } from '@angular/core';
import { AbstractJsEmitterVisitor } from '@angular/compiler/src/output/abstract_js_emitter';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { map, tap } from 'rxjs/operators'; 
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

  private token:string;
  private authSubject= new BehaviorSubject(false);
  

  constructor(private http:HttpClient) { }  

  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "aplication/json"
  });

loginUser(email: String, password:String): Observable<any>{
  
  console.log('servicio activo')
  return this.http.post<any>(`${this.url}/user/login`, {email, password})
  .pipe(tap(
    (res:any)=>{
      if(res){
         // this.saveToken(res.user.token)
      }
    })
  );

 
}

private saveToken(token: string): void{
  localStorage.setItem("currentToken", token);
  
  this.token = token;

}

private getToken(): string{
  if(!this.token){
  this.token = localStorage.getItem("currentToken");
   }
return this.token;   

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
   
  localStorage.removeItem("currentUser");
  localStorage.removeItem("currentToken");
  

}


} 
