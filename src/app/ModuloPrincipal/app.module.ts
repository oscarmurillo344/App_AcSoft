import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { PrincipalComponent } from './Componentes/principal/principal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioModule } from '../ModuloSeguridad/usuario.module';
import { MenuNavBarComponent } from './Componentes/menu-nav-bar/menu-nav-bar.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { DialogoYesNoComponent } from './Componentes/dialogo-yes-no/dialogo-yes-no.component';
import { AvanzadoModule } from '../ModuloAvanzado/avanzado.module';
import { CommonModule } from '@angular/common';
import { CompartidoModule } from '../ModuloCompartido/compartido.module';

@NgModule({
  declarations: [
    PrincipalComponent,
    MenuNavBarComponent,
    DialogoYesNoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CompartidoModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut:2000,
      positionClass:"toast-top-right",
      preventDuplicates:true
    }),
    UsuarioModule,
    AvanzadoModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  exports:[
    MenuNavBarComponent,
    DialogoYesNoComponent
  ],
  bootstrap: [MenuNavBarComponent]
})
export class AppModule { }
