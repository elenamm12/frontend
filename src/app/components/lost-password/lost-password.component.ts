import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { WaveServiceService } from 'src/app/services/wave-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.scss']
})
export class LostPasswordComponent implements OnInit {

  private   emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //
  

  createFormGroup (){
    return new FormGroup({
    usuario: new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern)  
    ])
    })
  }

  loginForm: FormGroup;


  constructor(private waveService: WaveServiceService, private router: Router) { 
    this.loginForm = this.createFormGroup();
  }


  ngOnInit() {
  
  }

 
  onSaveForm(){
    this.waveService.generateLink(this.loginForm.value.usuario).subscribe((res)=>{
      alert(res.message);
      this.loginForm.reset();
      this.router.navigate(['/']);
    })
  }

  get usuario(){
    return this.loginForm.get('usuario')
  };


 

}
