import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargandoComponent } from './Componentes/cargando/cargando.component';
import { PrincipalComponent } from './Componentes/principal/principal.component';

const routes: Routes = [
{ path: 'seguridad', loadChildren: () => import('../ModuloSeguridad/usuario.module').then(m => m.UsuarioModule) }, 
{ path: 'avanzado', loadChildren: () => import('../ModuloAvanzado/avanzado.module').then(m => m.AvanzadoModule) },
{ path: 'principal', component: PrincipalComponent},
{ path: '', redirectTo: 'seguridad/login', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
