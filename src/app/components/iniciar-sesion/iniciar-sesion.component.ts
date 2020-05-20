import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit {
  
  //expresion regular para validar email
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //

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


  constructor() { 
    this.loginForm = this.createFormGroup();
  }


  ngOnInit(): void {
  
  }

  onResetForm() {
    this.loginForm.reset();
  }

  onSaveForm(){
    if(this.loginForm.valid){
    console.log(this.loginForm.value);
    this.onResetForm();
    }else{
      console.log('No Valido')
    }
  }

  get usuario(){
    return this.loginForm.get('usuario')
  };

  get contra(){
    return this.loginForm.get('contra')
  };

}
