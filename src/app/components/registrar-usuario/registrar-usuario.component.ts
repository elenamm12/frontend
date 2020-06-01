import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder, FormArray, RequiredValidator} from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { WaveServiceService } from 'src/app/services/wave-service.service';

declare var paypal;

export class MyErrorStateMatcher implements ErrorStateMatcher {


  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss']
})
export class RegistrarUsuarioComponent implements OnInit{
  imageUrl : string = "../../../assets/icon/usuario.png";
  fileToUpload: File = null;

  

  private   emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  @ViewChild('paypal',{static:true}) paypalElement : ElementRef;
  
  registerForm: FormGroup;

  

  paypal;

  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private router: Router, private waveService: WaveServiceService  ) {
    this.registerForm = this.formBuilder.group({
      nombres: new FormControl('', [
        Validators.required 
      ]),
      apellidos: new FormControl('', [
        Validators.required
      ]),
      fecha: new FormControl('', [
        Validators.required
      ]),
      correo: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern)  
      ]),  
      usuario: new FormControl('', [
        Validators.required,
        Validators.pattern('')  
      ]),
      image:new FormControl(''),
      contra: new FormControl('', [
        Validators.required,
        Validators.minLength(7)  
      ]),
      validContra: new FormControl(''),
      categorias: this.formBuilder.array([]),
      tipoCuenta: new FormControl('', Validators.required),
      Pay: new FormControl(),
    }, { validator: [
    this.checkPasswords,
    this.checkPay
    ] });

   }

  ngOnInit(): void {
    paypal.
      Buttons({
      createOrder: (data, actions)=>{
        return actions.order.create({
          purchase_units:[{
            description: "Pago Premium",
            amount: {
              currency_code: "USD",
              value: 5
          }
        }
      ]
      })
      },
      onApproved: async(data, actions)=>{
        const order= await actions.order.capture();
        console.log(order);
      },
      onError: err=>{
        console.log(err);
      }
      }).
        render(this.paypalElement.nativeElement);

    
  }

  agregarCategoria(){
    const categoriaFormGroup = this.formBuilder.group({
      Categoria:'' 
    });
    this.categorias.push(categoriaFormGroup);
  }

  removerCategoria(indice){
    this.categorias.removeAt(indice);
  }

  onResetForm() {
    this.registerForm.reset();
  }

  onSaveForm(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      this.waveService.registerUser(this.registerForm.value.nombres, 
                                    this.registerForm.value.apellidos,
                                    this.registerForm.value.usuario, 
                                    this.registerForm.value.correo, 
                                    this.registerForm.value.contra)
      .subscribe(data=>{ 
      console.log(data);
      this.router.navigate(['/home']);
      })
      }else{
        console.log('No Valido')
      }
  }

  checkPasswords(group: FormGroup) { 
  let pass = group.controls.contra.value;
  let confirmPass = group.controls.validContra.value;

  return pass === confirmPass ? null : { notSame: true }     
  }


  checkPay(group: FormGroup){
  let pay = group.controls.tipoCuenta.value;
  let Pay= group.controls.Pay.value;
   return (pay === 'Premium' && Pay===true) || pay=== 'Normal' ? null : { notPay: true } 
  
  }

  get nombres(){
    return this.registerForm.get('nombres')
  };

  get apellidos(){
    return this.registerForm.get('apellidos')
  };

  get fecha(){
    return this.registerForm.get('fecha')
  };

  get usuario(){
    return this.registerForm.get('usuario')
  };

  get correo(){
    return this.registerForm.get('correo')
  };

  get contra(){
    return this.registerForm.get('contra')
  };

  get validContra(){
    return this.registerForm.get('validContra')
  };

  get categorias(){
    return this.registerForm.get('categorias') as FormArray
  };
  
  get tipoCuenta(){
    return this.registerForm.get('tipoCuenta') 
  }; 

  get Pay(){
    return this.registerForm.get('Pay')
  };

  handleFileInput(file: FileList){
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

}
