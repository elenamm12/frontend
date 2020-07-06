import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms'
import { WaveServiceService } from 'src/app/services/wave-service.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.scss']
})
export class CambiarContrasenaComponent implements OnInit {
  private   Pattern: any = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])/;
  //
  user: any; 
  

  loginForm: FormGroup;

  checkPasswords(group: FormGroup) {
    let pass = group.controls.contra.value;
    let confirmPass = group.controls.contraconf.value;

    return pass === confirmPass ? null : { notSame: true };
  }


  constructor(private waveService: WaveServiceService, private formBuilder: FormBuilder,) { 
    this.loginForm = this.formBuilder.group(
      {
       
        contra: new FormControl('', [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
          Validators.pattern(this.Pattern)
        ]),
        contraconf: new FormControl(''),
        categorias: this.formBuilder.array([]),
        tipoCuenta: new FormControl('', Validators.required),
      },
      { validator: [this.checkPasswords] }
    );
  }


  ngOnInit() {
  
  }

  onResetForm() {
    this.loginForm.reset();
  }

  

  onSaveForm(){
  
  }

  get contra(){
    return this.loginForm.get('contra')
  };

  get contraconf(){
    return this.loginForm.get('contraconf')
  };

}
