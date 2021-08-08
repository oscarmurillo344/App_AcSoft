import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { LoginComponent } from './Componentes/login/login.component';
import { MaterialModule } from '../ModuloMaterial/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CambiarContrasenaComponent } from './Componentes/cambiarContrasena/cambiar-contrasena.component';
import { SeguridadService } from './Servicios/seguridad.service';
import { CompartidoModule } from '../ModuloCompartido/compartido.module';


@NgModule({
  declarations: [LoginComponent, CambiarContrasenaComponent],
  imports: [
    CompartidoModule,
    UsuarioRoutingModule
  ],
  exports:[
    LoginComponent,
    CambiarContrasenaComponent
  ],
  providers: [ 
    SeguridadService
  ]
})
export class UsuarioModule { }
