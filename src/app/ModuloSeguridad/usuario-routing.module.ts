import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarContrasenaComponent } from './Componentes/cambiarContrasena/cambiar-contrasena.component';
import { LoginComponent } from './Componentes/login/login.component';

const routes: Routes = [{ 
    path: '',
    children: [
      { path: 'login',  component: LoginComponent },
      { path: 'cambiar',  component: CambiarContrasenaComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full'}
    ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
