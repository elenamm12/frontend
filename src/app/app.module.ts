import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing/routing.module';
import { AppComponent } from './app.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuComponent } from './components/menu/menu.component';
import { PagoPremiumComponent } from './components/pago-premium/pago-premium.component';
import { BuscarPorCategoriaComponent } from './components/menu/buscar-por-categoria/buscar-por-categoria.component';
import { BuscarPorPalabrasComponent } from './components/menu/buscar-por-palabras/buscar-por-palabras.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { CambiarContrasenaComponent } from './components/cambiar-contrasena/cambiar-contrasena.component';


@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    RegistrarUsuarioComponent,
    InicioComponent,
    MenuComponent,
    PagoPremiumComponent,
    BuscarPorCategoriaComponent,
    BuscarPorPalabrasComponent,
    NotFoundComponent,
    CambiarContrasenaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
