import { CategoriaComponent } from './../components/categorias/categoria/categoria.component';
import { InicioComponent } from './../components/inicio/inicio.component';
import { RegistrarUsuarioComponent } from './../components/registrar-usuario/registrar-usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IniciarSesionComponent } from '../components/iniciar-sesion/iniciar-sesion.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { CambiarContrasenaComponent } from '../components/cambiar-contrasena/cambiar-contrasena.component';
import { HomeComponent } from '../components/home/home.component';
import { ForosComponent } from '../components/foros/foros.component';
import { ForoComponent } from '../components/foros/foro/foro.component';
import { SubCategoriaComponent } from '../components/categorias/sub-categoria/sub-categoria.component';
import { CategoriasComponent } from '../components/categorias/categorias.component';
import { AuthGuard} from '../guards/auth.guard'


const routes: Routes = [
  { path: 'inicio', component: InicioComponent},
  { path: 'iniciar-sesion', component: IniciarSesionComponent },
  { path: 'cambiar-contrasena', component: CambiarContrasenaComponent },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
  { path: 'home', component: HomeComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'categoria/:id', component: CategoriaComponent },
  { path: 'sub-categoria/:id', component: SubCategoriaComponent },
  { path: 'foros', component: ForosComponent },
  { path: 'foros/:id', component: ForoComponent },
  { path: "", redirectTo: "/inicio", pathMatch: "full" },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
