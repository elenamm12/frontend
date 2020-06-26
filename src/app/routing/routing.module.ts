import { CrearForoComponent } from './../components/foros/crear-foro/crear-foro.component';

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
import { AuthGuard } from '../guards/auth.guard';
import { FavoritasComponent } from '../components/favoritas/favoritas.component';
import { PictureComponent } from '../components/picture/picture.component';
import { UsuarioComponent } from '../components/usuario/usuario.component';
import { PictureForoComponent } from '../components/picture-foro/picture-foro.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent },
  { path: 'cambiar-contrasena', component: CambiarContrasenaComponent },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
  { path: 'favoritas', component: FavoritasComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'picture', component: PictureComponent, canActivate: [AuthGuard] },
  { path: 'crear-foro', component: CrearForoComponent, canActivate: [AuthGuard] },
  { path: 'picture-foro', component: PictureForoComponent, canActivate: [AuthGuard] },
  {
    path: 'perfil-usuario',
    component: UsuarioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categorias',
    component: CategoriasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categoria/:id',
    component: CategoriaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sub-categoria/:id/categoria/:idCateg',
    component: SubCategoriaComponent,
    canActivate: [AuthGuard],
  },
  { path: 'foros', component: ForosComponent, canActivate: [AuthGuard] },
  { path: 'foro/:id', component: ForoComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
