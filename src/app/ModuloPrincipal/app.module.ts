import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { PrincipalComponent } from './Componentes/principal/principal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioModule } from '../ModuloSeguridad/usuario.module';
import { MenuNavBarComponent } from './Componentes/menu-nav-bar/menu-nav-bar.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogoYesNoComponent } from './Componentes/dialogo-yes-no/dialogo-yes-no.component';
import { AvanzadoModule } from '../ModuloAvanzado/avanzado.module';
import { CompartidoModule } from '../ModuloCompartido/compartido.module';
import { InterceptorRequestInterceptor } from './interceptor/interceptor-request.interceptor';
import { CargandoComponent } from './Componentes/cargando/cargando.component';

@NgModule({
  declarations: [
    PrincipalComponent,
    MenuNavBarComponent,
    DialogoYesNoComponent,
    CargandoComponent
  ],
  exports:[
    DialogoYesNoComponent,
    CargandoComponent
  ],
  imports: [
    CompartidoModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    UsuarioModule,
    AvanzadoModule,
    ToastrModule.forRoot({
      timeOut:2000,
      positionClass:"toast-top-right",
      preventDuplicates:false
    }),
  ],
  providers: [
      {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, 
      useValue: {appearance: 'outline'},
      },
      {
      provide: HTTP_INTERCEPTORS,
     useClass: InterceptorRequestInterceptor,
        multi: true
      }
  ],
  bootstrap: [MenuNavBarComponent]
})
export class AppModule { }
