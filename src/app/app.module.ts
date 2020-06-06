import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing/routing.module';
import { AppComponent } from './app.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuComponent } from './components/menu/menu.component';
import { PagoPremiumComponent } from './components/pago-premium/pago-premium.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CambiarContrasenaComponent } from './components/cambiar-contrasena/cambiar-contrasena.component';
import { HomeComponent } from './components/home/home.component';
import { ForosComponent } from './components/foros/foros.component';
import { ForoComponent } from './components/foros/foro/foro.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { SubCategoriaComponent } from './components/categorias/sub-categoria/sub-categoria.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { CategoriaComponent } from './components/categorias/categoria/categoria.component';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { FavoritasComponent } from './components/favoritas/favoritas.component';

@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    RegistrarUsuarioComponent,
    InicioComponent,
    MenuComponent,
    PagoPremiumComponent,
    NotFoundComponent,
    CambiarContrasenaComponent,
    HomeComponent,
    CategoriasComponent,
    SubCategoriaComponent,
    ForosComponent,
    ForoComponent,
    CategoriasComponent,
    CategoriaComponent,
    FavoritasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPayPalModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
