import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciarSesionComponent } from './iniciar-sesion.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('IniciarSesionComponent', () => {
  let component: IniciarSesionComponent;
  let fixture: ComponentFixture<IniciarSesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IniciarSesionComponent ],
      imports:[ReactiveFormsModule,FormsModule,RouterTestingModule],
      providers:[HttpClient,HttpHandler],
    
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciarSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(IniciarSesionComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });


  // VALIDACIÓN DEL CAMPO USUARIO.
  it('user field validity',()=>{
    fixture = TestBed.createComponent(IniciarSesionComponent);
    component = fixture.componentInstance;

    // Si el campo de usuario no está lleno el form ha de ser inválido.
    expect(component.loginForm.valid).toBeFalsy();

    // Si el campo correspondiente a la usuario no está lleno, el campo debería ser inválido.
    let user=component.loginForm.controls['usuario'];
    expect(user.valid).toBeFalsy();

    // El campo de usuario ha de tener errores si el campo de email no sigue el patrón de email. Ha de ser required.
    let errors={}
    errors=user.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(errors['pattern']).toBeFalsy();

    // Se prueba con un usuario inválido.
    user.setValue('algo');
    errors=user.errors || {};
    expect(errors['pattern']).toBeDefined();
    expect(errors['required']).toBeUndefined();
    expect(user.valid).toBeFalsy();

    // Se prueba con un usuario válido.
    user.setValue('algo@gmail.com')
    expect(user.valid).toBeTruthy();
  })

  // VALIDACIÓN DEL CAMPO CONTRA (contraseña)
  it('password field validity',()=>{
    fixture = TestBed.createComponent(IniciarSesionComponent);
    component = fixture.componentInstance;

    // Si el campo de la contraseña no está lleno el form ha de ser inválido.
    expect(component.loginForm.valid).toBeFalsy();

    // Si el campo correspondiente a la contraseña no está lleno, el campo debería ser inválido.
    let password=component.loginForm.controls['contra'];
    expect(password.valid).toBeFalsy();

    // El password tendrá errores si no cumple con una minLength. Ha de ser required.
    let errors={}
    errors=password.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(errors['minlength']).toBeFalsy();

    // Se prueba con un password que no cumple las condiciones.
    password.setValue('pass')
    expect(password.valid).toBeFalsy();
    expect(password.errors['minlength']).toBeDefined();
    expect(password.errors['required']).toBeUndefined();

    // Se prueba con un password que cumple las condiciones.
    password.setValue('password')
    expect(password.valid).toBeTruthy();

  })

  // VALIDACIÓN FORM DEL LOGIN
  it('log in validity',()=>{
    fixture = TestBed.createComponent(IniciarSesionComponent);
    component = fixture.componentInstance;

    // Si el form está vacío debería ser inválido.
    expect(component.loginForm.valid).toBeFalsy();
    
    let user=component.loginForm.controls['usuario'];
    let password=component.loginForm.controls['contra'];
    user.setValue('')
    password.setValue('')
    expect(component.loginForm.valid).toBeFalsy();

    // Se prueba con un usuario y una contraseña que no cumplan con los requerimientos establecidos.
    user.setValue('algo')
    password.setValue('cont')
    expect(component.loginForm.valid).toBeFalsy();

    // Se prueba con un usuario que no cumpla con sus requerimientos establecidos y una contraseña que sí.
    user.setValue('algo')
    password.setValue('contraseña123')
    expect(component.loginForm.valid).toBeFalsy();

    // Se prueba con un usuario que cumpla con  los requerimientos establecidos y una contraseña que no.
    user.setValue('algo@gmail.com')
    password.setValue('cont')
    expect(component.loginForm.valid).toBeFalsy();

    // Se prueba con un usuario y una contraseña correctas.
    user.setValue('algo@gmail.com')
    password.setValue('contraseña123')
    expect(component.loginForm.valid).toBeTruthy();

  })

  // VALIDACIÓN ENVÍO DEL FORM
  it('validate submit',()=>{
    fixture = TestBed.createComponent(IniciarSesionComponent);
    component = fixture.componentInstance;

    // Validar que entre cuando el form sea válido.
    expect(component.onSaveForm()).toBe('inválido');

    let user=component.loginForm.controls['usuario'];
    let password=component.loginForm.controls['contra'];
    user.setValue('victoriaiac11@gmail.com');
    password.setValue('Ab12345');

    // Validar que no deje entrar a un usuario cuya contraseña no coincida.
    expect(component.onSaveForm()).toBeUndefined;

    user.setValue('victoria.acuna@correo.unimet.edu.ve');
    password.setValue('Ac12345');
    // Validar que no deje entrar a un usuario cuya contraseña no coincida.
    expect(component.onSaveForm()).toBe('entro sin ser admin');

    

  })




});

