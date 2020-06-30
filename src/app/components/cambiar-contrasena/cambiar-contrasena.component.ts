import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { WaveServiceService } from 'src/app/services/wave-service.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.scss']
})
export class CambiarContrasenaComponent implements OnInit {
  private   emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //
  user: any; 

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


  constructor(private waveService: WaveServiceService) { 
    this.loginForm = this.createFormGroup();
  }


  ngOnInit() {
   //this.waveService.getAll()
   //.subscribe(users => this.users = users); 
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
   /* if(this.loginForm.valid){
    console.log(this.loginForm.value);
    this.waveService.loginUserMock(this.loginForm.value.usuario, this.loginForm.value.contra);
    this.onResetForm();
    }else{
      console.log('No Valido');
    }*/
  }

  get usuario(){
    return this.loginForm.get('usuario')
  };

  get contra(){
    return this.loginForm.get('contra')
  };

}
