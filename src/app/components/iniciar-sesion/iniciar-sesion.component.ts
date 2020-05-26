import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { WaveServiceService } from 'src/app/services/wave-service.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit {
  
  //expresion regular para validar email
private   emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //
  user: User; 

  createFormGroup (){
    return new FormGroup({
    usuario: new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern)  
    ]),
    contra: new FormControl('', [
      Validators.required,
      Validators.minLength(7)
    ])
    })
  }

  loginForm: FormGroup;


  constructor(private waveService: WaveServiceService, private router: Router) { 
    this.loginForm = this.createFormGroup();
  }


  ngOnInit() {
  
  }

  onResetForm() {
    this.loginForm.reset();
  }

  onLogIn(){
    this.waveService.loginUser(this.loginForm.value.usuario, this.loginForm.value.contra)
    .subscribe(data=>{ 
      console.log(data);
    },
    error => console.log(error) 
    )
  }

  onSaveForm(){
    if(this.loginForm.valid){
    this.onLogIn();
    this.onResetForm();
    this.router.navigate(['/home']); 

    }else{
      console.log('No Valido');
    }
  }

  get usuario(){
    return this.loginForm.get('usuario')
  };

  get contra(){
    return this.loginForm.get('contra')
  };

}
