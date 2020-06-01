import { InicioComponent } from './../components/inicio/inicio.component';
import { RegistrarUsuarioComponent } from './../components/registrar-usuario/registrar-usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IniciarSesionComponent } from '../components/iniciar-sesion/iniciar-sesion.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { MenuComponent } from '../components/menu/menu.component';
import { CambiarContrasenaComponent } from '../components/cambiar-contrasena/cambiar-contrasena.component';
import { HomeComponent } from '../components/home/home.component';
import { CategoriaComponent } from '../components/categoria/categoria.component';


const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent },
  { path: 'cambiar-contrasena', component: CambiarContrasenaComponent },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
  { path: 'home', component: HomeComponent },
  { path: ':categoria', component: CategoriaComponent },
  { path: "", redirectTo: "/inicio", pathMatch: "full" },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
