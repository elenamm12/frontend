import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarUsuarioComponent } from './registrar-usuario.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('RegistrarUsuarioComponent', () => {

  let component: RegistrarUsuarioComponent;
  let fixture: ComponentFixture<RegistrarUsuarioComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarUsuarioComponent ],
      imports:[ReactiveFormsModule,FormsModule, RouterTestingModule],
      providers: [ HttpClient,HttpHandler],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // VALIDACIÓN DEL CAMPO NOMBRES.
  it('nombres field validity',()=>{
    fixture = TestBed.createComponent(RegistrarUsuarioComponent);
    component = fixture.componentInstance;

    // Si el campo de nombres no está lleno el form ha de ser inválido.
    expect(component.registerForm.valid).toBeFalsy();

    // Si el campo correspondiente a los nombres no está lleno, el campo debería ser inválido.
    let names=component.registerForm.controls['nombres'];
    expect(names.valid).toBeFalsy();

    // El campo de nombres ha de ser required.
    let errors={}
    errors=names.errors || {};
    expect(errors['required']).toBeTruthy();

    // Se prueba introduciendo una cadena válida al campo nombres.
    names.setValue('Romelacho');
    errors=names.errors || {};
    expect(errors['required']).toBeUndefined();
    expect(names.valid).toBeTruthy();
  })

  // VALIDACIÓN DEL CAMPO APELLIDOS.
  it('apellidos field validity',()=>{
    fixture = TestBed.createComponent(RegistrarUsuarioComponent);
    component = fixture.componentInstance;

    // Si el campo de apellidos no está lleno el form ha de ser inválido.
    expect(component.registerForm.valid).toBeFalsy();

    // Si el campo correspondiente a los apellidos no está lleno, el campo debería ser inválido.
    let l_name=component.registerForm.controls['apellidos'];
    expect(l_name.valid).toBeFalsy();

    // El campo de apellidos ha de ser required.
    let errors={}
    errors=l_name.errors || {};
    expect(errors['required']).toBeTruthy();

    // Se prueba introduciendo una cadena válida al campo apellidos.
    l_name.setValue('Clavelacho');
    errors=l_name.errors || {};
    expect(errors['required']).toBeUndefined();
    expect(l_name.valid).toBeTruthy();
  })


  it('fecha field validity',()=>{
    fixture = TestBed.createComponent(RegistrarUsuarioComponent);
    component = fixture.componentInstance;
    
    // Si el campo de fecha no está lleno el form ha de ser inválido.
    expect(component.registerForm.valid).toBeFalsy();

    // Si el campo correspondiente a la fecha no está lleno, el campo debería ser inválido.
    let bday=component.registerForm.controls['fecha'];
    expect(bday.valid).toBeFalsy();

    // El campo de fecha ha de ser required.
    let errors={}
    errors=bday.errors || {};
    expect(errors['required']).toBeTruthy();

    // Se prueba introduciendo una cadena no válida (no es una fecha) al campo fecha.
    // bday.setValue('1');
    // errors=bday.errors || {};
    // expect(errors['required']).toBeUndefined();
    // expect(bday.valid).toBeFalsy()

    // Se prueba introduciendo una cadena válida al campo fecha.
    bday.setValue('1/1/2020');
    errors=bday.errors || {};
    expect(errors['required']).toBeUndefined();
    expect(bday.valid).toBeTruthy()

  })


  it('correo field validity',()=>{
    fixture = TestBed.createComponent(RegistrarUsuarioComponent);
    component = fixture.componentInstance;
    
    // Si el campo de correo no está lleno el form ha de ser inválido.
    expect(component.registerForm.valid).toBeFalsy();

    // Si el campo correspondiente al correo no está lleno, el campo debería ser inválido.
    let email=component.registerForm.controls['correo'];
    expect(email.valid).toBeFalsy();

    // El correo ha de ser required y tener errores si no sigue el pattern email.
    let errors={}
    errors=email.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(errors['pattern']).toBeFalsy();

    // Se prueba con un email inválido.
    email.setValue('algo');
    errors=email.errors || {};
    expect(errors['pattern']).toBeDefined();
    expect(errors['required']).toBeUndefined();

    // Se prueba con un email válido.
    email.setValue('algo@gmail.com')
    expect(email.valid).toBeTruthy();
  })

  // VALIDACIÓN DEL USUARIO.
  it('usuario field validity',()=>{
    fixture = TestBed.createComponent(RegistrarUsuarioComponent);
    component = fixture.componentInstance;

    // Si el campo de usuario no está lleno el form ha de ser inválido.
    expect(component.registerForm.valid).toBeFalsy();

    // Si el campo correspondiente al usuario no está lleno, el campo debería ser inválido.
    let user=component.registerForm.controls['usuario'];
    expect(user.valid).toBeFalsy();

    // El usuario ha de ser required y tener errores si no sigue el pattern.
    // EL PATTERN ESTÁ RARO.
    let errors={}
    errors=user.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(errors['pattern']).toBeFalsy();

    // Se prueba introduciendo una cadena válida al campo usuario.
    user.setValue('usuario123')
    expect(user.valid).toBeTruthy();

  })

  // VALIDACIÓN DE LA CONTRASEÑA
  it('password field validity',()=>{
    fixture = TestBed.createComponent(RegistrarUsuarioComponent);
    component = fixture.componentInstance;
    
    // Si el campo de contra (contraseña) no está lleno el form ha de ser inválido.
    expect(component.registerForm.valid).toBeFalsy();

    // Si el campo correspondiente a la contra (contraseña) no está lleno, el campo debería ser inválido.
    let password=component.registerForm.controls['contra'];
    expect(password.valid).toBeFalsy();

    // La contra (contraseña) ha de ser required y tener errores si no sigue el pattern, si no cumple con la cantidad mínima
    // y máxima de caracteres.
    let errors={}
    errors=password.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(errors['pattern']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();

    // Se prueba con un password inválido.
    password.setValue('a');
    errors=password.errors || {};
    expect(errors['minlength']).toBeDefined();
    expect(errors['maxlength']).toBeUndefined();
    expect(errors['required']).toBeUndefined();
    expect(errors['pattern']).toBeDefined();
    expect(password.valid).toBeFalsy();

    // Se prueba con un password inválido.
    password.setValue('aaaaaaaa123');
    errors=password.errors || {};
    expect(errors['minlength']).toBeUndefined();
    expect(errors['maxlength']).toBeDefined();
    expect(errors['required']).toBeUndefined();
    expect(errors['pattern']).toBeDefined();
    expect(password.valid).toBeFalsy();

    // Se prueba con un password inválido.
    password.setValue('algo1234');
    errors=password.errors || {};
    expect(errors['minlength']).toBeUndefined();
    expect(errors['maxlength']).toBeUndefined();
    expect(errors['pattern']).toBeDefined();
    expect(errors['required']).toBeUndefined();
    expect(password.valid).toBeFalsy();

    // Se prueba con un password inválido.
    password.setValue('Algo1234');
    expect(password.valid).toBeTruthy();

  })

  // VALIDACIÓN CONTRASEÑA VÁLIDA
  it('valid contra field validity',()=>{
    fixture = TestBed.createComponent(RegistrarUsuarioComponent);
    component = fixture.componentInstance;
    
    // COMO NO ES REQUIRED SI TODOS LOS DEMÁS ESTÁN LLENOS VA A SER VÁLIDO.
    // Si el campo de valid contra (contraseña válida, que sea igual que la anterior) no está lleno el form ha de ser válido.
    expect(component.registerForm.valid).toBeFalsy();

    // Si el campo correspondiente a la valid contra no está lleno, el campo debería ser válido.
    // Como no es requerido, el campo siempre será válido. (LA VALIDACIÓN ESTÁ EN OTRO MÉTODO)
    let password=component.registerForm.controls['validContra'];
    expect(password.valid).toBeTruthy();

  })

  // VALIDACIÓN CONTRASEÑAS COINCIDEN
  it('passwords are the same',()=>{
    fixture = TestBed.createComponent(RegistrarUsuarioComponent);
    component = fixture.componentInstance;

    // Se llena el form para poder validar el método.
    let names=component.registerForm.controls['nombres'];
    let l_name=component.registerForm.controls['apellidos'];
    let bday=component.registerForm.controls['fecha'];
    let email=component.registerForm.controls['correo'];
    let user=component.registerForm.controls['usuario'];
    let password=component.registerForm.controls['contra'];
    let valid_password=component.registerForm.controls['validContra'];
    let account=component.registerForm.controls['tipoCuenta'];
    
    // Se prueba con passwords distintos.
    names.setValue('Romelacho');
    l_name.setValue('Clavelacho');
    bday.setValue('1/1/2020');
    email.setValue('algo@gmail.com');
    user.setValue('usuario123');
    password.setValue('Romel123');
    valid_password.setValue('Romel1234');
    account.setValue('Premium');

    expect(component.checkPasswords(component.registerForm)).toBeDefined();

    //Se prueba con passwords iguales.
    password.setValue('Romel123');
    valid_password.setValue('Romel123');
    expect(component.checkPasswords(component.registerForm)).toBeNull();

  })

  // VALIDACIÓN TIPO DE CUENTA
  it('tipoCuenta field validity',()=>{
    fixture = TestBed.createComponent(RegistrarUsuarioComponent);
    component = fixture.componentInstance;
    
    // Si el campo de tipoCuenta no está lleno el form ha de ser inválido.
    expect(component.registerForm.valid).toBeFalsy();

    // Si el campo correspondiente al tipo de cuenta no está lleno, el campo debería ser inválido.
    let account=component.registerForm.controls['tipoCuenta'];
    expect(account.valid).toBeFalsy();

    // El tipo de cuenta ha de ser required.
    let errors={}
    errors=account.errors || {};
    expect(errors['required']).toBeTruthy();

    // Se prueba con un tipo de cuenta válida.
    account.setValue('Premium')
    expect(account.valid).toBeTruthy();
    errors=account.errors || {};
    expect(errors['required']).toBeUndefined();
  })

  // LAS CATEGORÍAS NO SE USAN. SE DEBERÍAN QUIATR DEL FORM.
  // NO SE HARÁ TESTING DE CATEGORÍAS.

  it('Check register validity',()=>{
    fixture = TestBed.createComponent(RegistrarUsuarioComponent);
    component = fixture.componentInstance;

    // El form vacío ha de ser inválido.
    expect(component.registerForm.valid).toBeFalsy();
    
    expect(component.registerForm.valid).toBeFalsy();
    let names=component.registerForm.controls['nombres'];
    let l_name=component.registerForm.controls['apellidos'];
    let bday=component.registerForm.controls['fecha'];
    let email=component.registerForm.controls['correo'];
    let user=component.registerForm.controls['usuario'];
    let password=component.registerForm.controls['contra'];
    let valid_password=component.registerForm.controls['validContra'];
    let account=component.registerForm.controls['tipoCuenta'];
    names.setValue('');
    l_name.setValue('');
    bday.setValue('');
    email.setValue('');
    user.setValue('');
    password.setValue('');
    valid_password.setValue('');
    account.setValue('');
    expect(component.registerForm.valid).toBeFalsy();

    // Se prueba llenando todo el form con válidos campos.
    names.setValue('Romelacho');
    l_name.setValue('Clavelacho');
    bday.setValue('1/1/2020');
    email.setValue('algo@gmail.com');
    user.setValue('usuario123');
    password.setValue('Romel123');
    valid_password.setValue('Romel123');
    account.setValue('Premium');
    expect(component.registerForm.valid).toBeTruthy();
  })

  

});

