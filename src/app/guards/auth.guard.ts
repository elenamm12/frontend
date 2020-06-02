import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WaveServiceService } from '../services/wave-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service : WaveServiceService, private rout: Router){
    
  }
 canActivate(){
   if(this.service.getToken()){
     return true
   }else{
     this.rout.navigate(['/iniciar-sesion'])
     return false
   }
 }
  
}
